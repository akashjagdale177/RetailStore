import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Read the single central config file (credentials/urls.json) so the
 * frontend automatically points at the right gateway URL. If you change
 * "GATEWAY_URL" in ../credentials/urls.json and rebuild/restart the dev
 * server, every API call in the app repoints itself - no other file to touch.
 */
function loadGatewayUrl() {
  try {
    const raw = fs.readFileSync(path.resolve(__dirname, '../credentials/urls.json'), 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed.GATEWAY_URL !== undefined ? parsed.GATEWAY_URL : 'http://localhost:5000';
  } catch (err) {
    console.warn('[frontend] Could not read ../credentials/urls.json, falling back to .env / default.');
    return process.env.VITE_GATEWAY_URL !== undefined ? process.env.VITE_GATEWAY_URL : 'http://localhost:5000';
  }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __GATEWAY_URL__: JSON.stringify(loadGatewayUrl()),
  },
  server: {
    port: 5173,
    host: true,
  },
});
