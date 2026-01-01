/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co",
      },
      {
        hostname: "min.otoplusid.com",
      },
    ],
  },
};

module.exports = nextConfig;
