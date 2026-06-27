import { defineConfig, loadEnv, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";

// Dev-only: run the real api/chat.ts handler as middleware inside `npm run dev`
// so the chatbot is fully functional without `vercel dev`. Production uses the
// actual Vercel function at /api/chat. `apply: "serve"` keeps this out of builds.
function devApi(): PluginOption {
  return {
    name: "dev-api-chat",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res) => {
        try {
          const mod = await server.ssrLoadModule("/api/chat.ts");
          const handler = mod.default as (req: unknown, res: unknown) => Promise<void>;
          let body = "";
          for await (const chunk of req) body += chunk;
          const vReq = { method: req.method, body: body ? JSON.parse(body) : {} };
          const vRes = {
            status(code: number) {
              res.statusCode = code;
              return this;
            },
            json(obj: unknown) {
              res.setHeader("content-type", "application/json");
              res.end(JSON.stringify(obj));
            },
          };
          await handler(vReq, vRes);
        } catch (err) {
          res.statusCode = 500;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ error: "The assistant is unavailable right now. Please try again." }));
          server.config.logger.error(`/api/chat dev error: ${String(err)}`);
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env (all keys, no VITE_ prefix) so the dev handler can read GOOGLE_API_KEY.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return {
    plugins: [react(), devApi()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            three: ["three", "three-stdlib"],
            "react-three": ["@react-three/fiber", "@react-three/drei"],
            gsap: ["gsap"],
            vendor: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      include: ["three", "gsap", "lenis"],
    },
  };
});
