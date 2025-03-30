/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com'],
  },
  env: {
    // The API key will be provided via .env file
  },
};

export default nextConfig;

