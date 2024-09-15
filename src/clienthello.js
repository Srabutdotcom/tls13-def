import { Extension, Extensions } from "./extension/extension.js";
import { ProtocolVersion, Random } from "./keyexchange.js"
import { Minmax, Struct, Uint8 } from "./base.js";
import { ClientShares } from "./extension/keyshare.js";
import { CipherSuites } from "./keyexchange.js";

var clientShares = await ClientShares.keyShareClientHello();

/**
 * SessionId
 */
class SessionId extends Minmax {
   static new() { return new SessionId }
   constructor() {
      super(
         0,
         32,
         new Uint8Array(Array.from(
            crypto.randomUUID().replaceAll('-', ''),
            e => e.charCodeAt(0)))
      )
   }
}
/**
 * opaque legacy_compression_methods<1..2^8-1>;
 */
class LegacyCompressionMethods extends Minmax {
   static new(){return new LegacyCompressionMethods}
   constructor() {
      super(1, 2 ** 8 - 1, new Uint8(0))
   }
}

/**
 * 
 * ``` 
 * uint16 ProtocolVersion;
   opaque Random[32];

   uint8 CipherSuite[2];    // Cryptographic suite selector 
   
   struct {
      ProtocolVersion legacy_version = 0x0303;    // TLS v1.2 
      Random random;
      opaque legacy_session_id<0..32>;
      CipherSuite cipher_suites<2..2^16-2>;
      opaque legacy_compression_methods<1..2^8-1>;
      Extension extensions<8..2^16-1>;
   } ClientHello;
   ```

   When a client first connects to a server, it is REQUIRED to send the
   ClientHello as its first TLS message.  The client will also send a
   ClientHello when the server has responded to its ClientHello with a
   HelloRetryRequest. 

   https://datatracker.ietf.org/doc/html/rfc8446#section-4.1.2

 */
export class ClientHello extends Struct {
   clientShares
   /**
    * 
    * @param  {...string} serverNames 
    * @returns Promise for ClientHello
    */
   static new(...serverNames) {
      return new ClientHello(...serverNames)
   }

   /**
    *
    * @param {...string} serverNames - Server Name Indication i.e. "localhost"
    */
   constructor(...serverNames) {
      //const compression = new Uint8Array([1, 0]);
      const exts = [
         Extension.extensions.server_name.serverNames(...serverNames),
         Extension.extensions.supported_groups,
         Extension.extensions.signature_algorithms,
         Extension.extensions.supported_versions.client,
         Extension.extensions.psk_key_exchange_modes,
         Extension.new(clientShares, Extension.types.key_share)
      ]

      super(
         ProtocolVersion.version.legacy,
         Random.new(),
         SessionId.new(),
         CipherSuites.new(),
         LegacyCompressionMethods.new(),
         Extensions.new(
            8,
            2 ** 16 - 1,
            ...exts
         )
      )

      this.clientShares = clientShares
      this.sessionId = this.member[2];
      this.cipherSuites = this.member[3];

   }
}

const ch = ClientHello.new(..."localhost")

debugger