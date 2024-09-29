// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/keyexchange.d.ts"
/**
 * !SECTION B.3.1.  Key Exchange Messages
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.1
 */

import { Minmax, Uint16 } from "./base.js";
import { concat } from "./deps.js"

/**
 * ProtocolVersion -> 0x0303 - TLS v1.2 or 0x0304 - TLS v1.3
 */
export class ProtocolVersion extends Uint16 {
   static version = {
      SSL30: new ProtocolVersion(0x0300),
      TLS10: new ProtocolVersion(0x0301),
      TLS11: new ProtocolVersion(0x0302),
      TLS12: new ProtocolVersion(0x0303),
      TLS13: new ProtocolVersion(0x0304),
      legacy: new ProtocolVersion(0x0303),
   }
   /**
    * @param {number} ver - 0x0300[SSL30] to 0x0304[TLS13] 
    * @return {ProtocolVersion} description
    */
   static a(ver) { return new ProtocolVersion(ver) }
   /**
    * 
    * @param {number} ver - 0x0300[SSL30] to 0x0304[TLS13] 
    * @return {ProtocolVersion} description
    */
   constructor(ver) {
      if (ver < 0x0300 || ver > 0x0304) throw TypeError(`Unexpected TLS version value`)
      super(ver)
   }
   meaning() {
      if (this.value() == 0x0300) return `SSL v3.0 - [0x0300]`;
      if (this.value() == 0x0301) return `TLS v1.0 - [0x0301]`;
      if (this.value() == 0x0302) return `TLS v1.1 - [0x0302]`;
      if (this.value() == 0x0303) return `TLS v1.2 - legacy_version[0x0303]`
      if (this.value() == 0x0304) return `TLS v1.3 - [0x0304]`;
      throw TypeError(`Uknown version ${this.value}`)
   }
}

/**
 * opaque Random[32]
 */
export class Random extends Uint8Array {
   /**
    * 
    * @param {Uint8Array} rnd - 32 bytes random 
    */
   static a(rnd) { return new Random(rnd) }
   /**
    * 
    * @param {Uint8Array} rnd - 32 bytes random 
    */
   constructor(rnd) {
      super(rnd ?? crypto.getRandomValues(new Uint8Array(32)))
   }
}

/**
 * CipherSuite
 * ```
 * uint8 CipherSuite[2];    Cryptographic suite selector 
 * ```
 */
export class CipherSuite extends Uint8Array {
   static TLS_AES_128_GCM_SHA256 = new CipherSuite(0x01)
   static TLS_AES_256_GCM_SHA384 = new CipherSuite(0x02)
   /**
    * @param {0x01|0x02} code 
    */
   constructor(code = 0x01) { // default to [0x13, 0x01]-'TLS_AES_128_GCM_SHA256'
      super([0x13, code])
   }
   meaning() {
      if (this.at(1) == 0x01) return 'TLS_AES_128_GCM_SHA256[0x13, 0x01]'
      if (this.at(1) == 0x02) return 'TLS_AES_256_GCM_SHA384[0x13, 0x02]'
      throw TypeError(`Unknown cipher - ${this[1]}`)
   }
   get AEAD() {
      if (this.at(1) == 0x01) return 128
      if (this.at(1) == 0x02) return 256
      return -1
   }
   get SHA() {
      if (this.at(1) == 0x01) return 256
      if (this.at(1) == 0x02) return 384
      return -1
   }
}

/**
 * List of CipherSuite
 * CipherSuite cipher_suites<2..2^16-2>;
 */
export class CipherSuites extends Minmax {
   ciphers = {
      TLS_AES_128_GCM_SHA256: new CipherSuite(0x01),
      TLS_AES_256_GCM_SHA384: new CipherSuite(0x02)
   }
   /**
    * new CipherSuites 
    * @param {Uint8Array} cips - cipherSuites 
    * @return {CipherSuites} list of CipherSuite
    * */
   static a(cips) { return new CipherSuites(cips) }
   /**
    * 
    * @param {Uint8Array} cips - cipherSuites 
    */
   constructor(cips = concat(new CipherSuite(0x01), new CipherSuite(0x02))) {
      super(2, 65534, cips)// <2..2^16-2>
   }
}

//npx -p typescript tsc ./src/keyexchange.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist


