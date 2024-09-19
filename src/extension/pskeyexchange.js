// deno-lint-ignore-file no-slow-types
// @ts-self-types="../../type/extension/pskeyexchange.d.ts"

/**!SECTION
 * https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.9
 */

import { Minmax, Struct, Uint8 } from "../base.js";

/**
 * enum { 
  
         psk_ke(0), psk_dhe_ke(1), (255) 
      } PskKeyExchangeMode;
 * 
 * struct {
 * 
          PskKeyExchangeMode ke_modes<1..255>;
      } PskKeyExchangeModes;
 */
export class PskKeyExchangeModes extends Struct {
   /**
    * the server MUST NOT supply a "key_share" values
    * @returns Uint8(0)
    */
   static psk_ke() { return new PskKeyExchangeModes(new Uint8(0)) }
   /**
    * the client and server MUST supply "key_share" values
    * @returns Uint8(1)
    */
   static psk_dhe_ke(){ return new PskKeyExchangeModes(new Uint8(1)) }
   /**
    * LINK https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.9
    * psk_dhe_ke:  PSK with (EC)DHE key establishment.  In this mode, the
      client and server MUST supply "key_share" values as described in
      Section 4.2.8.
    */
   constructor(...ke_mode) {
      super(
         Minmax.min(1).max(255).byte(...ke_mode)//new OpaqueVar(ke_mode, 1, 255)
      )
   }
}
