import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { prerenderPaths } from "./app/config/prerender";
import { generateSeoFiles } from "./app/config/seo";

const prerenderedPaths = new Set(prerenderPaths);

export default defineConfig({
  resolve: { alias: { "~": fileURLToPath(new URL("./app", import.meta.url)) } },
  plugins: [
    reactRouter(),
    {
      name: "portfolio-seo",
      apply: "build",
      configResolved(config) {
        generateSeoFiles(config.env.VITE_SITE_URL, config.publicDir);
      },
    },
    {
      name: "portfolio-prerender-preview",
      configurePreviewServer(server) {

        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url ?? "/", "http://localhost");
          const pathname = url.pathname.replace(/\/$/, "") || "/";
          if (prerenderedPaths.has(pathname)) {
            request.url = `${pathname === "/" ? "" : pathname}/index.html${url.search}`;
          } else if (request.headers.accept?.includes("text/html")) {
            const requestedFile = resolve(
              server.config.root,
              server.config.build.outDir,
              `.${url.pathname}`,
            );
            if (statSync(requestedFile, { throwIfNoEntry: false })?.isFile()) {
              next();
              return;
            }
            try {
              const fallback = readFileSync(
                resolve(
                  server.config.root,
                  server.config.build.outDir,
                  "__spa-fallback.html",
                ),
              );
              response.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8",
              });
              response.end(fallback);
            } catch (error) {
              next(error);
            }
            return;
          }
          next();
        });
      },
    },
  ],
  preview: { port: 4173, strictPort: true },
});
