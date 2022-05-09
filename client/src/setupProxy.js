const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: 'http://141.95.166.131:8055',
      changeOrigin: true,
    })
  );
};