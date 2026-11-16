import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/dashboard/employee/:tab(projects|tasks|salary|payments|slips|contracts)",
        destination: "/dashboard/employee?tab=:tab",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
