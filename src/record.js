/**
 * !SECTION B.1.  Record Layer
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.1
 * *DONE - verified
 */

import { Enum, legacy_version, Struct, Uint16, Uint8 } from "./mod.js";
import { concat } from "@aicone/byte"

const contentType = {
   /**@type {0} invalid */
   invalid: 0,
   /**@type {20} change_cipher_spec */
   change_cipher_spec: 20,
   /**@type {21} alert */
   alert: 21,
   /**@type {22} handshake */
   handshake: 22,
   /**@type {23} application_data */
   application_data: 23,
   /**@type {24} heartbeat */
   heartbeat: 24, /* RFC 6520 */
   /**@type {255} [Enum.max] */
   [Enum.max]: 255
}
/**
 * @type {contentType} ContentType - type of content
 */
export const ContentType = new Enum(contentType)
/**
 * TLSPlaintext
 */
export class TLSPlaintext extends Struct {
   /**
    * 
    * @param {Uint8Array} fragment - the data being transmitted
    */
   constructor(fragment) {
      fragment = fragment_(fragment);
      const length = new Uint16(fragment.length)
      super(
         fragment.type,
         legacy_version, //*uint16
         length, //*uint16
         fragment
      )
   }
}

function fragment_(fragment) {
   const { type } = fragment
   if (!type) throw TypeError(`Fragment doesn't have type`);
   if (ContentType.keys().includes(type) == false) throw TypeError(`Unknown fragment type - ${type}`);
   return fragment;
}

/**
 * TLSPlaintext format to be encrypted
 */
export class TLSInnerPlaintext extends Struct {
   /**
    * 
    * @param {TLSPlaintext} content 
    * @param {string|number} contentType 
    * @param {number} zeros 
    */
   constructor(content, contentType, zeros) {
      content = content_(content)
      contentType = contentType_(contentType);
      zeros = zeros_(zeros)
      const args = [content, contentType]
      if (zeros && zeros.length) args.push(zeros)
      super(...args)
   }
}

function content_(content) {
   if (content instanceof TLSPlaintext == false) throw TypeError(`Content must be TLSPlaintext class`);
   return content
}

function contentType_(type) {
   const typeOf = typeof type
   if (typeOf == "number" && (ContentType.values().includes(type) == false)) throw TypeError(`Uknown type - ${type}`);
   if (typeOf == "string" && (ContentType.keys().includes(type) == false)) throw TypeError(`Uknown type - ${type}`);
   return new Uint8(type)
}

function zeros_(length) {
   if (length) return new Uint8Array(length);
   return false
}

/**
 * Application data contain encryptedRecord
 */
export class TLSCiphertext extends Struct {
   /**
    * 
    * @param {Uint8Array} encryptedRecord 
    */
   constructor(encryptedRecord) {
      const length = new Uint16(encryptedRecord.length);
      super(
         new Uint8(23), /* ContentType.application_data[23] */
         legacy_version, /* TLS v1.2 */
         length, //*uint16
         encryptedRecord
      )
      this.encryptedRecord = encryptedRecord;
      this.header = concat(new Uint8(23), legacy_version, length)
   }
}
/**@type { Uint8Array([20, 3, 3, 0, 1, 1]) } ChangeCipherSpec*/
export const ChangeCipherSpec = new Uint8Array([20, 3, 3, 0, 1, 1]) 