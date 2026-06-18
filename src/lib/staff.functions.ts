import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const ROLES = ["super_admin", "admin", "editor", "sales_manager"] as const;
type Role = (typeof ROLES)[number];

async function assertSuperAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "super_admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: Super Admin only");
}

function randomTempPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);
  for (let i = 0; i < buf.length; i++) out += chars[buf[i] % chars.length];
  return out + "!Aa9";
}

async function logActivity(
  supabase: any,
  userId: string,
  action: string,
  metadata: Record<string, unknown>,
) {
  await supabase.from("activity_logs").insert({
    user_id: userId,
    action,
    entity_type: "user",
    metadata,
  });
}

export const listStaff = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertSuperAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: usersData, error: usersErr } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (usersErr) throw new Error(usersErr.message);

    const { data: roleRows, error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role");
    if (roleErr) throw new Error(roleErr.message);

    const { data: profileRows } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, phone");

    const rolesByUser = new Map<string, Role[]>();
    for (const r of roleRows ?? []) {
      const list = rolesByUser.get(r.user_id) ?? [];
      list.push(r.role as Role);
      rolesByUser.set(r.user_id, list);
    }
    const profileById = new Map((profileRows ?? []).map((p: any) => [p.id, p]));

    return usersData.users
      .map((u) => ({
        id: u.id,
        email: u.email ?? "",
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        invited_at: u.invited_at,
        confirmed_at: u.confirmed_at ?? u.email_confirmed_at ?? null,
        full_name:
          (profileById.get(u.id) as any)?.full_name ??
          (u.user_metadata as any)?.full_name ??
          null,
        roles: rolesByUser.get(u.id) ?? [],
      }))
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  });

const inviteSchema = z.object({
  email: z.string().trim().email().max(255),
  full_name: z.string().trim().min(1).max(120),
  role: z.enum(ROLES),
  mode: z.enum(["invite_link", "temp_password"]),
});

export const inviteStaff = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => inviteSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const origin =
      (process.env.SITE_URL as string | undefined) ??
      (process.env.VITE_PUBLIC_SITE_URL as string | undefined) ??
      "";
    const redirectTo = origin ? `${origin.replace(/\/$/, "")}/admin` : undefined;

    let userId: string;
    let tempPassword: string | null = null;
    let actionLink: string | null = null;

    if (data.mode === "invite_link") {
      const { data: gen, error } = await supabaseAdmin.auth.admin.generateLink({
        type: "invite",
        email: data.email,
        options: {
          data: { full_name: data.full_name },
          redirectTo,
        },
      });
      if (error || !gen.user) throw new Error(error?.message ?? "Failed to invite");
      userId = gen.user.id;
      actionLink = gen.properties?.action_link ?? null;
    } else {
      tempPassword = randomTempPassword();
      const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { full_name: data.full_name, must_change_password: true },
      });
      if (error || !created.user) throw new Error(error?.message ?? "Failed to create user");
      userId = created.user.id;
    }

    // Ensure profile row + assign role (handle_new_user trigger may also fire)
    await supabaseAdmin
      .from("profiles")
      .upsert({ id: userId, full_name: data.full_name }, { onConflict: "id" });

    const { error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: data.role }, { onConflict: "user_id,role" });
    if (roleErr) throw new Error(roleErr.message);

    await logActivity(context.supabase, context.userId, "staff.invited", {
      target_user_id: userId,
      email: data.email,
      role: data.role,
      mode: data.mode,
    });

    return {
      user_id: userId,
      email: data.email,
      role: data.role,
      invite_link: actionLink,
      temp_password: tempPassword,
    };
  });

const roleSchema = z.object({
  user_id: z.string().uuid(),
  role: z.enum(ROLES),
});

export const grantRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => roleSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: data.user_id, role: data.role }, { onConflict: "user_id,role" });
    if (error) throw new Error(error.message);
    await logActivity(context.supabase, context.userId, "staff.role_granted", data);
    return { ok: true };
  });

export const revokeRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => roleSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context);
    if (data.user_id === context.userId && data.role === "super_admin") {
      throw new Error("You cannot revoke your own Super Admin role");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", data.user_id)
      .eq("role", data.role);
    if (error) throw new Error(error.message);
    await logActivity(context.supabase, context.userId, "staff.role_revoked", data);
    return { ok: true };
  });

export const resendInvite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ email: z.string().email() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const origin =
      (process.env.SITE_URL as string | undefined) ??
      (process.env.VITE_PUBLIC_SITE_URL as string | undefined) ??
      "";
    const redirectTo = origin ? `${origin.replace(/\/$/, "")}/reset-password` : undefined;
    const { data: gen, error } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email: data.email,
      options: { redirectTo },
    });
    if (error) throw new Error(error.message);
    await logActivity(context.supabase, context.userId, "staff.recovery_link", {
      email: data.email,
    });
    return { invite_link: gen.properties?.action_link ?? null };
  });

export const deleteStaff = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ user_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context);
    if (data.user_id === context.userId) {
      throw new Error("You cannot delete your own account");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.user_id);
    if (error) throw new Error(error.message);
    await logActivity(context.supabase, context.userId, "staff.deleted", {
      target_user_id: data.user_id,
    });
    return { ok: true };
  });