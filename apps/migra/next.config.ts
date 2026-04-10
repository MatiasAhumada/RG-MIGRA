import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: [
    "82.29.62.125",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
