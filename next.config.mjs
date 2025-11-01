import fs from "node:fs";
import path from "node:path";
import { withContentlayer } from "next-contentlayer";

const repoRoot = process.cwd();
const localSdkEntry = path.resolve(repoRoot, "../arxpool-sdk/dist/index.js");
const vendorSdkEntry = path.resolve(repoRoot, "lib/vendor/arxpool-sdk");
const sdkAliasTarget = fs.existsSync(localSdkEntry) ? localSdkEntry : vendorSdkEntry;

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["@arxpool-hq/sdk"] = sdkAliasTarget;
    return config;
  }
};

export default withContentlayer(nextConfig);
