import { expect } from "@std/expect";
import { apply, diff, signature } from "../mod.ts";

Deno.test("basic usage", () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const baseFile = encoder.encode("Hello world");
  const targetFile = encoder.encode("Hello librsync World !");

  const sig = signature(baseFile, 1024, 2);
  const patch = diff(sig, targetFile);
  const result = apply(baseFile, patch);

  const resultStr = decoder.decode(result);
  expect(resultStr).toEqual("Hello librsync World !");
});

Deno.test("Copy file", () => {
  const remoteFile = new Uint8Array([]);
  const localFile = new Uint8Array([1, 2, 3, 4, 5]);

  const sig = signature(remoteFile, 1024, 2);
  expect([...sig]).toEqual([114, 115, 1, 54, 0, 0, 4, 0, 0, 0, 0, 2]);
  const patch = diff(sig, localFile);
  expect([...patch]).toEqual([114, 115, 2, 54, 5, 1, 2, 3, 4, 5, 0]);
  const result = apply(remoteFile, patch);
  expect([...result]).toEqual([...localFile]);
  expect([...result]).toEqual([1, 2, 3, 4, 5]);
});
