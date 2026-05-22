const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Only proxy specific API endpoints to avoid ECONNREFUSED errors
  // Uncomment and configure if you have a backend server running
  /*
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Change to your backend port
      changeOrigin: true,
      secure: false,
      onError: function(err, req, res) {
        console.warn('Proxy error:', err.message);
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end('Proxy error: ' + err.message);
      },
      logLevel: 'silent'
    })
  );
  */
};