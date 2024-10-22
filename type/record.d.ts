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
     * @param {ContentType} type
     * @return {TLSPlaintext}
     */
    static a(fragment: Uint8Array, type: ContentType): TLSPlaintext;
    static sequence: {
        name: string;
        /**
         *
         * @param {Uint8Array} record
         * @param {number} length
         * @param {ContentType} type
         * @returns
         */
        value(record: Uint8Array, length: number, type: ContentType): any;
    }[];
    /**
     * parse a Record or TLSPlaintext
     * @param {Uint8Array} record - Record or TLSPlaintext
     * @return {TLSPlaintext} TLSPlaintext data structure
     */
    static parse(record: Uint8Array): TLSPlaintext;
    /**
     * @param {Uint8Array} fragment - the data being transmitted
     * @param {ContentType} type - description
     *
     * In order to maximize backward
       compatibility, a record containing an initial ClientHello SHOULD have
       version 0x0301 (reflecting TLS 1.0) and a record containing a second
       ClientHello or a ServerHello MUST have version 0x0303 (reflecting
       TLS 1.2).
     */
    constructor(fragment: Uint8Array, type: ContentType);
    /**
     * @return {ContentType}
     */
    get type(): ContentType;
    get fragment(): Uint8Array;
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
 * Application Data
 *
 * encryptedRecord wrapper
 * ```
 * struct {
      ContentType opaque_type = application_data;  23
      ProtocolVersion legacy_record_version = 0x0303;  TLS v1.2
      uint16 length;
      opaque encrypted_record[TLSCiphertext.length];
   } TLSCiphertext;
   ```
   https://datatracker.ietf.org/doc/html/rfc8446#section-5.2
   @extends {Struct}
 */
export class TLSCiphertext extends Struct {
    /**
     *
     * @param {Uint8Array} encryptedRecord
     */
    static a(encryptedRecord: Uint8Array): TLSCiphertext;
    /**
     *
     * @param {Uint8Array} encryptedRecord
     */
    constructor(encryptedRecord: Uint8Array);
    /** @type {Uint8Array} header - [23, 3, 3, Length]    */
    header: Uint8Array;
    encryptedRecord: Uint8Array;
}

/**
 * Wrapper to TLSPlaintext.types value
 * @extends {Uint8}
 */
declare class ContentType extends Uint8 {
    get klas(): typeof Alert | typeof Handshake | typeof ChangeCipherSpec | typeof TLSCiphertext;
    get name(): "Invalid" | "ChangeCipherSpec" | "Alert" | "Handshake" | "TLSCiphertext";
    toString(): "Invalid" | "ChangeCipherSpec" | "Alert" | "Handshake" | "TLSCiphertext";
}
/**
 * ChangeCipherSpec
 * ```
 * produce Uint8[1]
 * ```
 * https://www.rfc-editor.org/rfc/rfc5246#section-7.1
 * @extends {Uint8}
 */
declare class ChangeCipherSpec extends Uint8 {
    static a(): ChangeCipherSpec;
    constructor();
}
import { Uint8, Struct } from "../src/base.js";
import { Alert } from "../src/alert.js";
import { Handshake } from "../src/handshake.js";
export {};
