import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/coming-soon";

export const Route = createFileRoute("/_authenticated/admin/content/packages")({
  component: () => <ComingSoon title="Packages" stage="Stage 3" description="Manage tailored consulting packages and their features." />,
});
