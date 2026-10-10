import { resolve } from "node:path";
import { defineConfig } from "vite-plus";

const root = import.meta.dirname;

export default defineConfig({
  // Self-reference resolves to the public entry so tests exercise it like a consumer.
  resolve: { alias: { "@dldc/librsync": resolve(root, "mod.ts") } },

  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["mod.ts"],
    },
  },

  fmt: {
    // Generated WASM artifacts are owned by wasm-pack / build.ts; keep them out of the churn.
    // mod.ts is generated from mod.model.ts (base64 splice) — oxfmt would wrap its huge
    // base64 literal differently than build.ts emits, breaking regen stability.
    ignorePatterns: [
      "**/__snapshots__/**",
      "**/*.md",
      ".github/**",
      "coverage/**",
      "dist/**",
      "node_modules/**",
      "src/initLibrsync.js",
      "src/initLibrsync.d.ts",
      "src/librsync.wasm",
      "mod.ts",
    ],
  },

  lint: {
    options: { typeAware: true, typeCheck: true },
    rules: {
      "no-explicit-any": "off",
    },
    overrides: [
      // Generated wasm-bindgen glue — not our code.
      { files: ["src/initLibrsync.js"], rules: { "no-unused-vars": "off" } },
    ],
  },

  pack: {
    // Entry map mirrors the deno export map (single "." entry).
    entry: { index: "mod.ts" },
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
  },
});
