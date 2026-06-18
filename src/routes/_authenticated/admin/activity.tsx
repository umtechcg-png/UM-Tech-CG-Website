import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/admin/activity")({
  component: ActivityPage,
});

function ActivityPage() {
  const { data } = useQuery({
    queryKey: ["activity-all"],
    queryFn: async () => {
      const { data } = await supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(200);
      return data ?? [];
    },
  });
  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-2xl font-semibold">Activity Log</h1>
      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base">Recent actions</CardTitle></CardHeader>
        <CardContent>
          {!data?.length ? (
            <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
          ) : (
            <div className="divide-y divide-border">
              {data.map((a: any) => (
                <div key={a.id} className="py-3 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{a.action}</div>
                    <div className="text-xs text-muted-foreground">{a.entity_type} {a.entity_id}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}