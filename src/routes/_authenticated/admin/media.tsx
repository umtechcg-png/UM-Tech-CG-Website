import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/coming-soon";

export const Route = createFileRoute("/_authenticated/admin/media")({
  component: () => <ComingSoon title="Media Library" stage="Stage 4" description="Upload, organise, and replace images, videos, and documents." />,
});
