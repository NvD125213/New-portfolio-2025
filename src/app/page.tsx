import React from "react";
import SidebarLayout from "./sidebar/layout";

export default function HomePage() {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to your dashboard
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Your main content here */}
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold">Card 1</h3>
            <p className="text-sm text-muted-foreground mt-2">
              This is your main content area
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="font-semibold">Card 2</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Content goes here
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="font-semibold">Card 3</h3>
            <p className="text-sm text-muted-foreground mt-2">
              More content here
            </p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
