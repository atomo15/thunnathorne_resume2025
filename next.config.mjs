/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ตั้งค่า Static Export
  images: {
    unoptimized: true, // ปิด Image Optimization สำหรับ Static Export
  },
  basePath: '/thunnathorne_resume2025',
  assetPrefix: '/thunnathorne_resume2025/',
};

// module.exports = nextConfig;
export default nextConfig;
