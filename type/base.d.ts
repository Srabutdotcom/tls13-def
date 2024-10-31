/**
 * Struct definition
 *
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.6
 */
export class Struct extends Uint8Array {
    /**
     * @param  {...(Uint8Array|number)} items
     */
    constructor(...items: (Uint8Array | number)[]);
    /**
     *
     * @returns {Uint8Array[]} array of Uint8Array
     */
    get member(): Uint8Array[];
    #private;
}
/**
 * Fixed length of Uint8Array
 */
export class Fixed extends Uint8Array {
    /**
     *
     * @param {number} l - the length of byte > 0
     * @returns
     */
    static length(l: number): {
        /**
         *
         * @param {...Uint8Array} b - the byte to create
         * @returns
         */
        bytes(...b: Uint8Array[]): Fixed;
    };
    /**
     *
     * @param {number} l
     * @param  {...Uint8Array} v
     */
    constructor(l: number, ...v: Uint8Array[]);
}
/**
 * Variable length between defined min and max of Uint8Array
 */
export class Minmax extends Uint8Array {
    /**
     *
     * @param {number} m - the minimum length of byte
     * @returns
     */
    static min(m: number): {
        /**
         *
         * @param {number} M - the maximum of byte length
         * @returns
         */
        max(M: number): {
            /**
             *
             * @param {...Uint8Array} b
             */
            byte(...b: Uint8Array[]): Minmax;
        };
    };
    /**
     * @param {number} m - minimum length
     * @param {number} M - maximum length
     * @param  {...Uint8Array} b
     */
    constructor(m: number, M: number, ...b: Uint8Array[]);
    /**
     * @return {Array<Uint8Array>}
     */
    get member(): Uint8Array[];
    get min(): number;
    get max(): number;
    #private;
}
/**
 * number definition 1 byte
 *
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint8 extends Uint8Array {
    /**
     *
     * @param {number} v
     */
    static of(v: number): Uint8;
    
    /**
     * get value from 8 bits
     * @param {Uint8Array} octet -
     * @return {number} */
    static toValue(octet: Uint8Array): number;
    /**
     *
     * @param {number} int
     */
    constructor(int: number);
    /**
     *
     * @returns {number}
     */
    value(): number;
}
/**
 * number definition 2 bytes
 *
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint16 extends Uint8Array {
    /**
     *
     * @param {number} v
     */
    static of(v: number): Uint16;
    
    /**
     * get value from 16 bits
     * @param {Uint8Array} octet -
     * @return {number} */
    static toValue(octet: Uint8Array): number;
    /**
     *
     * @param {number} int
     */
    constructor(int: number);
    /**
     *
     * @returns {number}
     */
    value(): number;
}
/**
 * number definition 3 bytes
 *
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint24 extends Uint8Array {
    /**
     * @param {number} v
     */
    static of(v: number): Uint24;
    
    /**
     * get value from 24 bits
     * @param {Uint8Array} octet -
     * @return {number} */
    static toValue(octet: Uint8Array): number;
    /**
     * @param {number} int
     */
    constructor(int: number);
    /**
     * @returns {number}
     */
    value(): number;
}
/**
 * number definition 4 byte
 *
 * https://datatracker.ietf.org/doc/html/rfc8446#section-3.3
 */
export class Uint32 extends Uint8Array {
    /**
     * @param {number} v
     */
    static of(v: number): Uint32;
    
    /**
     * get value from 32 bits
     * @param {Uint8Array} octet -
     * @return {number} */
    static toValue(octet: Uint8Array): number;
    /**
     *
     * @param {number} int
     */
    constructor(int: number);
    /**
     *
     * @returns {number}
     */
    value(): number;
}
/**
 * Enum in Javascript
 */
export class Enum {
    /**
     * @param {{string:number}} object
     * @param {number} max - positive integer or Uint8Array
     * @param {Function} _class - class to wrap the value
     */
    static a(object: {
        string: number;
    }, max?: number, _class?: Function): Enum;
    static max: symbol;
    static class: symbol;
    /**
     * @param {{string:number}} object
     * @param {number} max - positive integer or Uint8Array
     * @param {Function} _class - class to wrap the value
     */
    constructor(object: {
        string: number;
    }, max?: number, _class?: Function);
    /**
     * return keys or properties
     * @returns {any[]} [any]
     */
    keys(): any[];
    /**
     * return values
     * @returns {any[]} [any]
     */
    values(): any[];
    /**
     * return key for value supplied or null if not found
     * @param {any} value
     * @returns {any} key
     */
    key(value: any): any;
    /**
     * return value for key supplied or null if not found
     * @param {any} key
     * @returns {any} value
     */
    value(key: any): any;
    maxvalue(): any;
    #private;
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
    static Uint8(v: number): Uint8;
    /**
     *
     * @param {number} v
     * @returns {Uint16}
     */
    static Uint16(v: number): Uint16;
    /**
     *
     * @param {number} v
     * @returns {Uint24}
     */
    static Uint24(v: number): Uint24;
    /**
     *
     * @param {number} v
     * @returns {Uint32}
     */
    static Uint32(v: number): Uint32;
}
