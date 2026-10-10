// GENERATED FILE — do not edit directly, edit mod.model.ts instead (regenerate with `pnpm build:wasm`).
// Mod.model.ts is the source template; build.ts splices the base64 wasm binary in here.
import {
  apply as librsync_apply,
  diff as librsync_diff,
  initSync,
  signature as librsync_signature,
} from "./src/initLibrsync.js";

// Replace the Deno-only @std/encoding/base64 `decodeBase64` with a dependency-free
// equivalent (atob is available in Node.js >= 16 and all modern browsers).
function decodeBase64(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

const wasmSource = "BASE64_ENCODED_WASM_BINARY";
let initialized = false;

function ensureInit() {
  if (initialized) {
    return;
  }
  initialized = true;
  initSync({ module: decodeBase64(wasmSource) });
}

/**
 * Compute the signature (or checksum) of the given file
 * @param data The input file
 * @param blockSize The granularity of the signature. Smaller block sizes yield larger, but more precise, signatures. (default 1024, must be greater than 0)
 * @param cryptoHashSize The number of bytes to use from the MD4 hash (default 16, must be at most 16). The larger this is, the less likely that a delta will be mis-applied.
 * @returns The signature of the file
 */
export function signature(
  data: Uint8Array,
  blockSize: number = 1024,
  cryptoHashSize: number = 16,
): Uint8Array<ArrayBuffer> {
  if (cryptoHashSize > 16) {
    throw new Error("cryptoHashSize must be at most 16");
  }
  if (blockSize <= 0) {
    throw new Error("blockSize must be greater than 0");
  }
  ensureInit();
  return librsync_signature(data, blockSize, cryptoHashSize) as Uint8Array<ArrayBuffer>;
}

/**
 * Given a signature and a new file, compute the diff between the two
 * @param signature The signature of the original file (as computed by `signature`)
 * @param otherFile The file to compare against the original
 * @returns A patch file that can be used to transform the original file into the new one
 */
export function diff(signature: Uint8Array, otherFile: Uint8Array): Uint8Array<ArrayBuffer> {
  ensureInit();
  return librsync_diff(signature, otherFile) as Uint8Array<ArrayBuffer>;
}

/**
 * Apply a patch to a file to get the new file
 * @param file The original file
 * @param patch The patch file (as computed by `diff`)
 * @returns The updated file which should match the original file
 */
export function apply(file: Uint8Array, patch: Uint8Array): Uint8Array<ArrayBuffer> {
  ensureInit();
  return librsync_apply(file, patch) as Uint8Array<ArrayBuffer>;
}
