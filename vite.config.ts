import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import path from "node:path";

// A publicação envia a pasta `dist/`. O preset "cloudflare-module" escreve o
// app ahí (dist/server + dist/client). Para gerar o pacote da Vercel, rode:
//   NITRO_PRESET=vercel npm run build   (sai em .vercel/output)
const nitroPreset = process.env.NITRO_PRESET || "cloudflare-module";
const publishesToDist = nitroPreset === "cloudflare-module";

export default defineConfig(({ command }) => ({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    command === "build" &&
      nitro({
        preset: nitroPreset,
        ...(publishesToDist
          ? {
              output: {
                dir: "dist",
                serverDir: "dist/server",
                publicDir: "dist/client",
              },
              cloudflare: {
                nodeCompat: true,
                deployConfig: true,
              },
            }
          : {}),
      }),
    viteReact(),
  ].filter(Boolean),
}));
