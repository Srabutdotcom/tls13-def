import { assertEquals, equal } from "@std/assert";
import { MessageHash } from "../src/msghash.js";
import { KeyUpdate } from "../src/update.js";
import { NewSessionTicket } from "../src/ticket.js";
import { CertificateRequest, EncryptedExtensions } from "../src/params.js";
import { Handshake } from "../src/handshake.js";
import { Uint32 } from "../src/base.js";
import { Uint8 } from "../src/base.js";
import { toUint8Array } from "./utils.js";

Deno.test(
   "MessageHash",
   async () => {
      const msghash256 = await MessageHash.SHA256("test256");
      const msghash384 = await MessageHash.SHA384("test384");
      const msghash512 = await MessageHash.SHA512("test512");

      assertEquals(msghash256.messageHash.length, 32)
      assertEquals(msghash384.messageHash.length, 48)
      assertEquals(msghash512.messageHash.length, 64)
   }
)

Deno.test(
   "KeyUpdate",
   () => {
      const updateRequested = KeyUpdate.update_requested;
      assertEquals(Array.from(updateRequested), [1])
      assertEquals('update_requested', updateRequested.toString())
   }
)

Deno.test(
   "NewSessionTicket",
   () => {
      const tiket = NewSessionTicket.a(new Uint32(7200),new Uint32(0),new Uint8(0),new Uint8Array([1, 5, 6]));
      assertEquals(Array.from(tiket), [0,0,28,32,0,0,0,0,0,1,5,6,0,0])

      const newSessionTicket = toUint8Array(`04 00 00 c9 00 00 00 1e fa d6 aa
         c5 02 00 00 00 b2 2c 03 5d 82 93 59 ee 5f f7 af 4e c9 00 00 00
         00 26 2a 64 94 dc 48 6d 2c 8a 34 cb 33 fa 90 bf 1b 00 70 ad 3c
         49 88 83 c9 36 7c 09 a2 be 78 5a bc 55 cd 22 60 97 a3 a9 82 11
         72 83 f8 2a 03 a1 43 ef d3 ff 5d d3 6d 64 e8 61 be 7f d6 1d 28
         27 db 27 9c ce 14 50 77 d4 54 a3 66 4d 4e 6d a4 d2 9e e0 37 25
         a6 a4 da fc d0 fc 67 d2 ae a7 05 29 51 3e 3d a2 67 7f a5 90 6c
         5b 3f 7d 8f 92 f2 28 bd a4 0d da 72 14 70 f9 fb f2 97 b5 ae a6
         17 64 6f ac 5c 03 27 2e 97 07 27 c6 21 a7 91 41 ef 5f 7d e6 50
         5e 5b fb c3 88 e9 33 43 69 40 93 93 4a e4 d3 57 00 08 00 2a 00
         04 00 00 04 00`);
      const parse = Handshake.parse(newSessionTicket);
      assertEquals(newSessionTicket.length, parse.length)
   }
)

Deno.test(
   "Params",
   () => {
      //EncryptedExtensions
      const ex = new EncryptedExtensions;
      assertEquals(Array.from(ex), [0, 0])
      //CertificateRequest
      const cr = new CertificateRequest;
      assertEquals(Array.from(cr), [0, 0, 24, 0, 13, 0, 20, 0, 18, 4, 3, 5, 3, 6, 3, 8, 4, 8, 5, 8, 6, 8, 9, 8, 10, 8, 11])
   }
)










