// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/clienthello.d.ts"
import { Extension, Extensions } from "./extension/extension.js";
import { ProtocolVersion, Random } from "./keyexchange.js"
import { Minmax, Struct, Uint8 } from "./base.js";
import { ClientShares } from "./extension/keyshare.js";
import { CipherSuites } from "./keyexchange.js";
import { Handshake } from "./handshake.js";

var clientShares = await ClientShares.keyShareClientHello();

/**
 * SessionId
 * ```
 * opaque legacy_session_id<0..32>;
 * ```
 * ```js
 * import { assertEquals } from "jsr:@std/assert/equals";
 * import { SessionId } from "./clienthello.js"
 * const seId = SessionId.new();
 * assertEquals(seId.length, 33)
 * ```
 */
export class SessionId extends Minmax {
   /**@return {SessionId} sessionId - 33 bytes length */
   static new() { return new SessionId }
   /**@return {SessionId} sessionId - 33 bytes length */
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
 * ClientHello message
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

   ```js
   const clientHello = ClientHello.new('serverName1','serverName2')
   ```

   When a client first connects to a server, it is REQUIRED to send the
   ClientHello as its first TLS message.  The client will also send a
   ClientHello when the server has responded to its ClientHello with a
   HelloRetryRequest. 

   https://datatracker.ietf.org/doc/html/rfc8446#section-4.1.2

 */
export class ClientHello extends Struct {
   /**@type {ClientShares} clientShares -  */
   clientShares
   /**@type {SessionId} sessionId -  */
   sessionId
   /**@type {CipherSuites} cipherSuites -  */
   cipherSuites
   /**
    * create ClientHello
    * ```js
    * const clientHello = ClientHello.new('serverName1','serverName2')
    * ```
    * @param  {...string} serverNames 
    * @returns {ClientHello}
    */
   static new(...serverNames) {
      return new ClientHello(...serverNames)
   }
   /**
    * Wrapper of message to Handshake
    * @returns {Handshake} message
    */
   payload = this.wrap
   /**
    * Wrapper of message to Handshake
    * @returns {Handshake} message
    */
   handshake = this.wrap

   /**
    * create ClientHello
    * ```js
    * const clientHello = ClientHello.new('serverName1','serverName2')
    * ```
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
   /**
    * Wrapper of message to Handshake
    * @returns {Handshake} message
    */
   wrap(){
      return Handshake.client_hello(this)
   }
}

// npx -p typescript tsc ./src/clienthello.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist

/* const ch = ClientHello.new("localhost")
const hs = ch.wrap();

debugger */