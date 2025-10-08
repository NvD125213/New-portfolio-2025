import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import BackgroundMeteors from "@/components/ui/backgroundmeteors";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const geistMono = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-mono",
});

export const metadata: Metadata = {
  title: "Ngô Văn Đức - My Portfolio",
  description: "Chào mừng đến với website cá nhân của tôi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Sử dụng className thay vì variable */}
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <BackgroundMeteors>{children}</BackgroundMeteors>
        </ThemeProvider>
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
