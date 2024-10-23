/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gainesville.com',
        port: '',
      }
    ]
  }
};

export default nextConfig;
