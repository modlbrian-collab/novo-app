/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações básicas para resolver problemas de fetch
  experimental: {
    turbo: false,
  },
  // Configurações de imagens
  images: {
    unoptimized: true,
  },
  // Configurações de webpack simplificadas
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

export default nextConfig