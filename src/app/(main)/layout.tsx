import React from "react";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col lg:flex-row lg:gap-2 lg:py-4 xl:pb-8">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
