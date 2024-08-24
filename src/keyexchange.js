/**
 * !SECTION B.3.1.  Key Exchange Messages
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.1
 */

import { Enum, OpaqueFix, OpaqueVar, Uint16 } from "./mod.js";
import { concat, getUint16, uint8array } from "@aicone/byte"

/**
 * ProtocolVersion -> 0x0303 - TLS v1.2 or 0x0304 - TLS v1.3
 */
export class ProtocolVersion extends Uint16 {
   /**
    * 
    * @param {0x0303|0x0304} ver - TLS version (1.2 or 1.3) 
    */
   constructor(ver) {
      ver = version(ver);
      super(ver)
   }
   meaning() {
      if (this.value() == 0x0303) return `TLS v1.2 - legacy_version[0x0303]`
      if (this.value() == 0x0304) return `TLS v1.3 - [0x0304]`;
      throw TypeError(`Uknown version ${this.value}`)
   }
}

function version(ver) {
   if ([0x0303, 0x0304].includes(ver) == false) throw TypeError(`Unexpected version - ${ver}`);
   return ver;
}

export const legacy_version = new ProtocolVersion(0x0303);

/**
 * opaque Random[32]
 */
export class Random extends OpaqueFix {
   constructor() {
      const rnd32 = crypto.getRandomValues(new Uint8Array(32));
      super(rnd32, 32)
   }
}

/**
 * CipherSuite selector
 */
export class CipherSuite extends Uint8Array {
   /**
    * @param {0x01|0x02} code 
    */
   constructor(code = 0x01) { // default to [0x13, 0x01]-'TLS_AES_128_GCM_SHA256'
      super([0x13, code])
   }
   meaning() {
      if (this.at(1) == 0x01) return 'TLS_AES_128_GCM_SHA256[0x13, 0x01]'
      if (this.at(1) == 0x02) return 'TLS_AES_256_GCM_SHA384[0x13, 0x02]'
      throw TypeError(`Uknown cipher - ${this[1]}`)
   }
}

export class CipherSuites extends OpaqueVar {
   ciphers = {
      TLS_AES_128_GCM_SHA256(){return new CipherSuite(0x01)},
      TLS_AES_256_GCM_SHA384(){return new CipherSuite(0x02)}
   }
   constructor() {
      const uint8s = concat(new CipherSuite(0x01), new CipherSuite(0x02));
      super(uint8s, 2, 65534)// <2..2^16-2>
   }
}

export function cipherSuite(){
   return {
      TLS_AES_128_GCM_SHA256(){return new CipherSuite(0x01)},
      TLS_AES_256_GCM_SHA384(){return new CipherSuite(0x02)}
   }
}

const a = cipherSuite().TLS_AES_128_GCM_SHA256();
debugger

