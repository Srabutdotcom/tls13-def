import { assertEquals, equal } from "@std/assert";
import { TLSPlaintext } from "../src/record.js";
import { Alert } from "../src/alert.js";

Deno.test(
   "Record - TLSPlaintext",
   () => {
      const alert = TLSPlaintext.alert(Alert.bad_record_mac)
      assertEquals(Array.from(alert),[21, 3, 3, 0, 2, 2, 20])

      const app = TLSPlaintext.application_data(new Uint8Array([1, 5, 8]))
      assertEquals(Array.from(app),[23, 3, 3, 0, 3, 1, 5, 8])

      const CCipSpec = TLSPlaintext.change_cipher_spec()  
      assertEquals(Array.from(CCipSpec),[20, 3, 3, 0, 1, 1])

      const hndsk = TLSPlaintext.handshake(new Uint8Array([1, 5, 8]))
      assertEquals(Array.from(hndsk),[22, 3, 3, 0, 3, 1, 5, 8])

      const hebet = TLSPlaintext.heartbeat(new Uint8Array([1, 5, 8]))
      assertEquals(Array.from(hebet),[24, 3, 3, 0, 3, 1, 5, 8])

      const inval = TLSPlaintext.invalid(new Uint8Array([1, 5, 8]))
      assertEquals(Array.from(inval),[0, 3, 3, 0, 3, 1, 5, 8])

   }
)