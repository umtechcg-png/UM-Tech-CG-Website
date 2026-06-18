import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  ShoppingBag,
  FileText,
  Image as ImageIcon,
  Mail,
  UserCog,
  Search,
  Settings,
  Shield,
  History,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth, type AppRole } from "@/lib/auth";
import { Button } from "@/components/ui/button";

type Item = { title: string; url: string; icon: any; roles?: AppRole[] };

const dashboardGroup: Item[] = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
];

const crmGroup: Item[] = [
  { title: "Leads", url: "/admin/leads", icon: Users, roles: ["super_admin", "admin", "sales_manager"] },
  { title: "Enquiries", url: "/admin/enquiries", icon: Mail, roles: ["super_admin", "admin", "sales_manager"] },
];

const contentGroup: Item[] = [
  { title: "Services", url: "/admin/content/services", icon: Briefcase, roles: ["super_admin", "admin"] },
  { title: "Packages", url: "/admin/content/packages", icon: Package, roles: ["super_admin", "admin"] },
  { title: "Products", url: "/admin/content/products", icon: ShoppingBag, roles: ["super_admin", "admin"] },
  { title: "Homepage", url: "/admin/content/homepage", icon: LayoutDashboard, roles: ["super_admin", "admin"] },
];

const editorialGroup: Item[] = [
  { title: "Blog", url: "/admin/blog", icon: FileText, roles: ["super_admin", "admin", "editor"] },
  { title: "Media", url: "/admin/media", icon: ImageIcon, roles: ["super_admin", "admin", "editor"] },
];

const adminGroup: Item[] = [
  { title: "Users & Roles", url: "/admin/users", icon: UserCog, roles: ["super_admin"] },
  { title: "SEO", url: "/admin/seo", icon: Search, roles: ["super_admin"] },
  { title: "Site Settings", url: "/admin/settings", icon: Settings, roles: ["super_admin"] },
  { title: "Activity Log", url: "/admin/activity", icon: History, roles: ["super_admin", "admin"] },
  { title: "Security", url: "/admin/security", icon: Shield },
];

function visible(items: Item[], has: (r: AppRole | AppRole[]) => boolean) {
  return items.filter((i) => !i.roles || has(i.roles));
}

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { hasRole, signOut, user, roles } = useAuth();
  const isActive = (p: string) => pathname === p || (p !== "/admin" && pathname.startsWith(p));

  const groups: [string, Item[]][] = [
    ["Overview", visible(dashboardGroup, hasRole)],
    ["CRM", visible(crmGroup, hasRole)],
    ["Content", visible(contentGroup, hasRole)],
    ["Editorial", visible(editorialGroup, hasRole)],
    ["Administration", visible(adminGroup, hasRole)],
  ].filter(([, items]) => items.length > 0) as [string, Item[]][];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <Link to="/admin" className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-8 h-8 rounded-md bg-gradient-brand flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm">UM Tech CG</span>
              <span className="text-xs text-muted-foreground">Admin Portal</span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {groups.map(([label, items]) => (
          <SidebarGroup key={label}>
            {!collapsed && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t">
        {!collapsed && user && (
          <div className="px-2 py-1.5 text-xs">
            <div className="truncate font-medium">{user.email}</div>
            <div className="text-muted-foreground capitalize">{roles[0]?.replace("_", " ") ?? "no role"}</div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={signOut} className="justify-start gap-2">
          <LogOut className="h-4 w-4" />
          {!collapsed && "Sign out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}