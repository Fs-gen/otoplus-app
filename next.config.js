const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
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
});
