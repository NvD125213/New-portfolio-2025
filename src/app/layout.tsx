import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import BackgroundMeteors from "@/components/ui/backgroundmeteors";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

const geistMono = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-mono",
  display: "swap",
  preload: false, // Chỉ preload font chính
});

export const metadata: Metadata = {
  title: "Ngô Văn Đức - My Portfolio",
  description: "Chào mừng đến với website cá nhân của tôi",
  keywords: ["portfolio", "developer", "fullstack", "react", "nextjs"],
  authors: [{ name: "Ngô Văn Đức" }],
  creator: "Ngô Văn Đức",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://your-domain.com",
    title: "Ngô Văn Đức - My Portfolio",
    description: "Chào mừng đến với website cá nhân của tôi",
    siteName: "Ngô Văn Đức Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ngô Văn Đức - My Portfolio",
    description: "Chào mừng đến với website cá nhân của tôi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/article/bg-technical-2.jpg" as="image" />
        <link rel="preload" href="/avatar/avatar.png" as="image" />
        <link rel="preload" href="/experience/gif_experience.gif" as="image" />

        {/* DNS prefetch cho external domains */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//cdn-new.topcv.vn" />
        <link rel="dns-prefetch" href="//itviec.com" />

        {/* Preconnect cho critical external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
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
