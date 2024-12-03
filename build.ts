import { encodeBase64 } from "@std/encoding";

// Init rust project
// wasm-pack build --target deno --out-dir ../wasm
const command = new Deno.Command("wasm-pack", {
  args: ["build", "--target", "web", "--out-dir", "../wasm"],
  cwd: "./rust",
  stdout: "inherit",
  stderr: "inherit",
});
await command.output();

// Copy files
await Deno.copyFile("./wasm/librsync_rust_bg.wasm", "./src/librsync.wasm");
await Deno.copyFile("./wasm/librsync_rust.d.ts", "./src/initLibrsync.d.ts");
await Deno.copyFile("./wasm/librsync_rust.js", "./src/initLibrsync.js");

const wasmFile = await Deno.readFile("./src/librsync.wasm");
const base64 = encodeBase64(wasmFile);

const modelFile = await Deno.readTextFile("./mod.model.ts");

const modFile = modelFile
  .replace("BASE64_ENCODED_WASM_BINARY", base64)
  .replace("mod.ts", "mod.model.ts");

await Deno.writeTextFile("./mod.ts", modFile);
