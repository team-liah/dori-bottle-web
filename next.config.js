/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

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
};

const nextConfig = withPWA({
  dest: 'public',
  runtimeCaching: [],
})(config);

module.exports = nextConfig;
