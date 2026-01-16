/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "api.otoplusid.com",
      },
      {
        hostname: "api.otoplusid.com",
      },
    ],
  },
};

module.exports = nextConfig;
