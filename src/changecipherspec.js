// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/changecipherspec.d.ts"

import { Uint8 } from "./base.js"
import { TLSContentType } from "./contentype.js";
/**
 * ChangeCipherSpec 
 * ```
 * produce Uint8[1]
 * ```
 * https://www.rfc-editor.org/rfc/rfc5246#section-7.1
 * @extends {Uint8}
 */
export class ChangeCipherSpec extends Uint8 {
   // create ChangeCipherSpec
   static a() { return new ChangeCipherSpec }
   // create ChangeCipherSpec
   constructor() {
      super(1)
   }

   /**
    * parse octet if value.at(0) == 1 return ChangeCipherSpec
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {ChangeCipherSpec}
    */
   static parse(octet) {
      if (octet[0] == 1) return ChangeCipherSpec.a();
      throw TypeError(`Invalid value: ${octet[0]}`)
   }
}

TLSContentType.register(TLSContentType.TYPES.CHANGE_CIPHER_SPEC, ChangeCipherSpec.parse)

// npx -p typescript tsc ./src/changecipherspec.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist