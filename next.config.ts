import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ['embla-carousel-autoplay', 'embla-carousel-fade'],
    images: {
        domains: ['image.tmdb.org'],
      },
};

export default nextConfig;
