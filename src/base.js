// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/base.d.ts"
import { concat, Uint8BE, Uint16BE, Uint24BE, Uint32BE, maxBytes, uint } from "@aicone/byte";
import { getUint8, getUint16, getUint24, getUint32 } from "@aicone/byte";

/**
 * Struct definition
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.6
 */
export class Struct extends Uint8Array {
   #member
   /**
    * @param  {...Uint8Array} uint8s  
    */
   constructor(...uint8s) {
      super(uint8s && uint8s.length > 0 ? concat(...uint8s) : undefined);

      if (uint8s && uint8s.length > 0 && uint8s.some(e => !(e instanceof Uint8Array))) {
         throw TypeError(`all arguments must be Uint8Array`);
      }
      
      this.#member = uint8s
   }
   /**
    * 
    * @returns {Uint8Array[]} array of Uint8Array
    */
   get member() { return this.#member }
}

export class Fixed extends Uint8Array {
   /**
    * 
    * @param {number} l - the length of byte > 0
    * @returns 
    */
   static length(l) {
      l = uint(l)
      return {
         /**
          * 
          * @param {...Uint8Array} b - the byte to create
          * @returns 
          */
         bytes(...b) {
            if (b.length !== l) throw TypeError(`b.length [${b.length}] !== l [${l}]`)
            return new Fixed(l, ...b);
         }
      }
   }
   /**
    * 
    * @param {number} l 
    * @param  {...Uint8Array} v 
    */
   constructor(l, ...v) {
      if (v.length !== l) throw TypeError(`v.length [${v.length}] !== l [${l}]`)
      super(concat(...v))
   }
}
/**
 */
export class Minmax extends Uint8Array {
   /**
    * 
    * @param {number} m - the minimum length of byte
    * @returns 
    */
   static min(m) {
      m = uint(m)
      return {
         /**
          * 
          * @param {number} M - the maximum of byte length
          * @returns 
          */
         max(M) {
            M = uint(M)
            return {
               /**
                * 
                * @param {...Uint8Array} b 
                */
               byte(...b) {
                  return new Minmax(m, M, ...b)
               }
            }
         }
      }
   }
   #member
   #min
   #max
   /**
    * @param {number} m - minimum length
    * @param {number} M - maximum length
    * @param  {...Uint8Array} b 
    */
   constructor(m, M, ...b) {
      const l = b.reduce((ac, ar) => ac + (ar?.length ?? 0), 0);
      if (l < m) throw TypeError(`bytes should have a min length of ${m}`)
      if (l > M) throw TypeError(`bytes should have a max length of ${M}`)
      const byteLength = maxBytes(M);
      if (byteLength > 4) throw TypeError(`maximum byte length is 4 in Minmax class`);
      const length = Uints[`Uint${8 * byteLength}`](l)//Uint8BE(l, maxBytes(M));

      super(concat(length, ...b))
      this.#member = [length, ...b]
      this.#min = m
      this.#max = M
   }
   get member() { return this.#member }
   get min() { return this.#min }
   get max() { return this.#max }
}


/**
 * number definition 1 byte
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint8 extends Uint8Array {
   /**
    * 
    * @param {number} int 
    */
   static new(v) { return new Uint8(v) }
   /**
    * 
    * @param {number} int 
    */
   constructor(int) {
      int = uint(int)
      super(Uint8BE(int, 1).buffer)
   }
   /**
    * 
    * @returns {number}
    */
   value() { return getUint8(this) }
}

/**
 * number definition 2 bytes
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint16 extends Uint8Array {
   /**
    * 
    * @param {number} int 
    */
   static new(v) { return new Uint16(v) }
   /**
    * 
    * @param {number} int 
    */
   constructor(int) {
      int = uint(int)
      super(Uint16BE(int).buffer)
   }
   /**
    * 
    * @returns {number}
    */
   value() { return getUint16(this) }
}

/**
 * number definition 3 bytes
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint24 extends Uint8Array {
   /**
    * 
    * @param {number} int 
    */
   static new(v) { return new Uint24(v) }
   /**
    * 
    * @param {number} int 
    */
   constructor(int) {
      int = uint(int)
      super(Uint24BE(int).buffer)
   }
   /**
    * 
    * @returns {number}
    */
   value() { return getUint24(this) }
}

/**
 * number definition 4 byte
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint32 extends Uint8Array {
   /**
    * 
    * @param {number} int 
    */
   static new(v) { return new Uint32(v) }
   /**
    * 
    * @param {number} int 
    */
   constructor(int) {
      int = uint(int)
      super(Uint32BE(int).buffer)
   }
   /**
    * 
    * @returns {number}
    */
   value() { return getUint32(this) }
}

