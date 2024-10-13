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
      /**
       *
       * @param {TLSPlaintext} record
       * @returns {Promise<ServerHello>}
       */
      static tlsPlaintext(record: TLSPlaintext): Promise<ServerHello>;
      /**
       * Promise to create ServerHello based on ClientHello message
       * @param {ClientHello} message
       */
      static clientHello(message: ClientHello): Promise<ServerHello>;
      /**
       *
       * @param {Uint8Array} sessionId - opaque legacy_session_id_echo<0..32>;
       * @param {CipherSuite} cipher
       * @param {Extension} serverShareExtension
       * @param {Key} key - Key object container
       */
      static a(sessionId: Uint8Array, cipher: CipherSuite, serverShareExtension: Extension, key: any): ServerHello;
      static sequence: {
          name: string;
          /**
           * @param {Uint8Array} message - description
           * @param {number} pos - description
           **/
          value(message: Uint8Array, pos: number): any;
      }[];
      static parse(message: any): ServerHello;
      /**
       *
       * @param {[ProtocolVersion, Random, SessionId, CipherSuite, LegacyCompressionMethod, Extensions]} option
       */
      constructor(option_0: ProtocolVersion, option_1: Random, option_2: SessionId, option_3: CipherSuite, option_4: LegacyCompressionMethod, option_5: Extensions);
      payload: () => Handshake;
      handshake: () => Handshake;
      /**
       *
       * @return {Handshake} message
       */
      wrap(): Handshake;
      /**@type {Key} v - Key Object */
      set key(v: Key);
      get key(): Key;
      set supportedVersion(v: ProtocolVersion);
      get supportedVersion(): ProtocolVersion;
      set serverShare(v: KeyShareEntry);
      get serverShare(): KeyShareEntry;
      /**@return {ProtocolVersion}  - Uint16 */
      get version(): ProtocolVersion;
      /**@return {Random} 32 byte random */
      get random(): Random;
      /**@return {SessionId} sessionId -  */
      get sessionId(): SessionId;
      /**@return {CipherSuite} cipherSuites -  */
      get cipher(): CipherSuite;
      /**@return {LegacyCompressionMethod} compression method default to 0 */
      get compression(): LegacyCompressionMethod;
      /**@return {Extensions} extentions */
      get extensions(): Extensions;
      #private;
  }
  import { Struct, Uint8 } from "../src/base.js";
  import { Handshake } from "../src/handshake.js";
  import { CipherSuite } from "../src/keyexchange.js";
  import { Extension } from "../src/extension/extension.js";
  import { Key, KeyShareEntry } from "../src/extension/keyshare.js";
  import { ProtocolVersion } from "../src/keyexchange.js";
  import { Random } from "../src/keyexchange.js";

  declare class LegacyCompressionMethod extends Uint8 {
      static a(): LegacyCompressionMethod;
      constructor();
  }
  import { Extensions } from "../src/extension/extension.js";
  import { TLSPlaintext } from "../src/record.js";
  import { ClientHello, SessionId } from "../src/clienthello.js";
  
  export {};
  

