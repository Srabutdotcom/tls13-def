// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/record.d.ts"
/**
 * !SECTION B.1.  Record Layer
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.1
 * *DONE - verified
 */

import { Enum, Struct, Uint16, Uint8 } from "./base.js";
import { ProtocolVersion } from "./keyexchange.js"
import { concat } from "@aicone/byte"

/**
 * Wrapper to TLSPlaintext.types value
 */
class ContentType extends Uint8 {
   /**
    * 
    * @param {number} value 
    */
   constructor(value) { super(value) }
}

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
   static types = {
      /**@type {0} invalid - description */
      invalid: 0,
      /**@type {20} change_cipher_spec - description */
      change_cipher_spec: 20,
      /**@type {21} alert - description */
      alert: 21,
      /**@type {22} handshake - description */
      handshake: 22,
      /**@type {23} application_data - description */
      application_data: 23,
      /**@type {24} heartbeat - description */
      heartbeat: 24, /* RFC 6520 */
      [Enum.max]: 255,
      [Enum.class]: ContentType
   }
   /**
    * A static enum representing type of content
    * @static
    * @enum { Uint8 }
    */
   static contentType = new Enum(TLSPlaintext.types)
   /**
    * 
    * @param {Uint8Array} fragment 
    * @returns 
    */
   static alert = function (fragment) { return new TLSPlaintext(fragment, TLSPlaintext.contentType.alert) }
   /**
    * 
    * @param {Uint8Array} fragment 
    * @returns 
    */
   static application_data = function (fragment) { return new TLSPlaintext(fragment, TLSPlaintext.contentType.application_data) }
   /**
    * 
    * @param {ChangeCipherSpec} payload 
    * @returns {TLSPlaintext}
    */
   static change_cipher_spec = function (payload = ChangeCipherSpec.new()) { return new TLSPlaintext(payload, TLSPlaintext.contentType.change_cipher_spec) }
   /**
    * 
    * @param {Uint8Array} msg 
    * @returns 
    */
   static handshake = function (msg) { return new TLSPlaintext(msg.wrap(), TLSPlaintext.contentType.handshake) }
   /**
    * 
    * @param {Uint8Array} fragment 
    * @returns 
    */
   static heartbeat = function (fragment) { return new TLSPlaintext(fragment, TLSPlaintext.contentType.heartbeat) }
   /**
    * 
    * @param {Uint8Array} fragment 
    * @returns 
    */
   static invalid = function (fragment) { return new TLSPlaintext(fragment, TLSPlaintext.contentType.invalid) }

   /**
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
   static alert = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.alert, zeros) }
   /**
    * 
    * @param {TLSPlaintext} content 
    * @param {number} zeros 
    * @returns 
    */
   static application_data = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.application_data, zeros) }
   /**
    * 
    * @param {TLSPlaintext} content 
    * @param {number} zeros 
    * @returns 
    */
   static change_cipher_spec = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.change_cipher_spec, zeros) }
   /**
    * 
    * @param {TLSPlaintext} content 
    * @param {number} zeros 
    * @returns 
    */
   static handshake = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.handshake, zeros) }
   /**
    * 
    * @param {TLSPlaintext} content 
    * @param {number} zeros 
    * @returns 
    */
   static heartbeat = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.heartbeat, zeros) }
   /**
    * 
    * @param {TLSPlaintext} content 
    * @param {number} zeros 
    * @returns 
    */
   static invalid = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.invalid, zeros) }

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
   /** @type {Uint8Array} header - [23, 3, 3, Length]    */
   header
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

/**
 * ChangeCipherSpec 
 * ```
 * produce Uint8[1]
 * ```
 * https://www.rfc-editor.org/rfc/rfc5246#section-7.1
 */
class ChangeCipherSpec extends Uint8 {
   static new() { return new ChangeCipherSpec }
   constructor() {
      super(1)
   }
}

// npx -p typescript tsc record.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ../type
