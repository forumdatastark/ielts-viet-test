/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com',
                port: '',
                pathname: '/128/**',
            },
            {
                protocol: 'https',
                hostname: 'ktdcgroup.vn',
                port: '',
                pathname: '/wp-content/**',
            },
        ],
    },
};

export default nextConfig;
