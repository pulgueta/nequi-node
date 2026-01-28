import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "./dist",
  splitting: true,
  clean: true,
  minify: true,
  platform: "node",
  treeshake: true,
  format: "esm",
});
