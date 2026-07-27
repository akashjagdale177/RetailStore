require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const routeMap = require('./config/routes');
const config = require('../credentials/config');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));

// Health check for the gateway itself
app.get('/health', (req, res) => res.json({ success: true, service: 'gateway-service', status: 'healthy' }));

// Simple service directory - useful when practicing service discovery
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    data: routeMap.map((r) => ({ path: r.path, target: r.target })),
  });
});

// Register a proxy for every entry in the route map
routeMap.forEach(({ path, target, rewrite }) => {
  app.use(
    path,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: rewrite,
      onError: (err, req, res) => {
        console.error(`[gateway-service] Proxy error for ${path} -> ${target}: ${err.message}`);
        res.status(502).json({ success: false, message: `Upstream service unavailable: ${path}` });
      },
    })
  );
});

app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }));

app.listen(PORT, () => {
  console.log(`[gateway-service] running on port ${PORT}`);
  console.log(`[gateway-service] frontend expected at ${config.FRONTEND_URL}`);
  routeMap.forEach((r) => console.log(`[gateway-service]   ${r.path} -> ${r.target}`));
});
