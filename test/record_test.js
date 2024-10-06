import { assertEquals, equal } from "jsr:@std/assert";
import { TLSPlaintext } from "../src/record.js";
import { Alert } from "../src/alert.js";
import { ClientHello } from "../src/clienthello.js";

Deno.test(
   "Record - TLSPlaintext",
   () => {
      const alert = TLSPlaintext.alert(Alert.bad_record_mac)
      assertEquals(Array.from(alert), [21, 3, 3, 0, 2, 2, 20])

      const app = TLSPlaintext.application_data(new Uint8Array([1, 5, 8]))
      assertEquals(Array.from(app), [23, 3, 1, 0, 3, 1, 5, 8])

      const CCipSpec = TLSPlaintext.change_cipher_spec()
      assertEquals(Array.from(CCipSpec), [20, 3, 1, 0, 1, 1])

      const hndsk = TLSPlaintext.handshake(ClientHello.a('smtp'))
      assertEquals(hndsk.member[3].constructor.name, "Handshake")

      const hebet = TLSPlaintext.heartbeat(new Uint8Array([1, 5, 8]))
      assertEquals(Array.from(hebet), [24, 3, 1, 0, 3, 1, 5, 8])

      const inval = TLSPlaintext.invalid(new Uint8Array([1, 5, 8]))
      assertEquals(Array.from(inval), [0, 3, 1, 0, 3, 1, 5, 8])

   }
)

Deno.test(
   "clientHello",
   () => {
      const clienthello = `16 03 01 00 c4 01 00 00 c0 03 03 cb
34 ec b1 e7 81 63 ba 1c 38 c6 da cb 19 6a 6d ff a2 1a 8d 99 12
ec 18 a2 ef 62 83 02 4d ec e7 00 00 06 13 01 13 03 13 02 01 00
00 91 00 00 00 0b 00 09 00 00 06 73 65 72 76 65 72 ff 01 00 01
00 00 0a 00 14 00 12 00 1d 00 17 00 18 00 19 01 00 01 01 01 02
01 03 01 04 00 23 00 00 00 33 00 26 00 24 00 1d 00 20 99 38 1d
e5 60 e4 bd 43 d2 3d 8e 43 5a 7d ba fe b3 c0 6e 51 c1 3c ae 4d
54 13 69 1e 52 9a af 2c 00 2b 00 03 02 03 04 00 0d 00 20 00 1e
04 03 05 03 06 03 02 03 08 04 08 05 08 06 04 01 05 01 06 01 02
01 04 02 05 02 06 02 02 02 00 2d 00 02 01 01 00 1c 00 02 40 01`.split(/\s/).filter(e => e.length).map(e => Number(`0x${e}`));

      const rcd = TLSPlaintext.parse(new Uint8Array(clienthello))
      assertEquals(rcd.length, 196)
   }
)


