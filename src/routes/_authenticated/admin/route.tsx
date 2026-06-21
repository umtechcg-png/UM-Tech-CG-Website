import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/app-sidebar";
import { AuthProvider, useAuth } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AuthProvider>
      <RoleGuard>
        <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 flex items-center gap-3 border-b px-4 sticky top-0 bg-background/80 backdrop-blur z-10">
              <SidebarTrigger />
              <div className="text-sm font-medium">Admin</div>
            </header>
            <main className="flex-1 p-6 overflow-x-hidden">
              <Outlet />
            </main>
          </div>
        </div>
        <Toaster />
        </SidebarProvider>
      </RoleGuard>
    </AuthProvider>
  );
}

function RoleGuard({ children }: { children: React.ReactNode }) {
  const { loading, roles, user } = useAuth();
  const nav = useNavigate();
  const allowed = roles.length > 0;

  useEffect(() => {
    if (!loading && user && !allowed) {
      nav({ to: "/", replace: true });
    }
  }, [loading, allowed, user, nav]);

  if (loading || (user && !allowed)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return <>{children}</>;
}