/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "random.imagecdn.app",
        protocol: "https"
      }
    ]
  }
}

module.exports = nextConfig
