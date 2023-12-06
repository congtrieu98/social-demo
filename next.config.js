/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'n7mtrdyzbxbfisaq.public.blob.vercel-storage.com',
          },
        ],
      },
}

module.exports = nextConfig
