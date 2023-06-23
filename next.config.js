/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BASE_API_URL}/api/v1/:path*`,
      },
    ];
  },
};

const nextConfig = withPWA({
  dest: 'public',
  // disable: !isProduction,
  runtimeCaching: [],
})(config);

module.exports = nextConfig;
