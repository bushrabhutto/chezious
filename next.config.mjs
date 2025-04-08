/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "www.themealdb.com",
          pathname: "/images/**", // Allow all images from Themealdb
        },
      ],
    },
  };
  
  export default nextConfig;
  