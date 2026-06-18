import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/coming-soon";

export const Route = createFileRoute("/_authenticated/admin/content/products")({
  component: () => <ComingSoon title="Products" stage="Stage 3" description="Manage TrackSuite, Watt Wallet Buddy, and future products." />,
});
