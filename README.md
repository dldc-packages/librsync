# ♻️ Librsync

> This is a WASM build of the [fast_rsync](https://github.com/dropbox/fast_rsync) crate implementing the
> [rsync algorithm](https://www.andrew.cmu.edu/course/15-749/READINGS/required/cas/tridgell96.pdf)

## Installation

```sh
deno add @jsr:@dldc/librsync
```

## Usage

```ts
import { apply, diff, prepare } from "@dldc/librsync";

const checksum = signature(destFile); // you can specify block size as second argument
// send checksum to source...
const patch = diff(checksum, sourceFile);
// send patch to dest...
const syncedFile = apply(destFile, patch);
```
