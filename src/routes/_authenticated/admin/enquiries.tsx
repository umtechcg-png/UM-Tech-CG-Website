import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { listContactEnquiries } from "@/lib/contact.functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  component: EnquiriesPage,
});

type Enquiry = {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  service_type: string | null;
  message: string;
  status: string;
  created_at: string;
};

function EnquiriesPage() {
  const listEnquiries = useServerFn(listContactEnquiries);
  const { data, isLoading, error } = useQuery({
    queryKey: ["contact-enquiries"],
    queryFn: () => listEnquiries(),
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-2xl font-semibold">Enquiries</h1>
      {error && <p className="text-sm text-destructive">Could not load enquiries: {(error as Error).message}</p>}
      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base">Contact & consultation submissions</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading enquiries…</p>
          ) : !data?.length ? (
            <p className="text-sm text-muted-foreground">No enquiries yet. Submissions from the website contact form appear here, newest first.</p>
          ) : (
            <div className="divide-y divide-border">
              {data.map((e: Enquiry) => (
                <div key={e.id} className="py-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                    <div>
                      <div className="font-medium">{e.full_name}{e.company ? ` · ${e.company}` : ""}</div>
                      <div className="text-xs text-muted-foreground">
                        <a href={`mailto:${e.email}`} className="hover:text-foreground">{e.email}</a>
                        {e.service_type ? ` · ${e.service_type}` : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-widest rounded-full border border-border px-2 py-1 text-muted-foreground">{e.status}</span>
                      <span className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{e.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
