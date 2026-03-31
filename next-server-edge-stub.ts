/**
 * Sous-ensemble de `next/server` pour le bundle middleware (Edge).
 * Le module complet charge `user-agent` → `ua-parser-js`, qui référence `__dirname`
 * (inexistant sur l’Edge Runtime Vercel). next-intl n’utilise que `NextResponse`.
 */
export { NextResponse } from "next/dist/server/web/spec-extension/response";
export { NextRequest } from "next/dist/server/web/spec-extension/request";
