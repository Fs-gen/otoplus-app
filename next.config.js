/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co",
      },
      {
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
};

module.exports = nextConfig;
