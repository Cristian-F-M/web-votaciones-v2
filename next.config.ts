import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL
  },
	allowedDevOrigins: ['192.168.0.101']
};

export default nextConfig;
