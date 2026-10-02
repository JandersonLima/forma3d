import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Acha src/i18n/request.ts sozinho.
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Adicione aqui o domínio do seu CDN de imagens quando sair dos assets locais.
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
