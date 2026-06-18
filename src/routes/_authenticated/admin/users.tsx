import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  listStaff,
  inviteStaff,
  grantRole,
  revokeRole,
  resendInvite,
  deleteStaff,
} from "@/lib/staff.functions";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Copy,
  KeyRound,
  Loader2,
  Mail,
  ShieldOff,
  Trash2,
  UserPlus,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: UsersPage,
});

const ROLE_OPTIONS = [
  { value: "super_admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "sales_manager", label: "Sales Manager" },
] as const;
type Role = (typeof ROLE_OPTIONS)[number]["value"];

function UsersPage() {
  const { hasRole, user } = useAuth();
  const isSuper = hasRole("super_admin");
  const qc = useQueryClient();
  const listFn = useServerFn(listStaff);

  const staffQuery = useQuery({
    queryKey: ["admin", "staff"],
    queryFn: () => listFn(),
    enabled: isSuper,
  });

  if (!isSuper) {
    return (
      <div className="max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Users & Roles</CardTitle>
            <CardDescription>
              Only Super Admins can manage staff accounts.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users & Roles</h1>
          <p className="text-sm text-muted-foreground">
            Invite staff and grant Super Admin, Admin, Editor, or Sales Manager roles.
          </p>
        </div>
        <InviteDialog onDone={() => qc.invalidateQueries({ queryKey: ["admin", "staff"] })} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff accounts</CardTitle>
          <CardDescription>
            {staffQuery.data?.length ?? 0} member{(staffQuery.data?.length ?? 0) === 1 ? "" : "s"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {staffQuery.isLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-8">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading staff…
            </div>
          ) : staffQuery.error ? (
            <p className="text-sm text-destructive">
              {(staffQuery.error as Error).message}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name / Email</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last sign-in</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(staffQuery.data ?? []).map((s) => (
                    <StaffRow key={s.id} staff={s} currentUserId={user?.id ?? ""} />
                  ))}
                  {(staffQuery.data ?? []).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No staff yet. Invite your first teammate.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

type Staff = {
  id: string;
  email: string;
  full_name: string | null;
  roles: Role[];
  created_at: string;
  last_sign_in_at: string | null;
  confirmed_at: string | null;
  invited_at: string | null;
};

function StaffRow({ staff, currentUserId }: { staff: Staff; currentUserId: string }) {
  const qc = useQueryClient();
  const grant = useServerFn(grantRole);
  const revoke = useServerFn(revokeRole);
  const resend = useServerFn(resendInvite);
  const remove = useServerFn(deleteStaff);
  const isSelf = staff.id === currentUserId;
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin", "staff"] });

  const grantM = useMutation({
    mutationFn: (role: Role) => grant({ data: { user_id: staff.id, role } }),
    onSuccess: () => {
      toast.success("Role granted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const revokeM = useMutation({
    mutationFn: (role: Role) => revoke({ data: { user_id: staff.id, role } }),
    onSuccess: () => {
      toast.success("Role revoked");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const resendM = useMutation({
    mutationFn: () => resend({ data: { email: staff.email } }),
    onSuccess: (res) => {
      if (res.invite_link) {
        navigator.clipboard.writeText(res.invite_link).catch(() => {});
        toast.success("Recovery link copied to clipboard");
      } else {
        toast.success("Recovery email sent");
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const deleteM = useMutation({
    mutationFn: () => remove({ data: { user_id: staff.id } }),
    onSuccess: () => {
      toast.success("Account deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const unassigned = ROLE_OPTIONS.filter((r) => !staff.roles.includes(r.value));

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{staff.full_name ?? "—"}</div>
        <div className="text-xs text-muted-foreground">{staff.email}</div>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {staff.roles.length === 0 && (
            <span className="text-xs text-muted-foreground">No role</span>
          )}
          {staff.roles.map((r) => {
            const cannotRevoke = isSelf && r === "super_admin";
            return (
              <Badge
                key={r}
                variant="secondary"
                className="gap-1 pl-2 pr-1 capitalize"
              >
                {r.replace("_", " ")}
                {!cannotRevoke && (
                  <button
                    aria-label={`Revoke ${r}`}
                    onClick={() => revokeM.mutate(r)}
                    className="rounded hover:bg-background/60 p-0.5"
                    disabled={revokeM.isPending}
                  >
                    <ShieldOff className="w-3 h-3" />
                  </button>
                )}
              </Badge>
            );
          })}
        </div>
        {unassigned.length > 0 && (
          <div className="mt-1">
            <Select onValueChange={(v) => grantM.mutate(v as Role)} value="">
              <SelectTrigger className="h-7 w-[160px] text-xs">
                <SelectValue placeholder="+ Grant role" />
              </SelectTrigger>
              <SelectContent>
                {unassigned.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </TableCell>
      <TableCell>
        {staff.confirmed_at ? (
          <Badge variant="outline" className="text-emerald-600 border-emerald-600/40">
            Active
          </Badge>
        ) : (
          <Badge variant="outline" className="text-amber-600 border-amber-600/40">
            Pending
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {staff.last_sign_in_at
          ? new Date(staff.last_sign_in_at).toLocaleDateString()
          : "Never"}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => resendM.mutate()}
            disabled={resendM.isPending}
            title="Generate password reset link"
          >
            {resendM.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <KeyRound className="w-4 h-4" />
            )}
          </Button>
          {!isSelf && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="ghost" className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete {staff.email}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This permanently removes the account and all assigned roles.
                    This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteM.mutate()}
                    className="bg-destructive text-destructive-foreground"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

function InviteDialog({ onDone }: { onDone: () => void }) {
  const invite = useServerFn(inviteStaff);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<Role>("editor");
  const [mode, setMode] = useState<"invite_link" | "temp_password">("invite_link");
  const [result, setResult] = useState<{
    email: string;
    invite_link: string | null;
    temp_password: string | null;
  } | null>(null);

  const mutation = useMutation({
    mutationFn: () =>
      invite({ data: { email, full_name: fullName, role, mode } }),
    onSuccess: (res) => {
      toast.success(`Invited ${res.email}`);
      setResult({
        email: res.email,
        invite_link: res.invite_link,
        temp_password: res.temp_password,
      });
      onDone();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function reset() {
    setEmail("");
    setFullName("");
    setRole("editor");
    setMode("invite_link");
    setResult(null);
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(
      () => toast.success("Copied"),
      () => toast.error("Copy failed"),
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" /> Invite staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {result ? (
          <>
            <DialogHeader>
              <DialogTitle>Invitation ready</DialogTitle>
              <DialogDescription>
                Share these credentials with {result.email} via a secure channel.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {result.invite_link && (
                <div className="space-y-1">
                  <Label>Invite link</Label>
                  <div className="flex gap-2">
                    <Input readOnly value={result.invite_link} className="font-mono text-xs" />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => copy(result.invite_link!)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
              {result.temp_password && (
                <div className="space-y-1">
                  <Label>Temporary password</Label>
                  <div className="flex gap-2">
                    <Input readOnly value={result.temp_password} className="font-mono" />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => copy(result.temp_password!)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The user should change this on first sign-in.
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Done</Button>
            </DialogFooter>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>Invite a staff member</DialogTitle>
              <DialogDescription>
                Creates the account and assigns the selected role.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="full_name">Full name</Label>
                <Input
                  id="full_name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="invite_email">Work email</Label>
                <Input
                  id="invite_email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Role</Label>
                <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_OPTIONS.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Delivery method</Label>
                <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invite_link">
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Email invite link
                      </span>
                    </SelectItem>
                    <SelectItem value="temp_password">
                      <span className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4" /> Temporary password
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Invite link emails the user a one-time sign-in link. Temporary
                  password creates the account immediately and returns credentials
                  to share securely.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Send invite
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}