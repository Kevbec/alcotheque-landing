import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirections de secours : URLs sans préfixe de locale → /fr/… (évite les 404 où [locale] recevrait "blog", etc.).
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/fr/blog",
        permanent: false,
      },
      {
        source: "/blog/:slug",
        destination: "/fr/blog/:slug",
        permanent: false,
      },
      {
        source: "/support",
        destination: "/fr/support",
        permanent: false,
      },
      {
        source: "/privacy",
        destination: "/fr/privacy",
        permanent: false,
      },
      {
        source: "/terms",
        destination: "/fr/terms",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "toolbox.marketingtools.apple.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
