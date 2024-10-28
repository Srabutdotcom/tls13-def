export class TLSContentType extends Uint8 {
    static "__#4@#parser": Map<any, any>;
    static TYPES: {
        INVALID: number;
        CHANGE_CIPHER_SPEC: number;
        ALERT: number;
        HANDSHAKE: number;
        APPLICATION_DATA: number;
        HEARTBEAT: number;
    };
    static TYPES_BY_BYTE: {};
    /**
     * to register parser for specified content type
     *
     * @static
     * @param {number} value - TLSContentType value
     * @param {Function} parser - parser based on each class
     */
    static register(value: number, parser: Function): void;
    /**
     * TLSContentType from byte of number
     *
     * @static
     * @param {number} byte - 0, 20, 21, 22, 23, 24
     * @returns {TLSContentType}
     */
    static fromByte(byte: number): TLSContentType;
    /**
     * TLSContentType from string
     *
     * @static
     * @param {string} name - must be in TLSContentType.TYPES
     * @returns {TLSContentType}
     */
    static fromString(name: string): TLSContentType;
    /**
     * TLSContentType from array
     *
     * @static
     * @param {Array|Uint8Array} array
     * @returns {TLSContentType}
     */
    static fromArray(array: any[] | Uint8Array): TLSContentType;
    /**
     * TLSContentType from Uint8Array
     *
     * @static
     * @param {Uint8Array} uint8array
     * @returns {TLSContentType}
     */
    static fromUint8Array(uint8array: Uint8Array): TLSContentType;
    static get INVALID(): TLSContentType;
    static get CHANGE_CIPHER_SPEC(): TLSContentType;
    static get ALERT(): TLSContentType;
    static get HANDSHAKE(): TLSContentType;
    static get APPLICATION_DATA(): TLSContentType;
    static get HEARTBEAT(): TLSContentType;
    constructor(value: any);
    /**
     * get parser based on content type
     *
     * @param {number} value
     * @returns {Function}
     */
    get parser(): Function;
    0: number;
}
import { Uint8 } from "../src/base.js";
