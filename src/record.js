// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/record.d.ts"
/**
 * !SECTION B.1.  Record Layer
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.1
 * *DONE - verified
 */

import { Alert } from "./alert.js";
import { Enum, Struct, Uint16, Uint8 } from "./base.js";
import { Handshake, HandshakeType } from "./handshake.js";
import { ProtocolVersion } from "./keyexchange.js"
import { Byte, concat } from "./deps.js"
import { Random } from "./keyexchange.js";
import { CipherSuites } from "./keyexchange.js";

/**
 * Wrapper to TLSPlaintext.types value
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
   }
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
         name: "content",
         /**
          * 
          * @param {Uint8Array} record 
          * @param {number} length 
          * @param {ContentType} type 
          * @returns 
          */
         value(record, length, type) {
            const content = record.subarray(5, length);
            return type.klas.parse(content)
         }
      }
   ]
   /**
    * parse a Record or TLSPlaintext
    * @param {Uint8Array} record - Record or TLSPlaintext 
    * @return {parsed} TLSPlaintext data structure
    */
   static parse(record) {
      const data = { record }
      let offset = 0;
      for (const { name, value } of TLSPlaintext.sequence) {
         data[name] = value(record, data['length'], data['type']);
         offset += data[name].length
      }
      return data
      //return new TLSPlaintext(data['content'], data['type'])
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
 */
class ChangeCipherSpec extends Uint8 {
   static a() { return new ChangeCipherSpec }
   constructor() {
      super(1)
   }
}

var parsed = {
   record : new Uint8Array,
   type : new ContentType(22),
   version : ProtocolVersion.legacy,
   length : 0,
   content: {
      content: new Uint8Array,
      type: new HandshakeType(1),
      length: 0,
      message: {
         message: new Uint8Array,
         version: ProtocolVersion.legacy,
         random: Random.a(),
         sessionId: new Uint8Array,
         ciphers: CipherSuites.a(),
         compression: new Uint8Array([1,0]),
         extensions: {
            server_name: [],
            renegotiation_info: new Uint8Array,
            key_share: [],
            psk_key_exhange_modes : new Uint8Array,
            session_ticket: new Uint8Array,
            signature_algorithms: [],
            supported_groups: [],
            supported_versions: new Uint8Array,
         }
      }
   }
}

// npx -p typescript tsc record.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ../type
