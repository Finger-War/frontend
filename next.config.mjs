/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },

  experimental: {
    forceSwcTransforms: true,
  },

  env: {
    API_HTTP_URL: process.env.API_HTTP_URL,
    API_WS_URL: process.env.API_WS_URL,
  },
};

export default nextConfig;
