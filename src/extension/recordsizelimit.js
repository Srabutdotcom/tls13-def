// deno-lint-ignore-file no-slow-types
// @ts-self-types="../../type/extension/recordsizelimit.d.ts"

import { Uint16 } from "../base.js";
import { Byte } from "../deps.js"

/**
 * RecordSizeLimit
 *
 * @export
 * @class RecordSizeLimit
 * @typedef {RecordSizeLimit}
 * @extends {Uint16}
 */
export class RecordSizeLimit extends Uint16 {
   
   /**
    * Creates an instance of RecordSizeLimit.
    *
    * @constructor
    * @param {number} value - positive integer
    */
   constructor(value) {
      super(value)
   }
   
   /**
    * Parse RecordSizeLimit
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {RecordSizeLimit}
    */
   static parse(octet) {
      const value = Byte.get.BE.b16(octet);
      return new RecordSizeLimit(value)
   }
}

//npx -p typescript tsc ./src/extension/recordsizelimit.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist
