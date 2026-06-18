import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/coming-soon";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: () => <ComingSoon title="Users & Roles" stage="Stage 2" description="Invite team members and grant Super Admin, Admin, Editor, or Sales Manager roles." />,
});
