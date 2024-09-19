/**
 *
 * @param {KeyShareEntry} server_share
 * @returns KeyShareServerHello
 */
export function keyShareServerHello(server_share: KeyShareEntry): KeyShareServerHello;
/**
 * LINK https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.8
 *
 * struct {
 *
         NamedGroup group;
         opaque key_exchange<1..2^16-1>;
      } KeyShareEntry;
 */
export class KeyShareEntry extends Struct {
    /**
     *
     * @param {NamedGroup} group - NamedGroup
     * @param {Uint8Array[]} key_exchange - PublicKey
     */
    constructor(group: NamedGroup, ...key_exchange: Uint8Array[]);
    #private;
}
/**
 * struct {
      KeyShareEntry server_share;
   } KeyShareServerHello;

   server_share:  A single KeyShareEntry value that is in the same group
      as one of the client's shares.
 */
export class KeyShareServerHello extends Struct {
    /**
     *
     * @param {KeyShareEntry} server_share
     */
    constructor(server_share: KeyShareEntry);
}
/**
 * @prop {Keys} keys
 */
export class ClientShares {
    static keys: any;
    static keyShareClientHello(): Promise<any>;
}
/**
 * Collection of Key that contain (X25519, ECDH256, ECDH384 and ECDH521 using noble)
 *
 * produce KeyShareClientHello
 */
export class Keys {
    /**
     *
     * @param {Array<Key>} keys
     */
    constructor(...keys: Array<Key>);
    get ecdh256(): Key;
    get ecdh384(): Key;
    get ecdh521(): Key;
    get x25519(): Key;
    /**
     *
     * @returns KeyShareClientHello
     * Clients MUST NOT offer multiple KeyShareEntry values
    for the same group.  Clients MUST NOT offer any KeyShareEntry values
    for groups not listed in the client's "supported_groups" extension.
    Servers MAY check for violations of these rules and abort the
    handshake with an "illegal_parameter" alert if one is violated.
     */
    keyShareClientHello(): Promise<KeyShareClientHello>;
    #private;
}
/**
 * CryptoKeyPair or P521 key wrapper with feature to produce KeyShareEntry, privateKeyJwk, and sharedKey
 * @param {CryptoKeyPair} v - CryptoKeyPair
 */
export class Key {
    /**
     *
     * @param {CryptoKeyPair} v
     */
    constructor(v: CryptoKeyPair);
    keyShareEntry(): Promise<false | KeyShareEntry>;
    /**
     *
     * @returns {Promise<JsonWebKey>} privateKey
     */
    privateKeyJwk(): Promise<JsonWebKey>;
    /**
     *
     * @param {CryptoKey} v - publicKey in CryptoKey object
     * @param {number} l - positive integer divisible by 8
     * @return {Uint8Array} sharedkey
     */
    sharedKey(v: CryptoKey, l: number): Uint8Array;
    get algorithm(): any;
    #private;
}
export class ServerShare {
    static key: any;
    static x25519(): Promise<KeyShareServerHello>;
    static p521(): Promise<KeyShareServerHello>;
    static p384(): Promise<KeyShareServerHello>;
    static p256(): Promise<KeyShareServerHello>;
    static keyShareServerHello(): Promise<KeyShareServerHello>;
}
/**
 * key_shares extension for client hello
 *
 * struct {
 *
         KeyShareEntry client_shares<0..2^16-1>;
      } KeyShareClientHello;

   client_shares:  A list of offered KeyShareEntry values in descending
      order of client preference.

      Each KeyShareEntry value MUST correspond to a
   group offered in the "supported_groups" extension and MUST appear in
   the same order.

 *
 */
export class KeyShareClientHello extends Struct {
    /**
     *
     * @param {...KeyShareEntry} clientShares -A list of offered KeyShareEntry values in descending order of client preference.
     */
    constructor(...clientShares: KeyShareEntry[]);
}
/**
 * struct {
 *
         NamedGroup selected_group;
      } KeyShareHelloRetryRequest;
       
   selected_group:  The mutually supported group the server intends to
      negotiate and is requesting a retried ClientHello/KeyShare for.
 */
export class KeyShareHelloRetryRequest extends Struct {
    constructor(selected_group: any);
}
import { Struct } from "../../src/base.js";
import { NamedGroup } from "../../src/extension/namedgroup.js";
