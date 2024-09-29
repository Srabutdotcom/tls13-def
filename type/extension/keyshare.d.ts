/**
 * KeyExchange
 * ```
 * opaque key_exchange<1..2^16-1>;
 * ```
 * @property {Uint8Array} type.key - return the key
 */
export class KeyExchange extends Minmax {
    /**
     * @param {Uint8Array} key - the KeyShare
     * @return {KeyExchange} description
     */
    static a(key: Uint8Array): KeyExchange;
    /**
     * @param {Uint8Array} key - the KeyShare
     */
    constructor(key: Uint8Array);
    /**
     * @return {Uint8Array} description
     */
    get key(): Uint8Array;
    #private;
}
import { Minmax } from "../../src/base.js";
/**
 *
 * ClientShares - contains keys and method to produce KeyShareClientHello
 */
export class ClientShares {
    /**@type {Keys} keys - description */
    static keys: Keys;
    /**
     * @return {Promise<KeyShareClientHello>} KeyShareClientHello
     */
    static keyShareClientHello(): Promise<KeyShareClientHello>;
}
/**
 * KeyShareEntry
 * ```
 * struct {
      NamedGroup group;
      opaque key_exchange<1..2^16-1>;
   } KeyShareEntry;
   ```
   LINK https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.8
 */
export class KeyShareEntry extends Struct {
    /**
     * @param {KeyExchange} key_exchange
     * @return
     */
    static secp256r1(key_exchange: KeyExchange): KeyShareEntry;
    /**
     * @param {KeyExchange} key_exchange
     * @return
     */
    static secp384r1(key_exchange: KeyExchange): KeyShareEntry;
    /**
     * @param {KeyExchange} key_exchange
     * @return
     */
    static secp521r1(key_exchange: KeyExchange): KeyShareEntry;
    /**
     * @param {KeyExchange} key_exchange
     * @return
     */
    static x25519(key_exchange: KeyExchange): KeyShareEntry;
    /**
     *
     * @param {NamedGroup} group - NamedGroup
     * @param {KeyExchange} key_exchange -  contain public key - opaque key_exchange<1..2^16-1>;
     */
    static a(group: NamedGroup, key_exchange: KeyExchange): KeyShareEntry;
    /**
     *
     * @param {NamedGroup} group - NamedGroup
     * @param {KeyExchange} key_exchange - contain public key - opaque key_exchange<1..2^16-1>;
     */
    constructor(group: NamedGroup, key_exchange: KeyExchange);
    /**@return {NamedGroup} description */
    get group(): NamedGroup;
    /**@return {KeyExchange} description */
    get key_exchange(): KeyExchange;
    #private;
}
/**
 * Collection of Key that contain (X25519, ECDH256, ECDH384 and ECDH521 using noble)
 *
 * produce KeyShareClientHello
 */
export class Keys {
    /**
     *
     * @param {...Key} keys
     */
    constructor(...keys: Key[]);
    get ecdh256(): Key;
    get ecdh384(): Key;
    get ecdh521(): Key;
    get x25519(): Key;
    /**
     *
     * @returns {KeyShareClientHello}
     * Clients MUST NOT offer multiple KeyShareEntry values
    for the same group.  Clients MUST NOT offer any KeyShareEntry values
    for groups not listed in the client's "supported_groups" extension.
    Servers MAY check for violations of these rules and abort the
    handshake with an "illegal_parameter" alert if one is violated.
     */
    keyShareClientHello(): KeyShareClientHello;
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
    /**
     * @return {{name:string, namedCurve:string}} {name, namedCurve} algorithm
     */
    get algorithm(): {
        name: string;
        namedCurve: string;
    };
    #private;
}
/**
 * ServerShare - contains keys and method to produce KeyShareClientHello
 */
export class ServerShare {
    /**@type {Key} key - description */
    static key: Key;
    static x25519(): Promise<KeyShareServerHello>;
    static p521(): Promise<KeyShareServerHello>;
    static p384(): Promise<KeyShareServerHello>;
    static p256(): Promise<KeyShareServerHello>;
    static keyShareServerHello(): Promise<KeyShareServerHello>;
}
/**
 * KeyShareClientHello
 *
 * ```
 * struct {
      KeyShareEntry client_shares<0..2^16-1>;
   } KeyShareClientHello;
   ```
   client_shares:  A list of offered KeyShareEntry values in descending
      order of client preference.

      Each KeyShareEntry value MUST correspond to a
   group offered in the "supported_groups" extension and MUST appear in
   the same order.
 *
 */
export class KeyShareClientHello extends Struct {
    /**
     * @param {...KeyShareEntry} keyShareEntry -A list of offered KeyShareEntry values in descending order of client preference.
     */
    static a(...keyShareEntry: KeyShareEntry[]): KeyShareClientHello;
    /**
     *
     * @param {Uint8Array} data
     */
    static parse(data: Uint8Array): KeyShareEntry[];
    /**
     *
     * @param {...KeyShareEntry} keyShareEntry -A list of offered KeyShareEntry values in descending order of client preference.
     */
    constructor(...keyShareEntry: KeyShareEntry[]);
}
/**
 * KeyShareServerHello
 * ```
 * struct {
      KeyShareEntry server_share;
   } KeyShareServerHello;
   ```
   server_share:  A single KeyShareEntry value that is in the same group
      as one of the client's shares.
 */
export class KeyShareServerHello extends Struct {
    /**
     *
     * @param {KeyShareEntry} server_share
     */
    static a(server_share: KeyShareEntry): KeyShareServerHello;
    /**
     *
     * @param {Uint8Array} data
     */
    static parse(data: Uint8Array): KeyShareServerHello;
    /**
     *
     * @param {KeyShareEntry} server_share
     */
    constructor(server_share: KeyShareEntry);
}
/**
 * KeyShareHelloRetryRequest
 * ```
 * struct {
      NamedGroup selected_group;
   } KeyShareHelloRetryRequest;
   ```
   selected_group:  The mutually supported group the server intends to
      negotiate and is requesting a retried ClientHello/KeyShare for.
 */
export class KeyShareHelloRetryRequest extends Struct {
    /**
     *
     * @param {NamedGroup} selected_group
     */
    static a(selected_group: NamedGroup): KeyShareHelloRetryRequest;
    static secp256r1: KeyShareHelloRetryRequest;
    static secp384r1: KeyShareHelloRetryRequest;
    static secp521r1: KeyShareHelloRetryRequest;
    static x25519: KeyShareHelloRetryRequest;
    /**
     *
     * @param {Uint8Array} data
     */
    static parse(data: Uint8Array): KeyShareHelloRetryRequest;
    /**
     *
     * @param {NamedGroup} selected_group
     */
    constructor(selected_group: NamedGroup);
}
import { Struct } from "../../src/base.js";
import { NamedGroup } from "../../src/extension/namedgroup.js";
