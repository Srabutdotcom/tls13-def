import { uint8array } from "./dep.js";

/**
 * return messageHash using specified hash algorithm
 */
export class MessageHash extends Uint8Array {
   static {
      this.SHA256= async function(msg){
         msg = uint8array(msg)
         const buffer = await crypto.subtle.digest({name:"SHA-256"}, msg) 
         return {
            buffer,
            messageHash: new MessageHash(buffer)
         }
      },
      this.SHA384=async function(msg){
         msg = uint8array(msg)
         const buffer = await crypto.subtle.digest({name:"SHA-384"}, msg)
         return {
            buffer,
            messageHash: new MessageHash(buffer)
         }
      },
      this.SHA512=async function(msg){
         msg = uint8array(msg)
         const buffer = await crypto.subtle.digest({name:"SHA-512"}, msg)
         return {
            buffer,
            messageHash: new MessageHash(buffer)
         }
      }
   }
   /**
    * 
    * @param {ArrayBuffer} msg 
    */
   constructor(msg){super(msg)}
}

