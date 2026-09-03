import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Cloudflare Pages 정적 호스팅용
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // 정적 export에서는 이미지 최적화 서버를 쓸 수 없다.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
