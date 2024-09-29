// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/clienthello.d.ts"
import { Extension, Extensions } from "./extension/extension.js";
import { ProtocolVersion, Random } from "./keyexchange.js"
import { Minmax, Struct, Uint8 } from "./base.js";
import { ClientShares } from "./extension/keyshare.js";
import { CipherSuites } from "./keyexchange.js";
import { Handshake } from "./handshake.js";
import { Byte } from "./deps.js"


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
   #sid
   /**
    * @param {Uint8Array} sid 
    * @return {SessionId} sessionId - 33 bytes length */
   static a(sid) { return new SessionId(sid) }
   /**
    * @param {Uint8Array} sid
    * @return {SessionId} sessionId - 33 bytes length */
   constructor(sid) {
      super(
         0,
         32,
         sid ??
         new Uint8Array(Array.from(
            crypto.randomUUID().replaceAll('-', ''),
            e => e.charCodeAt(0)))
      )
      this.#sid = sid
   }
   get sid() { return this.#sid }
}
/**
 * opaque legacy_compression_methods<1..2^8-1>;
 */
class LegacyCompressionMethods extends Minmax {
   static a() { return new LegacyCompressionMethods }
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
   static a(...serverNames) {
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
    * @param {...string} serverNames - i.e. 'smtp.gmail.com'
    */
   constructor(...serverNames) {
      //const compression = new Uint8Array([1, 0]);
      const exts = [
         Extension.server_name.serverNames(...serverNames),
         Extension.supported_groups,
         Extension.signature_algorithms,
         Extension.supported_versions.client,
         Extension.psk_key_exchange_modes,
         Extension.a(clientShares, Extension.types.key_share)
      ]

      super(
         ProtocolVersion.version.legacy, //Uint16
         Random.a(), //32 bytes
         SessionId.a(),
         CipherSuites.a(),
         LegacyCompressionMethods.a(),
         Extensions.clientHello(...exts)
      )
      this.clientShares = clientShares
      this.sessionId = this.member[2];
      this.cipherSuites = this.member[3];
   }
   /**
    * Wrapper of message to Handshake
    * @returns {Handshake} message
    */
   wrap() {
      return Handshake.client_hello(this)
   }
   static sequence = [
      {
         name: "version",
         /**
          * @param {Uint8Array} message - description 
          * @param {number} pos - description
          **/
         value(message) {
            const value = Byte.get.BE.b16(message);
            return ProtocolVersion.a(value)
         }
      },
      {
         name: "random",
         /**
          * @param {Uint8Array} message - description 
          * @param {number} pos - description
          **/
         value(message) {
            const value = message.subarray(2, 34);
            return Random.a(value)
         }
      },
      {
         name: "sessionId",
         /**
          * @param {Uint8Array} message - description 
          * @param {number} pos - description
          **/
         value(message) {
            const length = Byte.get.BE.b8(message, 34);
            if (length > 0) {
               const value = message.subarray(35, 67)//34+33
               return SessionId.a(value)
            }
            return new Uint8(0)
         }
      },
      {
         name: "ciphers",
         /**
          * @param {Uint8Array} message - description 
          * @param {number} pos - description
          **/
         value(message, pos) {
            const length = Byte.get.BE.b16(message, pos);
            pos += 2
            const value = message.subarray(pos, pos + length);
            return CipherSuites.a(value)
         }
      },
      {
         name: "compressions",
         /**
          * @param {Uint8Array} message - description 
          * @param {number} pos - description
          **/
         value(message, pos) {
            const value = message.subarray(pos, pos + 2)
            return value
         }
      },
      {
         name: "extensions",
         /**
          * @param {Uint8Array} message - description 
          * @param {number} pos - description
          **/
         value(message, pos) {
            const length = Byte.get.BE.b16(message, pos);
            pos += 2
            const value = message.subarray(pos, pos + length);
            return Extension.parse(value, "ClientHello")
         }
      }
   ]
   /**
    * parse a message of ClientHello
    * @param {Uint8Array} message - message aka ClientHello 
    * @return {ClientHello} ClientHello data structure
    */
   static parse(message) {
      const data = { message }
      let offset = 0;
      for (const { name, value } of ClientHello.sequence) {
         data[name] = value(message, offset);
         offset += data[name].length
      }
      return data
   }
}



// npx -p typescript tsc ./src/clienthello.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist

/* const ch = ClientHello.new("localhost")
const hs = ch.wrap();

debugger */