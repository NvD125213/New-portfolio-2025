import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },

      { protocol: "https", hostname: "cdn-new.topcv.vn" },
      { protocol: "https", hostname: "static.topcv.vn" },
      { protocol: "https", hostname: "itviec.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "cdn.worldvectorlogo.com" },
      { protocol: "https", hostname: "ui.shadcn.com" },
      { protocol: "https", hostname: "camo.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
