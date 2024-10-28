/**
 * TLS1.3 Record data format
 * ```
 * struct {
      ContentType type;
      ProtocolVersion legacy_record_version;
      uint16 length;
      opaque fragment[TLSPlaintext.length];
   } TLSPlaintext;
   ```
   @extends {Struct}
 */
   export class TLSPlaintext extends Struct {
    /**
     * A static enum representing type of content
     * @static
     * @enum { number }
     */
    static types: {
        /**@type {0} invalid - description */
        invalid: 0;
        /**@type {20} change_cipher_spec - description */
        change_cipher_spec: 20;
        /**@type {21} alert - description */
        alert: 21;
        /**@type {22} handshake - description */
        handshake: 22;
        /**@type {23} application_data - description */
        application_data: 23;
        /**@type {24} heartbeat - description */
        heartbeat: 24;
    };
    /**@type {TLSPlaintext.types} contentType - in the form of ContentType */
    static contentType: {
        /**@type {0} invalid - description */
        invalid: 0;
        /**@type {20} change_cipher_spec - description */
        change_cipher_spec: 20;
        /**@type {21} alert - description */
        alert: 21;
        /**@type {22} handshake - description */
        handshake: 22;
        /**@type {23} application_data - description */
        application_data: 23;
        /**@type {24} heartbeat - description */
        heartbeat: 24;
    };
    /**
     *
     * @param {Uint8Array} fragment
     * @returns
     */
    static alert: (fragment: Uint8Array) => TLSPlaintext;
    /**
     *
     * @param {Uint8Array} fragment
     * @returns
     */
    static application_data: (fragment: Uint8Array) => TLSPlaintext;
    /**
     *
     * @param {ChangeCipherSpec} payload
     * @returns {TLSPlaintext}
     */
    static change_cipher_spec: (payload?: ChangeCipherSpec) => TLSPlaintext;
    /**
     *
     * @param {Uint8Array} msg
     * @returns
     */
    static handshake: (msg: Uint8Array) => TLSPlaintext;
    /**
     *
     * @param {Uint8Array} fragment
     * @returns
     */
    static heartbeat: (fragment: Uint8Array) => TLSPlaintext;
    /**
     *
     * @param {Uint8Array} fragment
     * @returns
     */
    static invalid: (fragment: Uint8Array) => TLSPlaintext;
    /**
     * @param {Uint8Array} fragment
     * @param {TLSContentType} type
     * @return {TLSPlaintext}
     */
    static a(fragment: Uint8Array, type: TLSContentType): TLSPlaintext;
    /**
     * parse a Record or TLSPlaintext
     * @param {Uint8Array} record - Record or TLSPlaintext
     * @return {TLSPlaintext} TLSPlaintext data structure
     */
    static parse(record: Uint8Array): TLSPlaintext;
    /**
     * @param {Uint8Array} fragment - the data being transmitted
     * @param {TLSContentType} type - description
     *
     * In order to maximize backward
       compatibility, a record containing an initial ClientHello SHOULD have
       version 0x0301 (reflecting TLS 1.0) and a record containing a second
       ClientHello or a ServerHello MUST have version 0x0303 (reflecting
       TLS 1.2).
     */
    constructor(fragment: Uint8Array, type: TLSContentType);
    /**
     * @return {TLSContentType}
     */
    get type(): TLSContentType;
    get version(): Uint8Array;
    get recordLength(): Uint8Array;
    get fragment(): Uint8Array;
    get message(): any;
    #private;
}
/**
 * content wrapper to be encrypted
 *
 * ```
 * struct {
      opaque content[TLSPlaintext.length];
      ContentType type;
      uint8 zeros[length_of_padding];
   } TLSInnerPlaintext;
   ```
   https://datatracker.ietf.org/doc/html/rfc8446#section-5.2
   @extends {Struct}
 */
export class TLSInnerPlaintext extends Struct {
    /**
     *
     * @param {Uint8Array} content
     * @param {number} zeros
     * @returns
     */
    static alert: (content: Uint8Array, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {Uint8Array} content
     * @param {number} zeros
     * @returns
     */
    static application_data: (content: Uint8Array, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {Uint8Array} content
     * @param {number} zeros
     * @returns
     */
    static change_cipher_spec: (content: Uint8Array, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {Uint8Array} content
     * @param {number} zeros
     * @returns
     */
    static handshake: (content: Uint8Array, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {Uint8Array} content
     * @param {number} zeros
     * @returns
     */
    static heartbeat: (content: Uint8Array, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {Uint8Array} content
     * @param {number} zeros
     * @returns
     */
    static invalid: (content: Uint8Array, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {Uint8Array} content
     * @param {ContentType} type
     * @param {number} zeros - the number of zero's length
     */
    constructor(content: Uint8Array, type: ContentType, zeros: number);
}

/**
 * Wrapper to TLSPlaintext.types value
 * @extends {Uint8}
 */
declare class ContentType extends Uint8 {
    get klas(): any;
    get name(): "Invalid" | "ChangeCipherSpec" | "Alert" | "Handshake" | "TLSCiphertext";
    toString(): "Invalid" | "ChangeCipherSpec" | "Alert" | "Handshake" | "TLSCiphertext";
}

import { Uint8, Struct } from "../src/base.js";
import { ChangeCipherSpec } from "../src/changecipherspec.js";
import { TLSContentType } from "../src/contentype.js";
export {};
