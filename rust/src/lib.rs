use wasm_bindgen::prelude::*;
use fast_rsync::{apply as rsync_apply, diff as rsync_diff, Signature, SignatureOptions};

/// Generate a signature for the provided data using the specified block size and crypto hash size.
///
/// # Arguments
/// * `data` - The input data to generate the signature for.
/// * `block_size` - The granularity of the signature. Smaller block sizes yield larger, but more precise, signatures.
/// * `crypto_hash_size` - The number of bytes to use from the MD4 hash (must be at most 16). The larger this is, the less likely that a delta will be mis-applied.
#[wasm_bindgen]
pub fn signature(data: &[u8], block_size: u32, crypto_hash_size: u32) -> Result<Vec<u8>, JsValue> {
    if crypto_hash_size > 16 {
        return Err(JsValue::from_str("crypto_hash_size must be at most 16"));
    }
    let signature = Signature::calculate(
        data,
        SignatureOptions {
            block_size,
            crypto_hash_size,
        },
    );
    Ok(signature.serialized().to_vec())
}

/// Compute the diff (patch) between the signature and new data.
///
/// # Arguments
/// * `signature` - The signature bytes from the original data.
/// * `new_data` - The new data to compare against the signature.
#[wasm_bindgen]
pub fn diff(signature: &[u8], new_data: &[u8]) -> Result<Vec<u8>, JsValue> {
    let signature = Signature::deserialize(signature.to_vec()).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let indexed = signature.index();
    let mut patch = vec![];
    rsync_diff(&indexed, new_data, &mut patch).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(patch)
}

/// Apply a patch to the base data to reconstruct the new data.
///
/// # Arguments
/// * `base_data` - The original data.
/// * `patch` - The patch bytes to apply.
#[wasm_bindgen]
pub fn apply(base_data: &[u8], patch: &[u8]) -> Result<Vec<u8>, JsValue> {
    let mut out = vec![];
    rsync_apply(base_data, patch, &mut out).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(out)
}

