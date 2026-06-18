import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/coming-soon";

export const Route = createFileRoute("/_authenticated/admin/content/services")({
  component: () => <ComingSoon title="Services" stage="Stage 3" description="Add, edit, reorder, and publish services shown on the public site." />,
});
