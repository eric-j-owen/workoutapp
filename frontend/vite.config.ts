/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
    // proxy: {
    //   "/api": {
    //     target: "http://127.0.0.1:3000",
    //     changeOrigin: true,
    //     secure: false,
    //     configure: (proxy, _options) => {
    //       proxy.on("error", (err, _req, _res) => {
    //         console.log("proxy error", err);
    //       });
    //       proxy.on("proxyReq", (_proxyReq, req, _res) => {
    //         console.log("Sending Request to the Target:", req.method, req.url);
    //       });
    //       proxy.on("proxyRes", (proxyRes, req, _res) => {
    //         console.log(
    //           "Received Response from the Target:",
    //           proxyRes.statusCode,
    //           req.url
    //         );
    //       });
    //     },
    //   },
    // },
    // watch: {
    //   usePolling: true,
    // },
  },
});
