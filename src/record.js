// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/record.d.ts"
/**
 * !SECTION B.1.  Record Layer
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.1
 * *DONE - verified
 */

import { Alert } from "./alert.js";
import { Enum, Struct, Uint16, Uint8 } from "./base.js";
import { Handshake } from "./handshake.js";
import { ProtocolVersion } from "./keyexchange.js"
import { Byte, concat } from "./deps.js"


/**
 * Wrapper to TLSPlaintext.types value
 * @extends {Uint8}
 */
class ContentType extends Uint8 {
   /**
    * 
    * @param {number} value 
    */
   constructor(value) { super(value) }
   get klas() {
      switch (this.value()) {
         case 20: return ChangeCipherSpec
         case 21: return Alert
         case 22: return Handshake
         case 23: return TLSCiphertext // Application Data
         default: return Handshake
      }
   }
   get name() {
      switch (this.value()) {
         case 0: return 'Invalid'
         case 20: return 'ChangeCipherSpec'
         case 21: return 'Alert'
         case 22: return 'Handshake'
         case 23: return 'TLSCiphertext' // Application Data
         default: return 'Invalid'
      }
   }
   toString() { return this.name }
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
   @extends {Struct}
 */
export class TLSPlaintext extends Struct {
   #fragment
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

   }
   /**@type {TLSPlaintext.types} contentType - in the form of ContentType */
   static contentType = new Enum(TLSPlaintext.types, 255, ContentType)
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
   static change_cipher_spec = function (payload = ChangeCipherSpec.a()) { return new TLSPlaintext(payload, TLSPlaintext.contentType.change_cipher_spec) }
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
    * @param {Uint8Array} fragment 
    * @param {ContentType} type 
    * @return {TLSPlaintext} 
    */
   static a(fragment, type) { return new TLSPlaintext(fragment, type) }

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
   constructor(fragment, type) {
      const length = new Uint16(fragment.length)
      super(
         type, //*uint8
         // ClientHello - fragment[0] == 1
         fragment[0] == 1 ? ProtocolVersion.version.TLS10 : ProtocolVersion.version.legacy, //*uint16
         length, //*uint16
         fragment
      )
      this.#fragment = fragment
   }
   /**
    * @return {ContentType} 
    */
   get type() { return this.member[0] }
   get version() { return this.member[1] }
   get recordLength() { return this.member[2] }
   get fragment() { return this.#fragment }
   get message() { return this.fragment.message }
   static sequence = [
      {
         name: "type",
         value(record) {
            const value = Byte.get.BE.b8(record);
            const type = TLSPlaintext.contentType.key(value);
            if (!type) throw TypeError(`illegal_parameter - Unexpected content type - ${value}`)
            return new ContentType(value)
         }
      },
      {
         name: "version",
         value(record) {
            const value = Byte.get.BE.b16(record, 1);
            //for now skip version checking
            return ProtocolVersion.a(value)
         }
      },
      {
         name: "length",
         value(record) {
            return Byte.get.BE.b16(record, 3);
         }
      },
      {
         name: "fragment",
         /**
          * 
          * @param {Uint8Array} record 
          * @param {number} length 
          * @param {ContentType} type 
          * @returns 
          */
         value(record, length, type) {
            const content = record.subarray(5, 5 + length);
            return type.klas.parse(content)
         }
      }
   ]
   /**
    * parse a Record or TLSPlaintext
    * @param {Uint8Array} record - Record or TLSPlaintext 
    * @return {TLSPlaintext} TLSPlaintext data structure
    */
   static parse(record) {
      const data = {}
      let offset = 0;
      for (const { name, value } of TLSPlaintext.sequence) {
         data[name] = value(record, data['length'], data['type']);
         offset += data[name].length
      }
      return TLSPlaintext.a(data['fragment'], data['type'])
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
   @extends {Struct}
 */
export class TLSInnerPlaintext extends Struct {
   /**
    * 
    * @param {Uint8Array} content 
    * @param {number} zeros 
    * @returns 
    */
   static alert = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.alert, zeros) }
   /**
    * 
    * @param {Uint8Array} content 
    * @param {number} zeros 
    * @returns 
    */
   static application_data = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.application_data, zeros) }
   /**
    * 
    * @param {Uint8Array} content 
    * @param {number} zeros 
    * @returns 
    */
   static change_cipher_spec = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.change_cipher_spec, zeros) }
   /**
    * 
    * @param {Uint8Array} content 
    * @param {number} zeros 
    * @returns 
    */
   static handshake = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.handshake, zeros) }
   /**
    * 
    * @param {Uint8Array} content 
    * @param {number} zeros 
    * @returns 
    */
   static heartbeat = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.heartbeat, zeros) }
   /**
    * 
    * @param {Uint8Array} content 
    * @param {number} zeros 
    * @returns 
    */
   static invalid = function (content, zeros) { return new TLSInnerPlaintext(content, TLSPlaintext.contentType.invalid, zeros) }

   /**
    * 
    * @param {Uint8Array} content 
    * @param {ContentType} type 
    * @param {number} zeros - the number of zero's length
    */
   constructor(content, type, zeros) {
      type = contentType_(type);
      zeros = zeros_(zeros)
      const args = [content, type]
      if (zeros && zeros.length) args.push(zeros)
      super(...args)
   }
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
 * @extends {Uint8}
 */
class ChangeCipherSpec extends Uint8 {
   static a() { return new ChangeCipherSpec }
   constructor() {
      super(1)
   }
}


// npx -p typescript tsc ./src/record.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist
