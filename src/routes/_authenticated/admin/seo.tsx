import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/coming-soon";

export const Route = createFileRoute("/_authenticated/admin/seo")({
  component: () => <ComingSoon title="SEO Settings" stage="Stage 4" description="Page titles, meta descriptions, Open Graph, sitemap, and robots controls." />,
});
