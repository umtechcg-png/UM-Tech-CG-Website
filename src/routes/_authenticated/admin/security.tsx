import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/security")({
  component: SecurityPage,
});

function SecurityPage() {
  const [factors, setFactors] = useState<any[]>([]);
  const [enrolling, setEnrolling] = useState<null | { factorId: string; qr: string; secret: string }>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await supabase.auth.mfa.listFactors();
    setFactors(data?.totp ?? []);
  }
  useEffect(() => { load(); }, []);

  async function startEnroll() {
    setBusy(true);
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" });
    setBusy(false);
    if (error || !data) return toast.error(error?.message ?? "Failed");
    setEnrolling({ factorId: data.id, qr: data.totp.qr_code, secret: data.totp.secret });
  }

  async function verifyEnroll() {
    if (!enrolling) return;
    setBusy(true);
    const { data: ch, error: chErr } = await supabase.auth.mfa.challenge({ factorId: enrolling.factorId });
    if (chErr || !ch) { setBusy(false); return toast.error(chErr?.message ?? "Challenge failed"); }
    const { error } = await supabase.auth.mfa.verify({ factorId: enrolling.factorId, challengeId: ch.id, code });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("2FA enabled");
    setEnrolling(null); setCode("");
    load();
  }

  async function unenroll(id: string) {
    const { error } = await supabase.auth.mfa.unenroll({ factorId: id });
    if (error) return toast.error(error.message);
    toast.success("2FA removed");
    load();
  }

  const verified = factors.find((f) => f.status === "verified");

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold">Security</h1>
        <p className="text-sm text-muted-foreground mt-1">Two-factor authentication and account security.</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                {verified ? <ShieldCheck className="w-4 h-4 text-green-500" /> : <ShieldAlert className="w-4 h-4 text-amber-500" />}
                Two-Factor Authentication (TOTP)
              </CardTitle>
              <CardDescription>Use an authenticator app like Google Authenticator or 1Password.</CardDescription>
            </div>
            {verified && <Badge variant="secondary">Enabled</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!enrolling && !verified && (
            <Button onClick={startEnroll} disabled={busy}>
              {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Enable 2FA
            </Button>
          )}
          {verified && (
            <Button variant="outline" onClick={() => unenroll(verified.id)}>Disable 2FA</Button>
          )}
          {enrolling && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <img src={enrolling.qr} alt="2FA QR code" className="w-40 h-40 bg-white p-2 rounded" />
                <div className="text-sm space-y-2 flex-1">
                  <p>Scan the QR code with your authenticator app, or paste this secret manually:</p>
                  <code className="block p-2 bg-muted rounded font-mono text-xs break-all">{enrolling.secret}</code>
                </div>
              </div>
              <div className="space-y-2 max-w-xs">
                <Label>Enter the 6-digit code to confirm</Label>
                <Input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} maxLength={6} inputMode="numeric" placeholder="123456" />
              </div>
              <div className="flex gap-2">
                <Button onClick={verifyEnroll} disabled={busy || code.length !== 6}>
                  {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Confirm
                </Button>
                <Button variant="ghost" onClick={() => setEnrolling(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Sign-in History</CardTitle>
          <CardDescription>Recent login activity will appear here once recorded.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No records yet.</p>
        </CardContent>
      </Card>
    </div>
  );
}