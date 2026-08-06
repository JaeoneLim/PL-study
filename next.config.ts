import type { NextConfig } from "next";

const isPagesBuild = process.env.SEMANTIC_ATLAS_STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isPagesBuild
  ? {
      output: "export",
      trailingSlash: true,
      basePath,
      assetPrefix: basePath,
      images: {
        unoptimized: true,
      },
      typescript: {
        tsconfigPath: "tsconfig.pages.json",
      },
    }
  : {};

export default nextConfig;
