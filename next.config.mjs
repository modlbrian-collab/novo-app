/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações para resolver problemas de fetch e HMR
  experimental: {
    // Desabilita o turbopack que pode causar conflitos
    turbo: false,
  },
  // Configurações de headers para evitar problemas de CORS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  // Configurações de imagens para evitar problemas com uploads
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Configurações de webpack para resolver problemas de módulos
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