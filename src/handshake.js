/**
 * !SECTION B.3.  Handshake Protocol
 * LINK - static https=//datatracker.ietf.org/doc/html/rfc8446#appendix-B.3
 * *DONE - verified
 */

import { Struct, Uint24, Uint8, Enum, ContentType } from "./mod.js"

const handshakeType = {
   /**@type {0} hello_request_RESERVED */
   hello_request_RESERVED: 0,
   /**@type {1} client_hello */
   client_hello: 1,//*Key Exchange
   /**@type {2} server_hello */
   server_hello: 2,//*Key Exchange
   /**@type {3} hello_verify_request_RESERVED */
   hello_verify_request_RESERVED: 3,
   /**@type {4} new_session_ticket */
   new_session_ticket: 4,//*Ticket Establishment
   /**@type {5} end_of_early_data */
   end_of_early_data: 5,//*Updating Keys
   /**@type {6} hello_retry_request_RESERVED */
   hello_retry_request_RESERVED: 6,
   /**@type {8} encrypted_extensions */
   encrypted_extensions: 8,//*Server Parameters Messages
   /**@type {11} certificate */
   certificate: 11,//*Authentication Messages
   /**@type {12} server_key_exchange_RESERVED */
   server_key_exchange_RESERVED: 12,
   /**@type {13} certificate_request */
   certificate_request: 13,//*Server Parameters Messages
   /**@type {14} server_hello_done_RESERVED */
   server_hello_done_RESERVED: 14,
   /**@type {15} certificate_verify */
   certificate_verify: 15,//*Authentication Messages
   /**@type {16} client_key_exchange_RESERVED */
   client_key_exchange_RESERVED: 16,
   /**@type {20} finished */
   finished: 20,//*Authentication Messages
   /**@type {21} certificate_url_RESERVED */
   ertificate_url_RESERVED: 21,
   /**@type {22} certificate_status_RESERVED */
   certificate_status_RESERVED: 22,
   /**@type {23} supplemental_data_RESERVED */
   supplemental_data_RESERVED: 23,
   /**@type {24} key_update */
   key_update: 24,//*Updating Keys
   /**@type {254} message_hash */
   message_hash: 254,
   /**@type {255} [Enum.max] */
   [Enum.max]: 255
}

/**
 * @type {handshakeType} HandshakeType - types of handshake
 */
export const HandshakeType = new Enum(handshakeType)

/**
 * represent Handshake data format
 */
export class Handshake extends Struct {
   type = ContentType.handshake
   /**
    * 
    * @param {Uint8Array} message - with additional "type" property
    */
   constructor(message) {
      message = message_(message)
      const length = new Uint24(message.length);
      super(
         message.type,
         length, //*uint24 
         message
      )
   }
}

function message_(msg) {
   const { type } = msg;
   if (!type) throw TypeError(`msg doesn't have type`);
   if (HandshakeType.keys().includes(type) == false) throw TypeError(`Unknown msg type - ${type}`);
   return msg
}