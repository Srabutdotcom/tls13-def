import { assertEquals, equal } from "@std/assert";
import { Random, ProtocolVersion, CipherSuite, CipherSuites } from "../src/keyexchange.js";

Deno.test(
   "Key Exchange",
   () => {
      const random = new Random();
      assertEquals(random.length, 32);
      assertEquals(random instanceof Uint8Array, true);

      assertEquals(ProtocolVersion.version.legacy.value(), 0x0303);

      const tls13version = new ProtocolVersion(772);
      assertEquals(tls13version.value(), 772)

      const tls12 = ProtocolVersion.version.TLS12;
      assertEquals(tls12.value(),0x0303)

      equal(CipherSuite.TLS_AES_128_GCM_SHA256, new Uint8Array([19, 1]))
      equal(CipherSuites.new, new Uint8Array([0, 4, 19, 1, 19, 2]))
   }
)
