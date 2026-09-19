import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.unsplash.com' },
    ],
  },
  // Hostinger: export static or Node.js standalone
  // output: 'standalone', // uncomment for Hostinger Node.js deployment
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
