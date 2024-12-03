use wasm_bindgen::prelude::*;
use fast_rsync::{apply as rsync_apply, diff as rsync_diff, Signature, SignatureOptions};

#[wasm_bindgen]
pub fn signature(data: &[u8], block_size: u32, crypto_hash_size: u32) -> Vec<u8> {
    let signature = Signature::calculate(
        data,
        SignatureOptions {
            block_size: block_size.saturating_add(1),
            crypto_hash_size: crypto_hash_size % 16,
        },
    );
    signature.serialized().to_vec()
}


#[wasm_bindgen]
pub fn diff(signature: &[u8], new_data: &[u8]) -> Result<Vec<u8>, JsValue> {
    let signature = Signature::deserialize(signature.to_vec()).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let indexed = signature.index();
    let mut patch = vec![];
    rsync_diff(&indexed, new_data, &mut patch).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(patch)
}

#[wasm_bindgen]
pub fn apply(base_data: &[u8], patch: &[u8]) -> Result<Vec<u8>, JsValue> {
    let mut out = vec![];
    rsync_apply(base_data, patch, &mut out).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(out)
}

