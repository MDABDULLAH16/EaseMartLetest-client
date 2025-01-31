/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL, // Load environment variable
  },
};

module.exports = nextConfig;
