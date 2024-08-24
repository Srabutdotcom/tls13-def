import { assertEquals, equal } from "@std/assert";
import { Random, legacy_version, ProtocolVersion, } from "../src/mod.js";

Deno.test(
   "Key Exchange",
   () => {
      const random = new Random();
      assertEquals(random.length, 32);
      assertEquals(random instanceof Uint8Array, true);

      assertEquals(legacy_version.value(), 0x0303);

      const tls13version = new ProtocolVersion(772);
      assertEquals(tls13version.value(), 772)
   }
)
