import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, Mail, FileText, TrendingUp, Briefcase, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function MetricCard({ icon: Icon, label, value, hint }: { icon: any; label: string; value: string | number; hint?: string }) {
  return (
    <Card className="glass-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
            <p className="text-3xl font-semibold mt-2 font-[Space_Grotesk]">{value}</p>
            {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-brand/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const { user, roles } = useAuth();

  const { data: activity } = useQuery({
    queryKey: ["activity-recent"],
    queryFn: async () => {
      const { data } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {roles.length > 0 ? (
            <>Signed in as <Badge variant="secondary" className="capitalize">{roles[0].replace("_", " ")}</Badge></>
          ) : (
            "Awaiting role assignment"
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Users} label="New Leads (30d)" value="—" hint="Stage 2 wires CRM" />
        <MetricCard icon={Mail} label="Enquiries" value="—" hint="Stage 2 wires forms" />
        <MetricCard icon={Briefcase} label="Active Services" value="—" hint="Stage 3 wires content" />
        <MetricCard icon={FileText} label="Blog Posts" value="—" hint="Stage 4 wires blog" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 glass-card">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Activity className="w-4 h-4" /> Recent Activity</CardTitle></CardHeader>
          <CardContent>
            {activity && activity.length > 0 ? (
              <ul className="divide-y divide-border">
                {activity.map((a: any) => (
                  <li key={a.id} className="py-2 text-sm flex items-center justify-between">
                    <span>{a.action} {a.entity_type && <span className="text-muted-foreground">· {a.entity_type}</span>}</span>
                    <span className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No activity yet. Actions you take will appear here.</p>
            )}
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Conversion</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">—</div>
            <p className="text-xs text-muted-foreground mt-2">Lead → Won ratio (Stage 2)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}