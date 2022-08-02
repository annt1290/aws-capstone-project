/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    VERSION_HASH: process.env.VERSION_HASH,
  },
}

module.exports = nextConfig
