/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  output: 'standalone',
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${
          process.env.BASE_API_URL || 'https://api.doribottle-id.co.kr'
        }/api/v1/:path*`,
      },
    ];
  },
  images: {
    domains: ['doribottle-asset.s3.ap-northeast-2.amazonaws.com'],
  },
};

const nextConfig = withPWA({
  dest: 'public',
  disable: !isProduction,
  runtimeCaching: [],
})(config);

module.exports = nextConfig;
