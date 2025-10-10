import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tối ưu hiệu suất
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Tối ưu images
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "cdn-1.webcatalog.io" },
      { protocol: "https", hostname: "images.viblo.asia" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn-new.topcv.vn" },
      { protocol: "https", hostname: "static.topcv.vn" },
      { protocol: "https", hostname: "itviec.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "cdn.worldvectorlogo.com" },
      { protocol: "https", hostname: "ui.shadcn.com" },
      { protocol: "https", hostname: "camo.githubusercontent.com" },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Tối ưu compiler
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Tối ưu bundle
  // webpack: (config, { dev, isServer }) => {
  //   if (!dev && !isServer) {
  //     config.optimization.splitChunks = {
  //       chunks: "all",
  //       cacheGroups: {
  //         vendor: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name: "vendors",
  //           chunks: "all",
  //         },
  //       },
  //     };
  //   }
  //   return config;
  // },

  // Headers cho performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
