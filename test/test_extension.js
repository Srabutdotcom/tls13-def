import { assertEquals } from "@std/assert";
import { SupportedVersions } from "../src/extension/supportedversion.js";
import { SignatureSchemeList } from "../src/extension/signaturescheme.js";
import { ServerName, ServerNameList } from "../src/extension/servername.js";
import { PskKeyExchangeModes } from "../src/extension/pskeyexchange.js";
import { NamedGroupList } from "../src/extension/namedgroup.js";
import { ClientShares, ServerShare } from "../src/extension/keyshare.js";
import { KeyShareClientHello, KeyShareServerHello } from "../src/extension/keyshare.js";
import { Extension } from "../src/mod.js";
import { Extensions } from "../src/extension/extension.js";


Deno.test(
   "SupportedVersions",
   () => {
      //SupportedVersions
      const svClient = SupportedVersions.client();
      const svServer = SupportedVersions.server();

      assertEquals([4, 3, 3, 3, 4], Array.from(svClient));
      assertEquals([3, 4], Array.from(svServer));
   }
)

Deno.test(
   "signatureSchemeList",
   () => {
      //signatureSchemeList
      const signAlgorithm = SignatureSchemeList.list();
      assertEquals([0, 18, 4, 3, 5, 3, 6, 3, 8, 4, 8, 5, 8, 6, 8, 9, 8, 10, 8, 11], Array.from(signAlgorithm));
   }
)

Deno.test(
   "ServerName",
   () => {
      //ServerName
      const sni = new ServerName('localhost');
      assertEquals(Array.from(sni), [0, 0, 9, 108, 111, 99, 97, 108, 104, 111, 115, 116])
      const snilist = ServerNameList.list("example.ulfheim.net");
      assertEquals(Array.from(snilist), [0, 22, 0, 0, 19, 101, 120, 97, 109, 112, 108, 101, 46, 117, 108, 102, 104, 101, 105, 109, 46, 110, 101, 116])
   }
)

Deno.test(
   "PskKeyExchangeModes",
   () => {
      //PskKeyExchangeModes
      const psk_dhe_ke = PskKeyExchangeModes.psk_dhe_ke()
      assertEquals(Array.from(psk_dhe_ke), [1, 1])
   }
)

Deno.test(
   "NamedGroupList",
   () => {
      //NamedGroupList
      const ngL = NamedGroupList.list();
      assertEquals(Array.from(ngL), [0, 8, 0, 23, 0, 24, 0, 25, 0, 29])
   }
)

Deno.test(
   "keyshare",
   async () => {
      //keyshare
      const cs = await ClientShares.keyShareClientHello()
      const ss = await ServerShare.x25519();

      assertEquals(cs instanceof KeyShareClientHello, true);
      assertEquals(cs.length, 38);
      assertEquals(ss instanceof KeyShareServerHello, true);
      assertEquals(ss.length, 36);
   }
)

Deno.test(
   "extension",
   async () => {
      const sni = Extension.extensions.server_name.serverNames("example.ulfheim.net");
      const clientShares = await Extension.extensions.key_share.client()
      const serverShare = await Extension.extensions.key_share.server.x25519()

      assertEquals(sni instanceof Extension, true)
      assertEquals(clientShares instanceof Extension, true)
      assertEquals(serverShare instanceof Extension, true)
      const extensions = new Extensions(0, 2 ** 16 - 2);

      assertEquals(Array.from(extensions), [0, 0])
   }
)
