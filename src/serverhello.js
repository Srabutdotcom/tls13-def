// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/serverhello.d.ts"
import { Uint8 } from "./base.js";
import { Struct } from "./base.js";
import { ClientHello } from "./clienthello.js";
import { Extension, Extensions } from "./extension/extension.js";
import { Handshake } from "./handshake.js";
import { ProtocolVersion, Random } from "./keyexchange.js";
import { CipherSuite } from "./keyexchange.js";
import { TLSPlaintext } from "./record.js";
import { Key } from "./extension/keyshare.js";
import { KeyShareServerHello } from "./extension/keyshare.js";

/**
 * ServerHello data structure
 * 
 * ```
 * struct {
      ProtocolVersion legacy_version = 0x0303;    // TLS v1.2 
      Random random;
      opaque legacy_session_id_echo<0..32>;
      CipherSuite cipher_suite;
      uint8 legacy_compression_method = 0;
      Extension extensions<6..2^16-1>;
   } ServerHello;
   ```
   The server will send this message in response to a ClientHello
   message to proceed with the handshake if it is able to negotiate an
   acceptable set of handshake parameters based on the ClientHello.

   legacy_session_id_echo:  The contents of the client's
      legacy_session_id field.  Note that this field is echoed even if
      the client's value corresponded to a cached pre-TLS 1.3 session
      which the server has chosen not to resume.  A client which
      receives a legacy_session_id_echo field that does not match what
      it sent in the ClientHello MUST abort the handshake with an
      "illegal_parameter" alert.

   https://datatracker.ietf.org/doc/html/rfc8446#section-4.1.3
   @extends {Struct}
 */
export class ServerHello extends Struct {
   #cipherSuite = CipherSuite
   /**@type {Key} #key - Key object container */
   #key
   /**
    * 
    * @param {TLSPlaintext} record 
    * @returns {Promise<ServerHello>}
    */
   static async tlsPlaintext(record){
      const { fragment: {message} } = TLSPlaintext.parse(record);
      if(message instanceof ClientHello) return await ServerHello.clientHello(message)
      throw TypeError(`Unexpected typeof message`)
   }
   /**
    * Promise to create ServerHello based on ClientHello message
    * @param {ClientHello} message 
    */
   static async clientHello(message){
      const { sessionId, clientShares, ciphers   } = message;
      const selectedCipher = ciphers.match([ CipherSuite.TLS_AES_256_GCM_SHA384, CipherSuite.TLS_AES_128_GCM_SHA256])
      const key = await Key.match(clientShares)
      const serverShareExtension = Extension.a(
         KeyShareServerHello.a(
            await key.keyShareEntry()
         ),
         Extension.types.key_share
      )
      return ServerHello.a(sessionId, selectedCipher, serverShareExtension, key) 
   }
   /**
    * 
    * @param {Uint8Array} sessionId - opaque legacy_session_id_echo<0..32>;
    * @param {CipherSuite} cipher 
    * @param {Extension} serverShareExtension 
    * @param {Key} key - Key object container
    */
   static a(sessionId, cipher, serverShareExtension, key){
      const serverHello = new ServerHello(sessionId, cipher, serverShareExtension)
      serverHello.key = key 
      return serverHello
   }
   payload = this.wrap
   handshake = this.wrap
   /**
    * 
    * @param {Uint8Array} sessionId - opaque legacy_session_id_echo<0..32>;
    * @param {CipherSuite} cipher - selected cipher
    * @param {Extension} serverShareExtension 
    */
   constructor(sessionId, cipher, serverShareExtension){
      const extensions = Extensions.serverHello(
         Extension.supported_versions.server,
         serverShareExtension
      )
      super(
         ProtocolVersion.version.legacy,
         Random.a(),
         sessionId,
         cipher,
         LegacyCompressionMethod.a(),
         extensions
      )
      this.#key = key
   }
   /**
    * 
    * @return {Handshake} message
    */
   wrap(){
      return Handshake.server_hello(this)
   }
   /**@type {Key} v - Key Object */
   set key(v){this.#key = v}
   get key(){return this.#key}
   /**@return {ProtocolVersion}  - Uint16 */
   get version() { return this.member[0] }
   /**@return {Random} 32 byte random */
   get random() { return this.member[1] }
   /**@return {SessionId} sessionId -  */
   get sessionId() { return this.member[2] }
   /**@return {CipherSuite} cipherSuites -  */
   get cipher() { return this.member[3] }
   /**@return {LegacyCompressionMethod} compression method default to 0 */
   get compression() { return this.member[4] }
   /**@return {Extensions} extentions */
   get extensions() { return this.member[5] }
}

class LegacyCompressionMethod extends Uint8 {
   static a(){ return new LegacyCompressionMethod}
   constructor(){super(0)}
}

// npx -p typescript tsc ./src/serverhello.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist
