/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  env: {
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN, // یہاں Env شامل کریں
  },
};

export default nextConfig;
