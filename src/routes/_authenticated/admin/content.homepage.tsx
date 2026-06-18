import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/coming-soon";

export const Route = createFileRoute("/_authenticated/admin/content/homepage")({
  component: () => <ComingSoon title="Homepage" stage="Stage 3" description="Edit hero, about, statistics, testimonials, and CTAs." />,
});
