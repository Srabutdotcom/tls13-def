import { Struct } from "./base.js"
import { TLSContentType } from "./contentype.js";
import { ProtocolVersion } from "./keyexchange.js";
import { Byte } from "./deps.js"
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
   /** @type {Uint8Array} header - [23, 3, 3, Length]    */
   header
   /**
    * 
    * @param {Uint8Array} encryptedRecord 
    */
   static a(encryptedRecord) { return new TLSCiphertext(encryptedRecord) }
   /**
    * 
    * @param {Uint8Array} encryptedRecord 
    */
   constructor(encryptedRecord) {
      const length = new Uint16(encryptedRecord.length);
      super(
         TLSContentType.TYPES.APPLICATION_DATA, /* type.application_data[23] */
         ProtocolVersion.version.legacy, /* TLS v1.2 */
         length, //*uint16
         encryptedRecord
      )
      this.encryptedRecord = encryptedRecord;
      this.header = concat(TLSContentType.TYPES.APPLICATION_DATA, ProtocolVersion.version.legacy, length)
   }
   
   /**
    * return TLSCiphertext - APPLICATION_DATA
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {TLSCiphertext}
    */
   static parse(octet) {
      let offset = 0;
      const _type = TLSContentType.fromArray(octet.subarray(offset, 1)); offset += 1;
      const _version = ProtocolVersion.fromUint8Array(octet.subarray(offset, offset + 2)); offset += 2;
      const length = Byte.get.BE.b16(octet.subarray(offset, offset + 2)); offset += 2;
      const encryptedRecord = octet.subarray(offset, offset + length);
      return TLSCiphertext.a(encryptedRecord);
   }
}

TLSContentType.register(TLSContentType.TYPES.APPLICATION_DATA, TLSCiphertext.parse)

// npx -p typescript tsc ./src/tlsciphertext.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist
