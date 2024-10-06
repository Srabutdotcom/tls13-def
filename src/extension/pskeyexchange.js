// deno-lint-ignore-file no-slow-types
// @ts-self-types="../../type/extension/pskeyexchange.d.ts"

/**!SECTION
 * https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.9
 */

import { Minmax, Struct, Uint8 } from "../base.js";

export class PskKeyExchangeMode extends Uint8 {
   #mode
   static psk_ke = new PskKeyExchangeMode(0)
   static psk_dhe_ke = new PskKeyExchangeMode(1)
   /**
    * @param {number} v 
    */
   constructor(v){
      super(v)
      this.#mode = v
   }
   /**
    * @return {'psk_ke'|'psk_dhe_ke'} description
    */
   get name(){
      switch (this.#mode) {
         case 0: return 'psk_ke'
         case 1: return 'psk_dhe_ke'
         default: return TypeError(`Expected mode 0 or 1`)
      }
   }
   toString(){return this.name}
}

/**
 * PskKeyExchangeModes
 * ```
 * enum { 
      psk_ke(0), psk_dhe_ke(1), (255) 
   } PskKeyExchangeMode;
 * 
 * struct {
      PskKeyExchangeMode ke_modes<1..255>;
   } PskKeyExchangeModes;
   ```
 */
export class PskKeyExchangeModes extends Struct {
   #pskModes
   /**
    * the server MUST NOT supply a "key_share" values
    * @returns Uint8(0)
    */
   static psk_ke() { return new PskKeyExchangeModes(PskKeyExchangeMode.psk_ke) }
   /**
    * the client and server MUST supply "key_share" values
    * @returns Uint8(1)
    */
   static psk_dhe_ke(){ return new PskKeyExchangeModes(PskKeyExchangeMode.psk_dhe_ke) }
   /**
    * LINK https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.9
    * psk_dhe_ke:  PSK with (EC)DHE key establishment.  In this mode, the
      client and server MUST supply "key_share" values as described in
      Section 4.2.8.
      @param {...PskKeyExchangeMode} ke_mode - description
    */
   constructor(...ke_mode) {
      super(
         Minmax.min(1).max(255).byte(...ke_mode)
      )
      this.#pskModes = ke_mode
   }
   get pskModes(){return this.#pskModes}
   /**
    * 
    * @param {Uint8Array} data 
    */
   static parse(data){
      const value = data.at(1);
      switch (value) {
         case 1: return PskKeyExchangeModes.psk_dhe_ke();
         case 0: return PskKeyExchangeModes.psk_ke();   
         default: return TypeError(`Ilegal Parameter for PskKeyExchangeModes`)
      }
   }
}

//npx -p typescript tsc ./src/extension/pskeyexchange.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist