import { assertEquals, equal } from "@std/assert";
import { MessageHash } from "../src/msghash.js";
import { KeyUpdate } from "../src/update.js";
import { NewSessionTicket } from "../src/ticket.js";
import { CertificateRequest, EncryptedExtensions } from "../src/params.js";

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
   }
)

Deno.test(
   "NewSessionTicket",
   () => {
      const tiket = NewSessionTicket.new(new Uint8Array([1, 5, 6]));
      assertEquals(Array.from(tiket), [0, 0, 28, 32, 0, 0, 0, 0, 1, 0, 0, 3, 1, 5, 6, 0, 0])
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







