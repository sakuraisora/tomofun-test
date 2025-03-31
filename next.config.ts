import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.dog.ceo"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
