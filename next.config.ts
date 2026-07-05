import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.31.107"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ituvukhajkxmrwdxkmbs.supabase.co",
      },
    ],
  },
};

export default nextConfig;
