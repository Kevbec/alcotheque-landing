import sharp from "sharp";

const input = "public/logo.png";
const sizes = [16, 32, 180, 192, 512];

async function generateFavicon(size, outputPath) {
  const padding = Math.round(size * 0.1);
  const logoSize = size - padding * 2;
  const radius = Math.round(size * 0.2);

  // Create rounded white background mask
  const roundedMask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>`
  );

  // Resize logo with padding
  const resizedLogo = await sharp(input)
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toBuffer();

  // Composite: white rounded background + centered logo
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      { input: roundedMask, blend: "dest-in" },
      {
        input: resizedLogo,
        top: padding,
        left: padding,
      },
    ])
    .png()
    .toFile(outputPath);
}

await generateFavicon(32, "public/favicon-32x32.png");
await generateFavicon(16, "public/favicon-16x16.png");
await generateFavicon(180, "public/apple-touch-icon.png");
await generateFavicon(192, "public/android-chrome-192x192.png");
await generateFavicon(512, "public/android-chrome-512x512.png");
await generateFavicon(32, "public/favicon.ico");

console.log("Favicons generated with white background and rounded corners!");
