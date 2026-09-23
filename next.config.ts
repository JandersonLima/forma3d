import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Adicione aqui o domínio do seu CDN de imagens quando sair dos assets locais.
    remotePatterns: [],
  },
  experimental: { optimizePackageImports: ["clsx"] },
};

export default nextConfig;
