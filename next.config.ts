import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  // Repository name for GitHub Pages
  basePath: '/infinite-puppy',
  assetPrefix: '/infinite-puppy',
};

export default nextConfig;

export default nextConfig;
