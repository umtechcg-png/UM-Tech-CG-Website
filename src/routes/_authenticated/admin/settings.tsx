import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/coming-soon";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: () => <ComingSoon title="Site Settings" stage="Stage 3" description="Company info, contact details, social links, WhatsApp number, and business hours." />,
});
