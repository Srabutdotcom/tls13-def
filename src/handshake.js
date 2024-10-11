// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/handshake.d.ts"

/**
 * !SECTION B.3.  Handshake Protocol
 * LINK - static https=//datatracker.ietf.org/doc/html/rfc8446#appendix-B.3
 * *DONE - verified
 */

import { Struct, Uint24, Uint8, Enum } from "./base.js"
import { ClientHello } from "./clienthello.js"
import { ServerHello } from "./serverhello.js";
import { NewSessionTicket } from "./ticket.js";
import { EndOfEarlyData, KeyUpdate } from "./update.js";
import { CertificateRequest, EncryptedExtensions } from "./params.js";
import { Certificate, CertificateVerify, Finished } from "./auth.js";
import { MessageHash } from "./msghash.js";
import { Byte } from "./deps.js"


/**
 * HandshakeType
 *
 * @extends {Uint8}
 */
export class HandshakeType extends Uint8 {
   /**
    * @param {number} v 
    */
   constructor(v) { super(v) }
   get klas() {
      switch (this.value()) {
         case 1: return ClientHello
         case 2: return ServerHello
         case 4: return NewSessionTicket
         case 5: return EndOfEarlyData
         case 8: return EncryptedExtensions
         case 11: return Certificate
         case 13: return CertificateRequest
         case 15: return CertificateVerify
         case 20: return Finished
         case 24: return KeyUpdate
         default: return TypeError(`Unsupported handshake type ${this.value()}`)
      }
   }
}

/**
 * Handshake
 * ```
 * struct {
      HandshakeType msg_type;    //handshake type
      uint24 length;             //remaining bytes in message
      select (Handshake.msg_type) {
         case client_hello:          ClientHello;
         case server_hello:          ServerHello;
         case end_of_early_data:     EndOfEarlyData;
         case encrypted_extensions:  EncryptedExtensions;
         case certificate_request:   CertificateRequest;
         case certificate:           Certificate;
         case certificate_verify:    CertificateVerify;
         case finished:              Finished;
         case new_session_ticket:    NewSessionTicket;
         case key_update:            KeyUpdate;
      };
   } Handshake;
   ```
   @extends {Struct}
 */
export class Handshake extends Struct {
   #message
   static typesDesc = {
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
   }
   /**@type {Handshake.typesDesc} types - value converted to HandshakeType */
   static types = new Enum(Handshake.typesDesc, 255, HandshakeType)

   /**@param {Uint8Array} msg - the message of handshake */
   static client_hello = function (msg) {
      if (msg instanceof ClientHello == true) return new Handshake(msg, Handshake.types.client_hello);
      throw TypeError(`msg is not ClientHello class`)
   }
   /**@param {Uint8Array} msg - the message of handshake */
   static server_hello = function (msg) {
      if (msg instanceof ServerHello == true) return new Handshake(msg, Handshake.types.server_hello);
      throw TypeError(`msg is not ServerHello class`)
   }
   /**@param {Uint8Array} msg - the message of handshake */
   static new_session_ticket = function (msg) {
      if (msg instanceof NewSessionTicket == true) return new Handshake(msg, Handshake.types.new_session_ticket);
      throw TypeError(`msg is not NewSessionTicket class`)
   }
   /**@param {Uint8Array} msg - the message of handshake */
   static end_of_early_data = function (msg) {
      if (msg instanceof EndOfEarlyData == true) return new Handshake(msg, Handshake.types.end_of_early_data);
      throw TypeError(`msg is not EndOfEarlyData class`)
   }
   /**@param {Uint8Array} msg - the message of handshake */
   static encrypted_extensions = function (msg) {
      if (msg instanceof EncryptedExtensions == true) return new Handshake(msg, types.encrypted_extensions)
      throw TypeError(`msg is not EncryptedExtensions class`)
   }
   /**@param {Uint8Array} msg - the message of handshake */
   static certificate = function (msg) {
      if (msg instanceof Certificate == true) return new Handshake(msg, Handshake.types.certificate)
      throw TypeError(`msg is not Certificate class`)
   }
   /**@param {Uint8Array} msg - the message of handshake */
   static certificate_request = function (msg) {
      if (msg instanceof CertificateRequest == true) return new Handshake(msg, Handshake.types.certificate_request)
      throw TypeError(`msg is not CertificateRequest class`)
   }
   /**@param {Uint8Array} msg - the message of handshake */
   static certificate_verify = function (msg) {
      if (msg instanceof CertificateVerify == true) return new Handshake(msg, Handshake.types.certificate_verify)
      throw TypeError(`msg is not CertificateVerify class`)
   }
   /**@param {Uint8Array} msg - the message of handshake */
   static finished = function (msg) {
      if (msg instanceof Finished == true) return new Handshake(msg, Handshake.types.finished)
      throw TypeError(`msg is not Finished class`)
   }
   /**@param {Uint8Array} msg - the message of handshake */
   static key_update = function (msg) {
      if (msg instanceof KeyUpdate == true) return new Handshake(msg, Handshake.types.key_update)
      throw TypeError(`msg is not KeyUpdate class`)
   }
   /**@param {Uint8Array} msg - the message of handshake */
   static message_hash = function (msg) {
      if (msg instanceof MessageHash == true) return new Handshake(msg, Handshake.types.message_hash)
      throw TypeError(`msg is not MessageHash class`)
   }

   /**
    * @param {Uint8Array} message - with additional "type" property
    * @param {HandshakeType} type - description
    */
   static a(message, type){ return new Handshake(message, type)}

   /**
    * @param {Uint8Array} message - with additional "type" property
    * @param {HandshakeType} type - description
    */
   constructor(message, type) {
      const length = new Uint24(message.length);
      super(
         type, //*uint8 
         length, //*uint24 
         message
      )
      this.#message = message
   }
   /**
    * @return { HandshakeType }
    */
   get type(){return this.member[0]}
   /**
    * return message
    */
   get message(){return this.#message}
   static sequence = [
      {
         name: "type",
         /**
          * @param {Uint8Array} content 
          * @param {number} length 
          * @param {HandshakeType} type 
          * @return 
          */
         value(content) {
            return new HandshakeType(Byte.get.BE.b8(content));
         }
      },
      {
         name: "length",
         /**
          * @param {Uint8Array} content 
          * @param {number} length 
          * @param {HandshakeType} type 
          * @return {number}
          */
         value(content) {
            return Byte.get.BE.b24(content, 1);
         }
      },
      {
         name: "message",
         /**
          * @param {Uint8Array} content 
          * @param {number} length 
          * @param {HandshakeType} type 
          * @return 
          */
         value(content, length, type) {
            const message = content.subarray(4, length); 
            return type.klas.parse(message)
         }
      }
   ]
   /**
    * parse a Content or Handshake
    * @param {Uint8Array} content - Content or Handshake 
    * @return {Handshake} Handshake data structure
    */
   static parse(content) {
      const data = { }
      let offset = 0;
      for (const { name, value } of Handshake.sequence) {
         data[name] = value(content, data['length'], data['type']);
         offset += data[name].length
      }
      return Handshake.a(data['message'], data['type'])
   }
}

// npx -p typescript tsc ./src/handshake.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist