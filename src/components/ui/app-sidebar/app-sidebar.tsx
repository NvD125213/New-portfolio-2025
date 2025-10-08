import {
  Calendar,
  Home,
  Settings,
  Contact,
  LayoutDashboard,
  Projector,
  BookAIcon,
  User,
  LucidePhoneCall,
  ArrowRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import LustreText from "@/components/ui/lustretext";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const homeItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Project",
    url: "/project",
    icon: Projector,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: BookAIcon,
  },
  {
    title: "About",
    url: "/about",
    icon: User,
  },
  {
    title: "Chatbot",
    url: "/chatbot",
    icon: LucidePhoneCall,
  },
];

const settingsItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Contact,
  },
];

export function AppSidebar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Xử lý transition sidebar
  const { open } = useSidebar();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Xử lý lấy pathname
  const isActive = (url: string) => {
    return pathname == url || pathname.startsWith(url + "/");
  };

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "h-screen transition-all duration-700 ease-in-out flex flex-col items-center justify-center",
        open ? "w-64" : "w-[100px]"
      )}>
      <SidebarHeader
        className={cn("flex justify-center", open ? "border-b, p-4" : "")}>
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Avatar className={cn(open ? "h-16 w-16" : "h-8 w-8")}>
            <AvatarImage src="/avatar/avatar.png" alt="Ngô Văn Đức" />
            <AvatarFallback>NVD Avatar</AvatarFallback>
          </Avatar>

          {/* Name + Badge */}
          {open && (
            <div className="flex flex-col items-start space-y-1">
              <div className="flex items-center gap-2 w-[150px]">
                <LustreText
                  text="Ngô Văn Đức"
                  className="text-lg font-semibold inline-block text-neutral-700 dark:lustre-dark"
                />
              </div>

              <Badge
                variant="secondary"
                className="text-xs text-neutral-700 dark:text-zinc-50">
                @dennisngo
              </Badge>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {homeItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-md py-2 font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                        open ? "px-3 justify-between" : "px-0 justify-center", // 👈 quan trọng
                        isActive(item.url)
                          ? "bg-accent text-accent-foreground"
                          : ""
                      )}>
                      {/* bên trái: icon + text */}
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {open && <span>{item.title}</span>}
                      </div>

                      {/* bên phải: mũi tên */}
                      {isActive(item.url) && open && (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        {open && (
          <div className="text-xs text-muted-foreground text-center min-w-[200px]">
            © 2025 Dennis Ngo Portfolio
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
