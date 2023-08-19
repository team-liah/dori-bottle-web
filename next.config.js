/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  output: 'standalone',
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    baseApiUrl: process.env.BASE_API_URL || 'https://api.doribottle-id.co.kr',
  },
  publicRuntimeConfig: {
    hostUrl: isProduction
      ? 'https://www.doribottle-id.co.kr'
      : 'http://localhost:4000',
    tossPaymentClientKey: process.env.TOSS_PAYMENT_CLIENT_KEY,
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
