/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "cms-2023.daihatsu.co.id",
      },
      {
        hostname: "api.otoplusid.com",
      },
      {
        hostname: "min.otoplusid.com",
      },
    ],
  },
};

module.exports = nextConfig;
