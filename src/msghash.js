// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/msghash.d.ts"

import { uint8array } from "./deps.js";
import { Handshake } from "./handshake.js";

/**
 * return messageHash using specified hash algorithm
 * @extends {Uint8Array}
 */
export class MessageHash extends Uint8Array {
   /**
    * @param {Uint8Array} msg 
    * @return
    */
   static async SHA256(msg) {
      msg = uint8array(msg)
      const buffer = await crypto.subtle.digest({ name: "SHA-256" }, msg)
      return {
         /**@type {ArrayBuffer} buffer - description */
         buffer,
         messageHash: new MessageHash(buffer)
      }
   }
   /**
    * @param {Uint8Array} msg 
    * @return
    */
   static async SHA384(msg) {
      msg = uint8array(msg)
      const buffer = await crypto.subtle.digest({ name: "SHA-384" }, msg)
      return {
         /**@type {ArrayBuffer} buffer - description */
         buffer,
         messageHash: new MessageHash(buffer)
      }
   }
   /**
    * @param {Uint8Array} msg 
    * @return
    */
   static async SHA512(msg) {
      msg = uint8array(msg)
      const buffer = await crypto.subtle.digest({ name: "SHA-512" }, msg)
      return {
         /**@type {ArrayBuffer} buffer - description */
         buffer,
         messageHash: new MessageHash(buffer)
      }
   }

   payload = this.wrap
   handshake = this.wrap
   /**
    * 
    * @param {ArrayBuffer} msg 
    */
   constructor(msg) { super(msg) }
   /**
    * 
    * @return {Handshake} message
    */
   wrap() {
      return Handshake.message_hash(this)
   }
}

//npx -p typescript tsc ./src/msghash.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist