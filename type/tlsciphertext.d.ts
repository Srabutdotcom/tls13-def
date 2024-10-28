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
     * return TLSCiphertext - APPLICATION_DATA
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {TLSCiphertext}
     */
    static parse(octet: Uint8Array): TLSCiphertext;
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
