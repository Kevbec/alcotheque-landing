/**
 * Génère les favicons à partir de public/logo.png (PNG à plusieurs tailles + favicon.ico).
 * Lancer depuis la racine du projet : node scripts/generate-favicon.mjs
 */
import sharp from "sharp";

const input = "public/logo.png";

await sharp(input).resize(32, 32).toFile("public/favicon-32x32.png");
await sharp(input).resize(16, 16).toFile("public/favicon-16x16.png");
await sharp(input).resize(180, 180).toFile("public/apple-touch-icon.png");
await sharp(input).resize(192, 192).toFile("public/android-chrome-192x192.png");
await sharp(input).resize(512, 512).toFile("public/android-chrome-512x512.png");
// Même rendu 32×32 que favicon-32x32.png ; les navigateurs acceptent souvent un PNG sous le nom .ico
await sharp(input).resize(32, 32).toFile("public/favicon.ico");

console.log("Favicons generated!");
