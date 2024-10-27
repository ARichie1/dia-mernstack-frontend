const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
      target: 'http://127.0.0.1:4000/api',
      changeOrigin: true,
    })
  );

  app.use(
    '/socket.io', createProxyMiddleware({
      target: 'http://127.0.0.1:4000',
      ws: true
    })
  );
};