import { assertEquals } from "@std/assert";
import { CertificateVerify } from "../src/auth.js";

Deno.test(
   "Auth",
   () => {
      const b = CertificateVerify.algorithm.ecdsa_secp256r1_sha256.signature(new Uint8Array([1, 2, 3]))
      assertEquals(Array.from(b), [4, 3, 0, 3, 1, 2, 3]);
   }
)