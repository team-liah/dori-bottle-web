/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
};

const nextConfig = withPWA({
  dest: 'public',
  // disable: !isProduction,
  runtimeCaching: [],
})(config);

module.exports = nextConfig;
