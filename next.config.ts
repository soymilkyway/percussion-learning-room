import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.BUILD_TARGET === "github-pages" ? {
    output: "export",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/percussion-learning-room",
    trailingSlash: true,
    images: { unoptimized: true },
    typescript: { tsconfigPath: "tsconfig.pages.json" },
  } : {}),
};

export default nextConfig;
