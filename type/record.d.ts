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
 */
export class TLSPlaintext extends Struct {
    /**
     * A static enum representing type of content
     * @static
     * @enum { number }
     */
    static types: {
        [x: symbol]: number | typeof ContentType;
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
     * A static enum representing type of content
     * @static
     * @enum { Uint8 }
     */
    static contentType: Enum;
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
     * @param {Uint8Array} fragment - the data being transmitted
     * @param {ContentType} type - description
     */
    constructor(fragment: Uint8Array, type: ContentType);
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
 */
export class TLSInnerPlaintext extends Struct {
    /**
     *
     * @param {TLSPlaintext} content
     * @param {number} zeros
     * @returns
     */
    static alert: (content: TLSPlaintext, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {TLSPlaintext} content
     * @param {number} zeros
     * @returns
     */
    static application_data: (content: TLSPlaintext, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {TLSPlaintext} content
     * @param {number} zeros
     * @returns
     */
    static change_cipher_spec: (content: TLSPlaintext, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {TLSPlaintext} content
     * @param {number} zeros
     * @returns
     */
    static handshake: (content: TLSPlaintext, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {TLSPlaintext} content
     * @param {number} zeros
     * @returns
     */
    static heartbeat: (content: TLSPlaintext, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {TLSPlaintext} content
     * @param {number} zeros
     * @returns
     */
    static invalid: (content: TLSPlaintext, zeros: number) => TLSInnerPlaintext;
    /**
     *
     * @param {TLSPlaintext} content
     * @param {ContentType} type
     * @param {number} zeros
     */
    constructor(content: TLSPlaintext, type: ContentType, zeros: number);
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
 */
export class TLSCiphertext extends Struct {
    /**
     *
     * @param {Uint8Array} encryptedRecord
     */
    static "new"(encryptedRecord: Uint8Array): TLSCiphertext;
    /**
     *
     * @param {Uint8Array} encryptedRecord
     */
    constructor(encryptedRecord: Uint8Array);
    /** @type {Uint8Array} header - [23, 3, 3, Length]    */
    header: Uint8Array;
    encryptedRecord: Uint8Array;
}
import { Struct } from "../src/base.js";
/**
 * Wrapper to TLSPlaintext.types value
 */
declare class ContentType extends Uint8 {
}
import { Enum } from "../src/base.js";
/**
 * ChangeCipherSpec
 * ```
 * produce Uint8[1]
 * ```
 * https://www.rfc-editor.org/rfc/rfc5246#section-7.1
 */
declare class ChangeCipherSpec extends Uint8 {
    static "new"(): ChangeCipherSpec;
    constructor();
}
import { Uint8 } from "../src/base.js";
export {};
