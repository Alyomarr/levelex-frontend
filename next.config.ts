import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next doesn't pick a stray
  // package-lock.json from a parent directory for output file tracing.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
