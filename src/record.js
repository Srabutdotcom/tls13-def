/**
 * !SECTION B.1.  Record Layer
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.1
 * *DONE - verified
 */

import { Enum, Struct, Uint16, Uint8 } from "./base.js";
import { ProtocolVersion } from "./keyexchange.js"
import { concat } from "@aicone/byte"

class ContentType extends Uint8 {
   constructor(value) { super(value) }
}

/**
 * struct {
 * 
          ContentType type;
          ProtocolVersion legacy_record_version;
          uint16 length;
          opaque fragment[TLSPlaintext.length];
      } TLSPlaintext;
 */
export class TLSPlaintext extends Struct {
   static {
      const types = {
         /**@type {Uint8[0]} invalid - description */
         invalid: 0,
         /**@type {Uint8[20]} change_cipher_spec - description */
         change_cipher_spec: 20,
         /**@type {Uint8[21]} alert - description */
         alert: 21,
         /**@type {Uint8[22]} handshake - description */
         handshake: 22,
         /**@type {Uint8[23]} application_data - description */
         application_data: 23,
         /**@type {Uint8[24]} heartbeat - description */
         heartbeat: 24, /* RFC 6520 */
         [Enum.max]: 255,
         [Enum.class]: ContentType
      }
      /**
       * @type {types} this.contentType - description
       */
      this.contentType = new Enum(types)
      this.alert = function (fragment) { return new TLSPlaintext(fragment, this.contentType.alert) }
      this.application_data = function (fragment) { return new TLSPlaintext(fragment, this.contentType.application_data) }
      this.change_cipher_spec = function (fragment) { return new TLSPlaintext(fragment, this.contentType.change_cipher_spec) }
      this.handshake = function (fragment) { return new TLSPlaintext(fragment, this.contentType.handshake) }
      this.heartbeat = function (fragment) { return new TLSPlaintext(fragment, this.contentType.heartbeat) }
      this.invalid = function (fragment) { return new TLSPlaintext(fragment, this.contentType.invalid) }
   }
   /**
    * 
    * @param {Uint8Array} fragment - the data being transmitted
    * @param {ContentType} type - description
    */
   constructor(fragment, type) {
      const length = new Uint16(fragment.length)
      super(
         type,
         ProtocolVersion.version.legacy, //*uint16
         length, //*uint16
         fragment
      )
   }
}

/**
 * struct {
 * 
          opaque content[TLSPlaintext.length];
          ContentType type;
          uint8 zeros[length_of_padding];
      } TLSInnerPlaintext;
 */
export class TLSInnerPlaintext extends Struct {
   static {
      const { contentType } = TLSPlaintext
      this.alert = function (content, zeros) { return new TLSInnerPlaintext(content, contentType.alert, zeros) }
      this.application_data = function (content, zeros) { return new TLSInnerPlaintext(content, contentType.application_data, zeros) }
      this.change_cipher_spec = function (content, zeros) { return new TLSInnerPlaintext(content, contentType.change_cipher_spec, zeros) }
      this.handshake = function (content, zeros) { return new TLSInnerPlaintext(content, contentType.handshake, zeros) }
      this.heartbeat = function (content, zeros) { return new TLSInnerPlaintext(content, contentType.heartbeat, zeros) }
      this.invalid = function (content, zeros) { return new TLSInnerPlaintext(content, contentType.invalid, zeros) }
   }
   /**
    * 
    * @param {TLSPlaintext} content 
    * @param {ContentType} type 
    * @param {number} zeros 
    */
   constructor(content, type, zeros) {
      content = content_(content)
      type = contentType_(type);
      zeros = zeros_(zeros)
      const args = [content, type]
      if (zeros && zeros.length) args.push(zeros)
      super(...args)
   }
}

function content_(content) {
   if (content instanceof TLSPlaintext == false) throw TypeError(`Content must be TLSPlaintext class`);
   return content
}

function contentType_(type) {
   if (type instanceof ContentType) return type
   throw TypeError(`Uknown type - ${type}`);
}

function zeros_(length) {
   length = Number(length)
   if (length && typeof (length) == 'number') return new Uint8Array(length);
   return false
}

/**
 * struct {
 * 
         ContentType opaque_type = application_data;  23 
         ProtocolVersion legacy_record_version = 0x0303;  TLS v1.2 
         uint16 length;
         opaque encrypted_record[TLSCiphertext.length];
   } TLSCiphertext;
 */
export class TLSCiphertext extends Struct {
   /**
    * 
    * @param {Uint8Array} encryptedRecord 
    */
   static new(encryptedRecord) { return new TLSCiphertext(encryptedRecord) }
   /**
    * 
    * @param {Uint8Array} encryptedRecord 
    */
   constructor(encryptedRecord) {
      const length = new Uint16(encryptedRecord.length);
      super(
         TLSPlaintext.contentType.application_data, /* type.application_data[23] */
         ProtocolVersion.version.legacy, /* TLS v1.2 */
         length, //*uint16
         encryptedRecord
      )
      this.encryptedRecord = encryptedRecord;
      this.header = concat(TLSPlaintext.contentType.application_data, ProtocolVersion.version.legacy, length)
   }
}

export function tlsCiphertext(encryptedRecord) { return new TLSCiphertext(encryptedRecord) }

/**@type { Uint8Array([20, 3, 3, 0, 1, 1]) } ChangeCipherSpec*/
export const ChangeCipherSpec = new Uint8Array([20, 3, 3, 0, 1, 1]) 
