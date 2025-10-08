"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar/app-sidebar";
import { ModeToggle } from "@/components/ui/dark-mode-button";
// Main Layout Component
export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col h-screen min-w-0">
          <div className="mt-3 flex justify-between px-2">
            <SidebarTrigger />
            <ModeToggle />
          </div>

          <main className="flex-1 p-4 lg:p-6 overflow-y-auto overflow-x-hidden h-screen">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
