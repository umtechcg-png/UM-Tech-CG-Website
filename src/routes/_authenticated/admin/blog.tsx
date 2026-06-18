import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/coming-soon";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: () => <ComingSoon title="Blog & Resources" stage="Stage 4" description="Rich-text editor, categories, tags, scheduling, and publish workflow." />,
});
