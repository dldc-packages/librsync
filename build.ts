// Regenerate the WASM artifacts (src/initLibrsync.js, src/initLibrsync.d.ts,
// src/librsync.wasm) and the public entry mod.ts from the Rust source.
//
// Prerequisite: wasm-pack — https://rustwasm.github.io/wasm-pack/
//   wasm-pack build --target web --out-dir ../wasm
import { execFileSync } from "node:child_process";
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";

// Build the Rust crate to WASM and emit the JS/TS glue + wasm binary.
execFileSync("wasm-pack", ["build", "--target", "web", "--out-dir", "../wasm"], {
  cwd: "./rust",
  stdio: "inherit",
});

// Copy the generated files into src/.
copyFileSync("./wasm/librsync_rust_bg.wasm", "./src/librsync.wasm");
copyFileSync("./wasm/librsync_rust.d.ts", "./src/initLibrsync.d.ts");
copyFileSync("./wasm/librsync_rust.js", "./src/initLibrsync.js");

// Embed the wasm binary into mod.ts by splicing the base64 into the model template.
const base64 = readFileSync("./src/librsync.wasm").toString("base64");
const modelFile = readFileSync("./mod.model.ts", "utf8");
const modFile = modelFile.replace("BASE64_ENCODED_WASM_BINARY", base64);
writeFileSync("./mod.ts", modFile);
