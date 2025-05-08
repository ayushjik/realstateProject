/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['leafletjs.com'],
      },
      webpack(config) {
        config.module.rules.push({
          test: /\.png$/,
          type: 'asset/resource',
        });
        return config;
      },
};

export default nextConfig;


