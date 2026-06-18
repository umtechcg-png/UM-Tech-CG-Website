import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/coming-soon";

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  component: () => <ComingSoon title="Enquiries" stage="Stage 2" description="All contact, consultation, proposal, and partnership submissions with reply and internal notes." />,
});
