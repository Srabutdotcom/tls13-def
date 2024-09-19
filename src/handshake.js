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

class HandshakeType extends Uint8 { constructor(v) { super(v) } }

/**
 * struct {
 * 
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
 */
export class Handshake extends Struct {
   static {
      const types = {
         /**@type {Uint8[0]} hello_request_RESERVED */
         hello_request_RESERVED: 0,
         /**@type {Uint8[1]} client_hello */
         client_hello: 1,//*Key Exchange
         /**@type {Uint8[2]} server_hello */
         server_hello: 2,//*Key Exchange
         /**@type {Uint8[3]} hello_verify_request_RESERVED */
         hello_verify_request_RESERVED: 3,
         /**@type {Uint8[4]} new_session_ticket */
         new_session_ticket: 4,//*Ticket Establishment
         /**@type {Uint8[5]} end_of_early_data */
         end_of_early_data: 5,//*Updating Keys
         /**@type {Uint8[6]} hello_retry_request_RESERVED */
         hello_retry_request_RESERVED: 6,
         /**@type {Uint8[8]} encrypted_extensions */
         encrypted_extensions: 8,//*Server Parameters Messages
         /**@type {Uint8[11]} certificate */
         certificate: 11,//*Authentication Messages
         /**@type {Uint8[12]} server_key_exchange_RESERVED */
         server_key_exchange_RESERVED: 12,
         /**@type {Uint8[13]} certificate_request */
         certificate_request: 13,//*Server Parameters Messages
         /**@type {Uint8[14]} server_hello_done_RESERVED */
         server_hello_done_RESERVED: 14,
         /**@type {Uint8[15]} certificate_verify */
         certificate_verify: 15,//*Authentication Messages
         /**@type {Uint8[16]} client_key_exchange_RESERVED */
         client_key_exchange_RESERVED: 16,
         /**@type {Uint8[20]} finished */
         finished: 20,//*Authentication Messages
         /**@type {Uint8[21]} certificate_url_RESERVED */
         ertificate_url_RESERVED: 21,
         /**@type {Uint8[22]} certificate_status_RESERVED */
         certificate_status_RESERVED: 22,
         /**@type {Uint8[23]} supplemental_data_RESERVED */
         supplemental_data_RESERVED: 23,
         /**@type {Uint8[24]} key_update */
         key_update: 24,//*Updating Keys
         /**@type {Uint8[254]} message_hash */
         message_hash: 254,
         /**@type {Uint8[255]} [Enum.max] */
         [Enum.max]: 255,
         [Enum.class]: HandshakeType
      }
      /**
       * @type {types} this.type - description
       */
      this.types = new Enum(types)
      this.client_hello = function (msg) {
         if (msg instanceof ClientHello == true) return new Handshake(msg, this.types.client_hello);
         throw TypeError(`msg is not ClientHello class`)
      }
      this.server_hello = function (msg) {
         if (msg instanceof ServerHello == true) return new Handshake(msg, this.types.server_hello);
         throw TypeError(`msg is not ServerHello class`)
      }
      this.new_session_ticket = function (msg) {
         if (msg instanceof NewSessionTicket == true) return new Handshake(msg, this.types.new_session_ticket);
         throw TypeError(`msg is not NewSessionTicket class`)
      }
      this.end_of_early_data = function (msg) {
         if (msg instanceof EndOfEarlyData == true) return new Handshake(msg, this.types.end_of_early_data);
         throw TypeError(`msg is not EndOfEarlyData class`)
      }
      this.encrypted_extensions = function (msg) {
         if (msg instanceof EncryptedExtensions == true) return new Handshake(msg, types.encrypted_extensions)
         throw TypeError(`msg is not EncryptedExtensions class`)
      }
      this.certificate = function (msg) {
         if (msg instanceof Certificate == true) return new Handshake(msg, this.types.certificate)
         throw TypeError(`msg is not Certificate class`)
      }
      this.certificate_request = function (msg) {
         if (msg instanceof CertificateRequest == true) return new Handshake(msg, this.types.certificate_request)
         throw TypeError(`msg is not CertificateRequest class`)
      }
      this.certificate_verify = function (msg) {
         if (msg instanceof CertificateVerify == true) return new Handshake(msg, this.types.certificate_verify)
         throw TypeError(`msg is not CertificateVerify class`)
      }
      this.finished = function (msg) {
         if (msg instanceof Finished == true) return new Handshake(msg, this.types.finished)
         throw TypeError(`msg is not Finished class`)
      }
      this.key_update = function (msg) {
         if (msg instanceof KeyUpdate == true) return new Handshake(msg, this.types.key_update)
         throw TypeError(`msg is not KeyUpdate class`)
      }
      this.message_hash = function (msg) {
         if (msg instanceof MessageHash == true) return new Handshake(msg, this.types.message_hash)
         throw TypeError(`msg is not MessageHash class`)
      }
   }
   /**
    * 
    * @param {Uint8Array} message - with additional "type" property
    * @param {HandshakeType} type - description
    */
   constructor(message, type) {
      const length = new Uint24(message.length);
      super(
         type,
         length, //*uint24 
         message
      )
   }
   get sequence() {
      return {
         type: new Uint8,
         length: new Uint24,
         message: new Uint8Array
      }
   }
}

