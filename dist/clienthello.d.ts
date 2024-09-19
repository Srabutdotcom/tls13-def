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

   When a client first connects to a server, it is REQUIRED to send the
   ClientHello as its first TLS message.  The client will also send a
   ClientHello when the server has responded to its ClientHello with a
   HelloRetryRequest.

   https://datatracker.ietf.org/doc/html/rfc8446#section-4.1.2

 */
export class ClientHello extends Struct {
    /**
     *
     * @param  {...string} serverNames
     * @returns Promise for ClientHello
     */
    static "new"(...serverNames: string[]): ClientHello;
    /**
     *
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
     * @returns Hanshake message
     */
    payload: () => Handshake;
    /**
     * Wrapper of message to Handshake
     * @returns Hanshake message
     */
    handshake: () => Handshake;
    /**
     * Wrapper of message to Handshake
     * @returns Hanshake message
     */
    wrap(): Handshake;
}
import { Struct } from "./base.js";
import { ClientShares } from "./extension/keyshare.js";
/**
 * SessionId
 * ```
 * opaque legacy_session_id<0..32>;
 * ```
 */
declare class SessionId extends Minmax {
    static "new"(): SessionId;
    constructor();
}
import { CipherSuites } from "./keyexchange.js";
import { Handshake } from "./handshake.js";
import { Minmax } from "./base.js";
export {};
