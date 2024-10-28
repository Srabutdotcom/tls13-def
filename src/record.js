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
import { Byte } from "./deps.js"
import { ChangeCipherSpec } from "./changecipherspec.js";
import { TLSContentType } from "./contentype.js";

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
   static alert = function (fragment) { return new TLSPlaintext(fragment, TLSContentType.ALERT) }
   /**
    * 
    * @param {Uint8Array} fragment 
    * @returns 
    */
   static application_data = function (fragment) { return new TLSPlaintext(fragment, TLSContentType.APPLICATION_DATA) }
   /**
    * 
    * @param {ChangeCipherSpec} payload 
    * @returns {TLSPlaintext}
    */
   static change_cipher_spec = function (payload = ChangeCipherSpec.a()) { return new TLSPlaintext(payload, TLSContentType.CHANGE_CIPHER_SPEC) }
   /**
    * 
    * @param {Uint8Array} msg 
    * @returns 
    */
   static handshake = function (msg) { return new TLSPlaintext(msg.wrap(), TLSContentType.HANDSHAKE) }
   /**
    * 
    * @param {Uint8Array} fragment 
    * @returns 
    */
   static heartbeat = function (fragment) { return new TLSPlaintext(fragment, TLSContentType.HEARTBEAT) }
   /**
    * 
    * @param {Uint8Array} fragment 
    * @returns 
    */
   static invalid = function (fragment) { return new TLSPlaintext(fragment, TLSContentType.INVALID) }

   /**
    * @param {Uint8Array} fragment 
    * @param {TLSContentType} type 
    * @return {TLSPlaintext} 
    */
   static a(fragment, type) { return new TLSPlaintext(fragment, type) }

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
    * @return {TLSContentType} 
    */
   get type() { return this.member[0] }
   get version() { return this.member[1] }
   get recordLength() { return this.member[2] }
   get fragment() { return this.#fragment }
   get message() { return this.fragment.message }

   /**
    * parse a Record or TLSPlaintext
    * @param {Uint8Array} record - Record or TLSPlaintext 
    * @return {TLSPlaintext} TLSPlaintext data structure
    */
   static parse(record) {
      let offset = 0;
      const type = TLSContentType.fromUint8Array(record.subarray(offset, 1)); offset += type.length;
      const version = ProtocolVersion.fromUint8Array(record.subarray(offset, offset + 2)); offset += version.length
      const length = Byte.get.BE.b16(record.subarray(offset, offset+2)); offset += 2
      const fragment = type.parser(record.subarray(offset, offset+length)); offset+=length;
      return TLSPlaintext.a(fragment, type)
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



// npx -p typescript tsc ./src/record.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist
