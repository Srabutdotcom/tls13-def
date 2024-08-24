import { concat, Uint8BE, Uint16BE, Uint24BE, Uint32BE, maxBytes, uint, uint8array } from "@aicone/byte";
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
      if (!uint8s || uint8s.length == 0) {
         super();
      } else if (uint8s.some(e => (e instanceof Uint8Array) == false)) {
         throw TypeError(`all arguments must be Uint8Array`);
      } else {
         super(concat(...uint8s))
      }
      this.#member = uint8s;
   }
   /**
    * 
    * @returns {Uint8Array[]} array of Uint8Array
    */
   member() { return this.#member }
}

/**
 * Vector Fixed length definition
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.4
 */
export class VectorFix extends Uint8Array {
   /**
    * 
    * @param {Uint8Array} _uint8array - data
    * @param {uint} length - length uint
    */
   constructor(_uint8array = new Uint8Array, length = 0) {
      _uint8array = uint8array(_uint8array);
      length = uint(length);
      if (_uint8array.length !== length) throw TypeError(`_uint8array.length [${_uint8array.length}] !== length [${length}]`)
      super(_uint8array.buffer)
   }
}

export const OpaqueFix = VectorFix

/**
 * Vector Variable length definition
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.4
 */
export class VectorVar extends Uint8Array {
   #member
   /**
    * 
    * @param {Uint8Array} _uint8array 
    * @param {uint} min 
    * @param {uint} max 
    */
   constructor(_uint8array = new Uint8Array, min = 0, max = 0) {
      _uint8array = uint8array(_uint8array);
      min = uint(min);
      max = uint(max);
      if (_uint8array.length < min) throw TypeError(`value should have a min length of ${min}`)
      if (_uint8array.length > max) throw TypeError(`value should have a max length of ${max}`)

      const length = Uint8BE(_uint8array.length, maxBytes(max));
      super(concat(length, _uint8array))
      this.#member = {
         length,
         data: _uint8array
      }
   }
   /**
    * 
    * @returns {Uint8Array[]} array of Uint8Array
    */
   member() { return this.#member }
}

export const OpaqueVar = VectorVar

/**
 * number definition 1 byte
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint8 extends Uint8Array {
   /**
    * 
    * @param {uint} int 
    */
   constructor(int) {
      int = uint(int)
      super(Uint8BE(int, 1).buffer)
   }
   value(){return getUint8(this)}
}

/**
 * number definition 2 bytes
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint16 extends Uint8Array {
   /**
    * 
    * @param {uint} int 
    */
   constructor(int) {
      int = uint(int)
      super(Uint16BE(int).buffer)
   }
   value(){return getUint16(this)}
}

/**
 * number definition 3 bytes
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint24 extends Uint8Array {
   /**
    * 
    * @param {uint} int 
    */
   constructor(int) {
      int = uint(int)
      super(Uint24BE(int).buffer)
   }
   value(){return getUint24(this)}
}

/**
 * number definition 4 byte
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint32 extends Uint8Array {
   /**
    * 
    * @param {uint} int 
    */
   constructor(int) {
      int = uint(int)
      super(Uint32BE(int).buffer)
   }
   value(){return getUint32(this)}
}

/**
 * Enum in Javascript
 */
export class Enum {
   // store value -> key map
   #reverse = {}
   // as property for sign of max value in Enum
   static max = Symbol("max")
   // for max value (if any)
   #maxvalue
   /**
    * 
    * @param {{any:any}} object 
    */
   constructor(object){
      for(const prop in object){
         // reverse map value -> key
         this.#reverse[object[prop]] = prop;
         Object.defineProperty(this,
            prop,
            { 
               value : object[prop],
               writable: false,
               enumerable: true
            }
         )
      }
      if(Object.hasOwn(object,Enum.max))
         this.#maxvalue = object[Enum.max]
   }
   /**
    * return keys or properties
    * @returns {any[]} [any]
    */
   keys(){return Object.keys(this)}
   /**
    * return values
    * @returns {any[]} [any]
    */
   values(){return Object.values(this)}
   /**
    * return key for value supplied or null if not found
    * @param {any} value 
    * @returns {any} key
    */
   key(value){
      return this.#reverse[value] ?? null
   }
   /**
    * return value for key supplied or null if not found
    * @param {any} key 
    * @returns {any} value
    */
   value(key){
      return this[key]??null
   }
   maxvalue(){ return this.#maxvalue ?? null }
}

