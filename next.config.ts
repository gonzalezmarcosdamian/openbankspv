import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/openbankspv",
  images: { unoptimized: true },
};

export default nextConfig;