/**
 * Enum in Javascript
 */
export class Enum {
   // store value -> key map
   #reverse = {}
   // property for sign of max value in Enum
   static max = Symbol("max")
   // for max value (if any)
   #maxvalue
   // property to store class to wrap the value
   static class = Symbol("class")
   // the class (if any)
   #class
   // bytes length (if any)
   #byteLength
   /**
    * 
    * @param {{any:any}} object 
    */
   constructor(object) {
      if (Object.hasOwn(object, Enum.max)) {
         this.#maxvalue = Array.isArray(object[Enum.max]) ? 256 ** object[Enum.max].length - 1 : object[Enum.max]
         this.#byteLength = maxBytes(this.#maxvalue)
      }

      if (Object.hasOwn(object, Enum.class)) {
         if (object[Enum.class]?.constructor.toString().match(/^class/) == false) throw TypeError(`expected class but got ${object[Enum.class]?.constructor}`)
         this.#class = object[Enum.class]
      }

      for (const prop in object) {
         // reverse map value -> key
         this.#reverse[object[prop]] = prop;
         Object.defineProperty(this,
            prop,
            {
               value: this.#wrap(object[prop]),
               writable: false,
               enumerable: true
            }
         )
      }
   }
   /**
    * return keys or properties
    * @returns {any[]} [any]
    */
   keys() { return Object.keys(this) }
   /**
    * return values
    * @returns {any[]} [any]
    */
   values() { return Object.values(this) }
   /**
    * return key for value supplied or null if not found
    * @param {any} value 
    * @returns {any} key
    */
   key(value) {
      return this.#reverse[value] ?? null
   }
   /**
    * return value for key supplied or null if not found
    * @param {any} key 
    * @returns {any} value
    */
   value(key) {
      return this[key] ?? null
   }
   maxvalue() { return this.#maxvalue ?? null }
   #uintOrArrayOfByte(value) {
      if (typeof value == "number") {
         value = uint(value)
         if (value > this.#maxvalue) throw TypeError(`value: ${value} can't be > than ${this.#maxvalue}`)
         return this.#byteLength ? Uint8BE(value, this.#byteLength) : value
      }
      if (Array.isArray(value)) {
         if (value.length > this.#byteLength) throw TypeError(`length of value is > than ${this.#byteLength}`)
         return this.#byteLength ? new Uint8Array(value) : value
      }
      if (this.#byteLength) throw TypeError(`expected value is either uint or arrayofbytes [0-255] `)
      return value
   }
   #wrap(value) {
      if (this.#class) return new this.#class(value);
      return value
   }
}

/**
 * Uint[s] method container
 */
export class Uints {
   /**
    * 
    * @param {number} v 
    * @returns {Uint8}
    */
   static Uint8(v) { class Length extends Uint8 { constructor(v) { super(v) } }; return new Length(v) }
   /**
    * 
    * @param {number} v 
    * @returns {Uint16}
    */
   static Uint16(v) { class Length extends Uint16 { constructor(v) { super(v) } }; return new Length(v) }
   /**
    * 
    * @param {number} v 
    * @returns {Uint24}
    */
   static Uint24(v) { class Length extends Uint24 { constructor(v) { super(v) } }; return new Length(v) }
   /**
    * 
    * @param {number} v 
    * @returns {Uint32}
    */
   static Uint32(v) { class Length extends Uint32 { constructor(v) { super(v) } }; return new Length(v) }
}

// npx -p typescript tsc base.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ../dist

