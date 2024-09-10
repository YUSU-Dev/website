import axios from "https://unpkg.com/axios@1.6.8/dist/esm/axios.min.js";

axios.interceptors.request.use(function (config) {
  if (config.url.includes("pluto.sums.su")) {
    config.headers["x-site-id"] ||= "tZyLG9BX9f4hdTp2HLva5c";
  }

  // In production component builds the block below will be compiled out
  if (process.env.NODE_ENV !== "production") {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      config.url = config.url.replace(
        "https://pluto.sums.su/",
        "/__pluto_proxy__/",
      );
      config.url = config.url.replace(
        "https://yorksu.org/",
        "/__development_proxy__/",
      );
      config.url = config.url.replace(
        "https://welcome-database.pages.dev/",
        "/__welcome_proxy__/",
      );
      config.url = config.url.replace(
        "https://welcome-api.yorksu.org/",
        "/__welcome_proxy__/",
      );
    }
  }

  return config;
});

export default axios;
