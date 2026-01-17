const withPWA = require("next-pwa")({
  dest: "public",
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
