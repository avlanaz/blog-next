/** @type {import("next").NextConfig} */
module.exports = {
  images: {
    domains: [
      "images.pexels.com"
    ],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  serverRuntimeConfig: {
    connectionString: "mongodb://localhost/blog",
    secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}