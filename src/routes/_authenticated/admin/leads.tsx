import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/coming-soon";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: () => <ComingSoon title="Leads" stage="Stage 2" description="Full CRM with statuses, notes, assignments, search, filter, and CSV export." />,
});
