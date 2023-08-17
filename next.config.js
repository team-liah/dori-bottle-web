/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  output: 'standalone',
  reactStrictMode: true,
  publicRuntimeConfig: {
    hostUrl:
      process.env.NEXT_PUBLIC_HOST_URL || 'https://api.doribottle-id.co.kr',
    tossPaymentClientKey: process.env.NEXT_PUBLIC_TOSS_PAYMENT_CLIENT_KEY,
  },
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
};

const nextConfig = withPWA({
  dest: 'public',
  disable: !isProduction,
  runtimeCaching: [],
})(config);

module.exports = nextConfig;
