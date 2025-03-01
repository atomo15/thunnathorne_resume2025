/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'next export', // ตั้งค่า Static Export
  images: {
    unoptimized: true, // ปิด Image Optimization สำหรับ Static Export
  },
};

module.exports = nextConfig;
// export default nextConfig;
