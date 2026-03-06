import createNextIntlPlugin from "next-intl/plugin";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flower.elevateegy.com",
        pathname: "/**",
      },
    ],
  },
};

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
