import { assertEquals, equal } from "jsr:@std/assert";
import { TLSPlaintext } from "../src/record.js";
import { Alert } from "../src/alert.js";
import { ClientHello } from "../src/clienthello.js";
import { ServerHello } from "../src/serverhello.js";


Deno.test(
   "Record - TLSPlaintext",
   () => {
      const alert = TLSPlaintext.alert(Alert.bad_record_mac)
      assertEquals(Array.from(alert), [21, 3, 3, 0, 2, 2, 20])

      const app = TLSPlaintext.application_data(new Uint8Array([1, 5, 8]))
      assertEquals(Array.from(app), [23, 3, 1, 0, 3, 1, 5, 8])

      const CCipSpec = TLSPlaintext.change_cipher_spec()
      assertEquals(Array.from(CCipSpec), [20, 3, 1, 0, 1, 1])

      const hndsk = TLSPlaintext.handshake(ClientHello.default('smtp'))
      assertEquals(hndsk.member[3].constructor.name, "Handshake")

      const hebet = TLSPlaintext.heartbeat(new Uint8Array([1, 5, 8]))
      assertEquals(Array.from(hebet), [24, 3, 1, 0, 3, 1, 5, 8])

      const inval = TLSPlaintext.invalid(new Uint8Array([1, 5, 8]))
      assertEquals(Array.from(inval), [0, 3, 1, 0, 3, 1, 5, 8])

   }
)

Deno.test(
   //https://datatracker.ietf.org/doc/rfc8448/
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

      //type
      assertEquals(Array.from(rcd.type), [22])
      //version
      assertEquals(Array.from(rcd.version), [3, 1])
      //length
      assertEquals(Array.from(rcd.recordLength), [0, 194])
      //fragment.type
      assertEquals(Array.from(rcd.fragment.type), [1])
      //fragment.handshakeLength
      assertEquals(Array.from(rcd.fragment.handshakeLength), [0, 0, 190])
      //message
      assertEquals(rcd.message instanceof ClientHello, true)
      const { version, random, sessionId, ciphers, compression, extensions } = rcd.message
      const { clientShares, serverNames, renegotiationInfo, supportedGroups, sessionTicket,
         supportedVersions, signatureAlgorithms, pskKeyExchangeModes } = rcd.message
      //version
      assertEquals(Array.from(version), [3, 3])
      //random
      assertEquals(random.length, 32);
      //sessionId
      assertEquals(sessionId.length, 1);
      //ciphers
      assertEquals(Array.from(ciphers), [0, 6, 19, 1, 19, 3, 19, 2])
      //compression
      assertEquals(Array.from(compression), [1, 0])

      //clientShares
      assertEquals(clientShares[0].group.name, 'x25519')
      assertEquals(clientShares[0].key_exchange.length, 32)

      //serverNames
      assertEquals(serverNames[0], 'server')

      //renegotiationInfo
      assertEquals(renegotiationInfo.length, 1)

      //supportedGroups
      assertEquals(supportedGroups.length, 9);

      //sessionTicket
      assertEquals(sessionTicket.length, 0)

      //supportedVersions
      assertEquals(Array.from(supportedVersions[0]), [3, 4])

      //signatureAlgorithms
      assertEquals(signatureAlgorithms.length, 15)

      //pskKeyExchangeModes
      assertEquals(pskKeyExchangeModes.length, 1)
   }
)

Deno.test(
   "serverHello",
   () => {
      const serverHello = `16 03 03 00 5a 02 00 00 56 03 03 a6
         af 06 a4 12 18 60 dc 5e 6e 60 24 9c d3 4c 95 93 0c 8a c5 cb 14
         34 da c1 55 77 2e d3 e2 69 28 00 13 01 00 00 2e 00 33 00 24 00
         1d 00 20 c9 82 88 76 11 20 95 fe 66 76 2b db f7 c6 72 e1 56 d6
         cc 25 3b 83 3d f1 dd 69 b1 b0 4e 75 1f 0f 00 2b 00 02 03 04`.split(/\s/).filter(e => e.length).map(e => Number(`0x${e}`));

      const rcd = TLSPlaintext.parse(new Uint8Array(serverHello));
      //type
      assertEquals(Array.from(rcd.type), [22])
      //version
      assertEquals(Array.from(rcd.version), [3, 3])
      //length
      assertEquals(Array.from(rcd.recordLength), [0, 88])
      //fragment.type
      assertEquals(Array.from(rcd.fragment.type), [2])
      //fragment.handshakeLength
      assertEquals(Array.from(rcd.fragment.handshakeLength), [0, 0, 84])
      //message
      assertEquals(rcd.message instanceof ServerHello, true)

      const { version, random, sessionId, cipher, compression, extensions } = rcd.message
      const { serverShare, supportedVersion } = rcd.message

      //version
      assertEquals(Array.from(version), [3, 3])
      //random
      assertEquals(random.length, 32);
      //sessionId
      assertEquals(sessionId.length, 1);
      //ciphers
      assertEquals(Array.from(cipher), [19, 1])
      //compression
      assertEquals(Array.from(compression), [0])

      //serverShare
      assertEquals(serverShare.group.name, 'x25519')
      assertEquals(serverShare.key_exchange.length, 32)

      //supportedVersion
      assertEquals(Array.from(supportedVersion), [3, 4])
   }
)

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
debugger;







