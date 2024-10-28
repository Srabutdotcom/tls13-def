// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/contentype.d.ts"

import { Uint8 } from "./base.js";

export class TLSContentType extends Uint8 {
   static #parser = new Map;
   // Static mapping of content types according to TLS 1.3 specification
   static TYPES = {
      INVALID: 0,
      CHANGE_CIPHER_SPEC: 20,
      ALERT: 21,
      HANDSHAKE: 22,
      APPLICATION_DATA: 23,
      HEARTBEAT: 24  // From RFC 6520
   };

   // Reverse mapping for byte to name lookup
   static TYPES_BY_BYTE = Object.entries(TLSContentType.TYPES)
      .reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});

   // Static mapping of class related to type

   /**
    * to register parser for specified content type
    *
    * @static
    * @param {number} value - TLSContentType value
    * @param {Function} parser - parser based on each class
    */
   static register(value, parser) {
      TLSContentType.#parser.set(value, parser);
   }

   /**
    * get parser based on content type
    *
    * @param {number} value
    * @returns {Function}
    */
   get parser() {
      return TLSContentType.#parser.get(this.value())
   }

   constructor(value) {
      // Call super with a single byte buffer first
      super(1);
      // check and validate
      if (typeof value !== "number") throw TypeError(`Expected number`)
      if (!Number.isInteger(value) || !TLSContentType.TYPES_BY_BYTE[value]) {
         throw TypeError('Byte value must be an integer in TLSContentType.TYPES');
      }
      // Set the value
      this[0] = value;

      // Initialize metadata properties
      Object.defineProperties(this, {
         'name': {
            value: TLSContentType.TYPES_BY_BYTE[this[0]] || 'UNKNOWN',
            writable: false,
            enumerable: true
         }
      });
   }
   // Static factory methods
   
   /**
    * TLSContentType from byte of number
    *
    * @static
    * @param {number} byte - 0, 20, 21, 22, 23, 24
    * @returns {TLSContentType}
    */
   static fromByte(byte) {
      return new TLSContentType(byte);
   }

   
   /**
    * TLSContentType from string
    *
    * @static
    * @param {string} name - must be in TLSContentType.TYPES
    * @returns {TLSContentType}
    */
   static fromString(name) {
      name = name.toUpperCase();
      if(TLSContentType.TYPES[name])return TLSContentType[name]
      throw TypeError(`name must be in TLSContentType.TYPES`)
   }

   /**
    * TLSContentType from array
    *
    * @static
    * @param {Array|Uint8Array} array
    * @returns {TLSContentType}
    */
   static fromArray(array){
      return new TLSContentType(array.at(0))
   }

   /**
    * TLSContentType from Uint8Array
    *
    * @static
    * @param {Uint8Array} uint8array
    * @returns {TLSContentType}
    */
   static fromUint8Array(uint8array) {
      return TLSContentType.fromArray(uint8array);
   }

   // Predefined content types
   static get INVALID() { return new TLSContentType(TLSContentType.TYPES.INVALID); }
   static get CHANGE_CIPHER_SPEC() { return new TLSContentType(TLSContentType.TYPES.CHANGE_CIPHER_SPEC); }
   static get ALERT() { return new TLSContentType(TLSContentType.TYPES.ALERT); }
   static get HANDSHAKE() { return new TLSContentType(TLSContentType.TYPES.HANDSHAKE); }
   static get APPLICATION_DATA() { return new TLSContentType(TLSContentType.TYPES.APPLICATION_DATA); }
   static get HEARTBEAT() { return new TLSContentType(TLSContentType.TYPES.HEARTBEAT); }
}

// npx -p typescript tsc ./src/contentype.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist