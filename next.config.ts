import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.133'],

  // ─── Image Optimization ───────────────────────────────────────────────────
  // Allow Next.js to optimize/resize/convert-to-WebP images from these domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',  // for any images stored in Supabase Storage
      },
    ],
    // Use modern image formats for smaller file sizes
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 30 days
    minimumCacheTTL: 2592000,
  },

  // ─── Compression ─────────────────────────────────────────────────────────
  compress: true,

  // ─── Experimental ─────────────────────────────────────────────────────────
  experimental: {
    // Optimize package imports to reduce JS bundle size
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
