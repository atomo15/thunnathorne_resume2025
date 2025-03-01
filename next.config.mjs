// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ตั้งค่า Static Export
  images: {
    unoptimized: true, // ปิด Image Optimization
  },
};

// module.exports = nextConfig;
export default nextConfig;
