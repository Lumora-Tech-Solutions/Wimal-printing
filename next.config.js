/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/', destination: '/services', permanent: false }];
  },
};
module.exports = nextConfig;
