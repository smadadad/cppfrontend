import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.modules.push(__dirname + "/src");
    return config;
  },
};

export default nextConfig;