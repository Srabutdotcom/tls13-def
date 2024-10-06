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
    /**
     * @param {Uint8Array} sid
     * @return {SessionId} sessionId - 33 bytes length */
    static a(sid: Uint8Array): SessionId;
    /**
     * @param {Uint8Array} sid
     * @return {SessionId} sessionId - 33 bytes length */
    constructor(sid: Uint8Array);
    get sid(): Uint8Array;
    #private;
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
   const clientHello = ClientHello.default('serverName1','serverName2')
   ```

   When a client first connects to a server, it is REQUIRED to send the
   ClientHello as its first TLS message.  The client will also send a
   ClientHello when the server has responded to its ClientHello with a
   HelloRetryRequest.

   https://datatracker.ietf.org/doc/html/rfc8446#section-4.1.2

 */
export class ClientHello extends Struct {
    /**
     * create ClientHello
     * @param {...Uint8Array} option - description
     */
    static a(...option: Uint8Array[]): ClientHello;
    /**
     * ClientHello
     * @param  {...string} serverNames
     */
    static default(...serverNames: string[]): ClientHello;
    static sequence: {
        name: string;
        /**
         * @param {Uint8Array} message - description
         * @param {number} pos - description
         **/
        value(message: Uint8Array, pos: number): any;
    }[];
    /**
     * parse a message of ClientHello
     * @param {Uint8Array} message - message aka ClientHello
     * @return {ClientHello} ClientHello data structure
     */
    static parse(message: Uint8Array): ClientHello;
    /**
     * create ClientHello
     * @typedef {[
     * ProtocolVersion,
     * Random,
     * SessionId,
     * CipherSuites,
     * LegacyCompressionMethods,
     * Extensions
     * ]} Options
     * @param {...Uint8Array} option - description
     */
    constructor(...option:Uint8Array[]);
    /**
     * Wrapper of message to Handshake
     * @returns {Handshake} message
     */
    payload: () => Handshake;
    /**
     * Wrapper of message to Handshake
     * @returns {Handshake} message
     */
    handshake: () => Handshake;
    /**@return {ProtocolVersion}  - Uint16 */
    get version(): ProtocolVersion;
    /**@return {Random} 32 byte random */
    get random(): Random;
    /**@return {SessionId} sessionId -  */
    get sessionId(): SessionId;
    /**@return {CipherSuites} cipherSuites -  */
    get ciphers(): CipherSuites;
    /**@return {LegacyCompressionMethods} compression method default to 0 */
    get compression(): LegacyCompressionMethods;
    /**@return {Extensions} extentions */
    get extensions(): Extensions;
    /**@return {Array<KeyShareEntry>} clientShares -  */
    get clientShares(): KeyShareEntry[];
    /**@return {Array<string>} hostnames */
    get serverNames(): string[];
    /**@return {Uint8Array} description */
    get renegotiationInfo(): Uint8Array;
    /**@return {Array<NamedGroup>} description */
    get supportedGroups(): NamedGroup[];
    /**@return {Uint8Array} description */
    get sessionTicket(): Uint8Array;
    /**@return {Array<ProtocolVersion>} description */
    get supportedVersions(): ProtocolVersion[];
    /**@return {Array<SignatureScheme>} description */
    get signatureAlgorithms(): SignatureScheme[];
    /**@return {Array<PskKeyExchangeMode>} description */
    get pskKeyExchangeModes(): PskKeyExchangeMode[];
    /**
     * Wrapper of message to Handshake
     * @returns {Handshake} message
     */
    wrap(): Handshake;
    #private;
}
import { Minmax } from "../src/base.js";
import { Struct } from "../src/base.js";
import { Handshake } from "../src/handshake.js";
import { ProtocolVersion } from "../src/keyexchange.js";
import { Random } from "../src/keyexchange.js";
import { CipherSuites } from "../src/keyexchange.js";

/**
 * opaque legacy_compression_methods<1..2^8-1>;
 */
declare class LegacyCompressionMethods extends Minmax {
    static a(): LegacyCompressionMethods;
    constructor();
}
import { Extensions } from "../src/extension/extension.js";
import { NamedGroup } from "../src/extension/namedgroup.js";
import { KeyShareEntry } from "../src/extension/keyshare.js";
import { SignatureScheme } from "../src/extension/signaturescheme.js";
import { PskKeyExchangeMode } from "../src/extension/pskeyexchange.js";
export {};
