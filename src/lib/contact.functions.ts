import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const submissionSchema = z.object({
  fullName: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Valid email required").max(255),
  company: z.string().max(120).optional().or(z.literal("")),
  serviceType: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(1, "Message is required").max(2000),
});


// Public contact form submission. Validates input server-side, rate-limits,
// and stores the enquiry in contact_submissions via the service role client.
export const submitContactEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submissionSchema.parse(input))
  .handler(async ({ data }) => {
    const ip = getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return { ok: false as const, error: "Too many submissions. Please try again in a few minutes." };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      full_name: data.fullName,
      email: data.email,
      company: data.company || null,
      service_type: data.serviceType || null,
      message: data.message,
    });
    if (error) {
      console.error("[contact] insert failed:", error.message);
      return { ok: false as const, error: "Could not send your message right now. Please try again or email us directly." };
    }
    return { ok: true as const };
  });

// Staff-only: list enquiries for the admin area (newest first).
export const listContactEnquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: roles } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    const allowed = ["admin", "super_admin", "sales_manager"];
    const canRead = (roles ?? []).some((r: { role: string }) => allowed.includes(r.role));
    if (!canRead) throw new Error("Forbidden");

    const { data, error } = await context.supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });
