/**!SECTION
 * LINK https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.8
 */

import { Minmax, Struct } from "../base.js";
import { NamedGroupList, NamedGroup } from "./namedgroup.js";
import { p521 } from "../deps.js";



/**
 * LINK https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.8
 * 
 * struct {
 * 
         NamedGroup group;
         opaque key_exchange<1..2^16-1>;
      } KeyShareEntry;
 */
class KeyShareEntry extends Struct {
   #NamedGroup = NamedGroup
   /**
    * 
    * @param {NamedGroup} group - NamedGroup 
    * @param {Uint8Array} key_exchange - PublicKey
    */
   constructor(group, ...key_exchange) {
      super(
         group,
         Minmax.min(1).max(2 ** 16 - 1).byte(...key_exchange)//new OpaqueVar(key_exchange, 1, 2 ** 16 - 1)
      )
   }
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
class KeyShareClientHello extends Struct {
   /**
    * 
    * @param {...KeyShareEntry} clientShares -A list of offered KeyShareEntry values in descending order of client preference.
    */
   constructor(...clientShares) {
      super(
         Minmax.min(0).max(2 ** 16 - 1).byte(...clientShares)//new OpaqueVar(concat(...clientShares), 0, 2 ** 16 - 1)
      )
   }
}
/**
 * struct {
 * 
         NamedGroup selected_group;
      } KeyShareHelloRetryRequest;
       
   selected_group:  The mutually supported group the server intends to
      negotiate and is requesting a retried ClientHello/KeyShare for.
 */
class KeyShareHelloRetryRequest extends Struct {
   static {
      const { namedGroup } = NamedGroupList
      this.secp256r1 = function () { return new KeyShareHelloRetryRequest(namedGroup.secp256r1) }
      this.secp384r1 = function () { return new KeyShareHelloRetryRequest(namedGroup.secp384r1) }
      this.secp521r1 = function () { return new KeyShareHelloRetryRequest(namedGroup.secp521r1) }
      this.x25519 = function () { return new KeyShareHelloRetryRequest(namedGroup.x25519) }
   }
   constructor(selected_group) {
      super(selected_group)
   }
}
/**
 * struct {
      KeyShareEntry server_share;
   } KeyShareServerHello;

   server_share:  A single KeyShareEntry value that is in the same group
      as one of the client's shares.
 */
class KeyShareServerHello extends Struct {
   /**
    * 
    * @param {KeyShareEntry} server_share
    */
   constructor(server_share) {
      if ((server_share instanceof KeyShareEntry) == false) throw TypeError(`Expected KeyShareEntry Object`)
      super(server_share)
   }
}
/**
 * 
 * @param {KeyShareEntry} server_share 
 * @returns KeyShareServerHello
 */
export function keyShareServerHello(server_share) { return new KeyShareServerHello(server_share) }

async function cryptokey(algo) {
   return await crypto.subtle.generateKey(algo, true, ["deriveKey", "deriveBits"])
}

class Algo {
   static ecdh = {
      256: ecdh(256),
      384: ecdh(384),
      521: ecdh(521)
   };
   static x25519 = { name: "X25519" }
}

function ecdh(byte) {
   return {
      name: "ECDH",
      namedCurve: `P-${byte}`,
   }
}

/**
 * CryptoKeyPair or P521 key wrapper with feature to produce KeyShareEntry, privateKeyJwk, and sharedKey
 * @param {CryptoKeyPair} v - CryptoKeyPair
 */
class Key {
   /**@type {CryptoKeyPair} #keypair - CryptoKeyPair */
   #keypair
   /**
    * 
    * @param {CryptoKeyPair} v 
    */
   constructor(v) { this.#keypair = v }
   async keyShareEntry() {
      if (this.#keypair instanceof P521) return this.#keypair.keyShareEntry()
      const arrayBufferPublicKey = await crypto.subtle.exportKey("raw", this.#keypair.publicKey);
      const { name, namedCurve } = this.#keypair.publicKey.algorithm;
      const { namedGroup } = NamedGroupList
      if (name == "X25519") return new KeyShareEntry(namedGroup.x25519, new Uint8Array(arrayBufferPublicKey));
      if (name == "ECDH") {
         const algo = namedCurve.split("-")[1];
         return new KeyShareEntry(namedGroup[`secp${algo}r1`], new Uint8Array(arrayBufferPublicKey));
      }
      return false
   }
   /**
    * 
    * @returns {Promise<JsonWebKey>} privateKey
    */
   async privateKeyJwk() {
      if (this.#keypair instanceof P521) return false
      return await crypto.subtle.exportKey("jwk", this.#keypair.privateKey);
   }
   /**
    * 
    * @param {CryptoKey} v - publicKey in CryptoKey object 
    * @param {number} l - positive integer divisible by 8 
    * @return {Uint8Array} sharedkey
    */
   async sharedKey(v, l) {
      if (this.#keypair instanceof P521) return this.#keypair.sharedKey(v);
      const { name } = this.#keypair.privateKey.algorithm;
      const sk = await crypto.subtle.deriveBits({ name, public: v }, this.#keypair.privateKey, l);
      return new Uint8Array(sk)
   }
   get algorithm() {
      if (this.#keypair instanceof P521) return { name: "ECDH", namedCurve: "P-521" }
      return this.#keypair.privateKey.algorithm
   }
}
/**
 * Collection of Key that contain (X25519, ECDH256, ECDH384 and ECDH521 using noble)
 * 
 * produce KeyShareClientHello 
 */
class Keys {
   #ecdh256
   #ecdh384
   #ecdh521
   #x25519
   /**
    * 
    * @param {Array<Key>} keys 
    */
   constructor(...keys) {
      for (const e of keys) {
         const { name, namedCurve } = e.algorithm
         if (name == "X25519") {
            this.#x25519 = e; continue
         }
         if (name == "ECDH") {
            if (namedCurve.includes("256")) {
               this.#ecdh256 = e; continue;
            }
            if (namedCurve.includes("384")) {
               this.#ecdh384 = e; continue;
            }
            if (namedCurve.includes("521")) {
               this.#ecdh521 = e; continue;
            }
         }
      }
   }
   get ecdh256() { return this.#ecdh256 }
   get ecdh384() { return this.#ecdh384 }
   get ecdh521() { return this.#ecdh521 }
   get x25519() { return this.#x25519 }
   /**
    * 
    * @returns KeyShareClientHello
    * Clients MUST NOT offer multiple KeyShareEntry values
   for the same group.  Clients MUST NOT offer any KeyShareEntry values
   for groups not listed in the client's "supported_groups" extension.
   Servers MAY check for violations of these rules and abort the
   handshake with an "illegal_parameter" alert if one is violated.
    */
   async keyShareClientHello() {
      return new KeyShareClientHello(
         await this.x25519.keyShareEntry(),
         /* await this.ecdh521.keyShareEntry(),
         await this.ecdh384.keyShareEntry(),
         await this.ecdh256.keyShareEntry() */
      )
   }
}

/**
 * @prop {Keys} keys
 */
class ClientShares {
   static keys
   static async keyShareClientHello() {
      ClientShares.keys = new Keys(
         new Key(await cryptokey(Algo.x25519)),
         new Key(new P521()), // using p521 from noble as deno doesn't support yet
         new Key(await cryptokey(Algo.ecdh["384"])),
         new Key(await cryptokey(Algo.ecdh["256"])),
      )
      return await ClientShares.keys.keyShareClientHello()
   }
}

class P521 extends Uint8Array {
   constructor() {
      super(p521.utils.randomPrivateKey())
   }
   keyShareEntry() {
      const { namedGroup } = NamedGroupList
      return new KeyShareEntry(namedGroup.secp521r1, p521.getPublicKey(this))
   }
   /**
    * 
    * @param {Uint8Array} publicKey 
    * @returns sharedSecret
    */
   sharedKey(publicKey) {
      return p521.getSharedSecret(this, publicKey)
   }
}

class ServerShare {
   static key
   static async x25519() {
      ServerShare.key = new Key(await cryptokey(Algo.x25519))
      return await ServerShare.keyShareServerHello()
   }
   static async p521() {
      ServerShare.key = new Key(new P521())
      return await ServerShare.keyShareServerHello()
   }
   static async p384() {
      ServerShare.key = new Key(await cryptokey(Algo.ecdh["384"]))
      return await ServerShare.keyShareServerHello()
   }
   static async p256() {
      ServerShare.key = new Key(await cryptokey(Algo.ecdh["256"]))
      return await ServerShare.keyShareServerHello()
   }
   static async keyShareServerHello() { return new KeyShareServerHello(await ServerShare.key.keyShareEntry()) }
}

export { ClientShares, KeyShareEntry, Keys, Key, ServerShare, KeyShareClientHello, KeyShareServerHello, KeyShareHelloRetryRequest }