// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/serverhello.d.ts"
import { Uint8 } from "./base.js";
import { Struct } from "./base.js";
import { Extension, Extensions } from "./extension/extension.js";
import { Handshake } from "./handshake.js";
import { ProtocolVersion, Random } from "./keyexchange.js";
import { CipherSuite } from "./keyexchange.js";

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

 */
export class ServerHello extends Struct {
   #cipherSuite = CipherSuite
   /**
    * 
    * @param {Uint8Array} sessionId - opaque legacy_session_id_echo<0..32>;
    * @param {CipherSuite} cipher 
    * @param {Extension} serverShareExtension 
    */
   static a(sessionId, cipher, serverShareExtension){
      return new ServerHello(sessionId, cipher, serverShareExtension)
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
         Extension.SupportedVersions.server,
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
   }
   /**
    * 
    * @return {Handshake} message
    */
   wrap(){
      return Handshake.server_hello(this)
   }
}

class LegacyCompressionMethod extends Uint8 {
   static a(){ return new LegacyCompressionMethod}
   constructor(){super(0)}
}
