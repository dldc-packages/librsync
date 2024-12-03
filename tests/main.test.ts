import { expect } from "@std/expect";
import { apply, diff, signature } from "../mod.ts";

Deno.test("basic usage", () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const baseFile = encoder.encode("Hello world");
  const targetFile = encoder.encode("Hello librsync World !");

  const sig = signature(baseFile, 1024, 32);
  const patch = diff(sig, targetFile);
  const result = apply(baseFile, patch);

  const resultStr = decoder.decode(result);
  expect(resultStr).toEqual("Hello librsync World !");
});
