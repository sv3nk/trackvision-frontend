/** @type {import('next').NextConfig} */
const nextConfig = {  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rcycledemo.trackvision.ai',
        port: '',
        pathname: '/assets/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
