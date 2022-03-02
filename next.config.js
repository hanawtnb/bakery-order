/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    api: process.env.STRAPI_URL,
  },
};

module.exports = nextConfig;
