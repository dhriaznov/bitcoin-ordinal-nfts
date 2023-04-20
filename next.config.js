/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ordin.s3.amazonaws.com',
        port: '',
        pathname: '/inscriptions/**',
      },
    ],
  },
};

module.exports = nextConfig;
