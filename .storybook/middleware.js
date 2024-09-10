const { createProxyMiddleware } = require("http-proxy-middleware");

// This is a slightly undocumented Storybook API: https://github.com/storybookjs/storybook/issues/15300

// Adds Storybook server middleware to proxy requests to /__pluto_proxy__ to https://pluto.sums.su
module.exports = function expressMiddleware(router) {
  router.use(
    "/__pluto_proxy__",
    createProxyMiddleware({
      target: "https://pluto.sums.su",
      changeOrigin: true,
    }),
  );

  router.use(
    "/__development_proxy__",
    createProxyMiddleware({
      target: "https://yorksu.org",
      changeOrigin: true,
    }),
  );

  router.use(
    "/__welcome_proxy__",
    createProxyMiddleware({
      target: "https://welcome-database.pages.dev",
      changeOrigin: true,
    }),
  );

  router.use(
    "/__welcome_proxy__",
    createProxyMiddleware({
      target: "https://welcome-api.yorksu.org",
      changeOrigin: true,
    }),
  );
};
