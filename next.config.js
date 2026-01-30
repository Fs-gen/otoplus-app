const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.lottie$/,
      type: "asset/resource",
    });
    return config;
  },
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
