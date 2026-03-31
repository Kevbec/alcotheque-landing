import path from "path";
import { fileURLToPath } from "url";
import createNextIntlPlugin from "next-intl/plugin";

// Équivalent ESM de `__dirname` (config exécutée en Node au build, pas sur Edge).
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { nextRuntime }) => {
    // Middleware Edge : évite le `next/server` complet qui embarque ua-parser-js (`__dirname`).
    if (nextRuntime === "edge") {
      config.resolve.alias = {
        ...config.resolve.alias,
        "next/server$": path.join(__dirname, "next-server-edge-stub.ts"),
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
