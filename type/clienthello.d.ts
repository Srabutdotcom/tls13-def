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
    static "new"(): SessionId;
    /**@return {SessionId} sessionId - 33 bytes length */
    constructor();
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
    /**
     * create ClientHello
     * ```js
     * const clientHello = ClientHello.new('serverName1','serverName2')
     * ```
     * @param  {...string} serverNames
     * @returns {ClientHello}
     */
    static "new"(...serverNames: string[]): ClientHello;
    /**
     * create ClientHello
     * ```js
     * const clientHello = ClientHello.new('serverName1','serverName2')
     * ```
     * @param {...string} serverNames - Server Name Indication i.e. "localhost"
     */
    constructor(...serverNames: string[]);
    /**@type {ClientShares} clientShares -  */
    clientShares: ClientShares;
    /**@type {SessionId} sessionId -  */
    sessionId: SessionId;
    /**@type {CipherSuites} cipherSuites -  */
    cipherSuites: CipherSuites;
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
    /**
     * Wrapper of message to Handshake
     * @returns {Handshake} message
     */
    wrap(): Handshake;
}
import { Minmax } from "../src/base.js";
import { Struct } from "../src/base.js";
import { ClientShares } from "../src/extension/keyshare.js";
import { CipherSuites } from "../src/keyexchange.js";
import { Handshake } from "../src/handshake.js";
