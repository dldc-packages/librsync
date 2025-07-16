/* tslint:disable */
/* eslint-disable */
/**
 * Generate a signature for the provided data using the specified block size and crypto hash size.
 *
 * # Arguments
 * * `data` - The input data to generate the signature for.
 * * `block_size` - The granularity of the signature. Smaller block sizes yield larger, but more precise, signatures.
 * * `crypto_hash_size` - The number of bytes to use from the MD4 hash (must be at most 16). The larger this is, the less likely that a delta will be mis-applied.
 */
export function signature(data: Uint8Array, block_size: number, crypto_hash_size: number): Uint8Array;
/**
 * Compute the diff (patch) between the signature and new data.
 *
 * # Arguments
 * * `signature` - The signature bytes from the original data.
 * * `new_data` - The new data to compare against the signature.
 */
export function diff(signature: Uint8Array, new_data: Uint8Array): Uint8Array;
/**
 * Apply a patch to the base data to reconstruct the new data.
 *
 * # Arguments
 * * `base_data` - The original data.
 * * `patch` - The patch bytes to apply.
 */
export function apply(base_data: Uint8Array, patch: Uint8Array): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly signature: (a: number, b: number, c: number, d: number) => [number, number, number, number];
  readonly diff: (a: number, b: number, c: number, d: number) => [number, number, number, number];
  readonly apply: (a: number, b: number, c: number, d: number) => [number, number, number, number];
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
