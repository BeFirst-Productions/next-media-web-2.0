// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // Optional but recommended: 
  // If you are using the <Image /> component, you must set unoptimized to true
  // because the default Next.js image optimization requires a Node server.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;