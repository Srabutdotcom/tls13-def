/**
 * HandshakeType
 *
 * @extends {Uint8}
 */
export class HandshakeType extends Uint8 {
    get klas(): TypeError | typeof ClientHello | typeof ServerHello | typeof NewSessionTicket | typeof KeyUpdate | typeof EncryptedExtensions | typeof CertificateRequest | typeof Certificate | typeof CertificateVerify | typeof Finished;
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
    static typesDesc: {
        /**@type {0} hello_request_RESERVED */
        hello_request_RESERVED: 0;
        /**@type {1} client_hello */
        client_hello: 1;
        /**@type {2} server_hello */
        server_hello: 2;
        /**@type {3} hello_verify_request_RESERVED */
        hello_verify_request_RESERVED: 3;
        /**@type {4} new_session_ticket */
        new_session_ticket: 4;
        /**@type {5} end_of_early_data */
        end_of_early_data: 5;
        /**@type {6} hello_retry_request_RESERVED */
        hello_retry_request_RESERVED: 6;
        /**@type {8} encrypted_extensions */
        encrypted_extensions: 8;
        /**@type {11} certificate */
        certificate: 11;
        /**@type {12} server_key_exchange_RESERVED */
        server_key_exchange_RESERVED: 12;
        /**@type {13} certificate_request */
        certificate_request: 13;
        /**@type {14} server_hello_done_RESERVED */
        server_hello_done_RESERVED: 14;
        /**@type {15} certificate_verify */
        certificate_verify: 15;
        /**@type {16} client_key_exchange_RESERVED */
        client_key_exchange_RESERVED: 16;
        /**@type {20} finished */
        finished: 20;
        /**@type {21} certificate_url_RESERVED */
        ertificate_url_RESERVED: 21;
        /**@type {22} certificate_status_RESERVED */
        certificate_status_RESERVED: 22;
        /**@type {23} supplemental_data_RESERVED */
        supplemental_data_RESERVED: 23;
        /**@type {24} key_update */
        key_update: 24;
        /**@type {254} message_hash */
        message_hash: 254;
    };
    /**@type {Handshake.typesDesc} types - value converted to HandshakeType */
    static types: {
        /**@type {0} hello_request_RESERVED */
        hello_request_RESERVED: 0;
        /**@type {1} client_hello */
        client_hello: 1;
        /**@type {2} server_hello */
        server_hello: 2;
        /**@type {3} hello_verify_request_RESERVED */
        hello_verify_request_RESERVED: 3;
        /**@type {4} new_session_ticket */
        new_session_ticket: 4;
        /**@type {5} end_of_early_data */
        end_of_early_data: 5;
        /**@type {6} hello_retry_request_RESERVED */
        hello_retry_request_RESERVED: 6;
        /**@type {8} encrypted_extensions */
        encrypted_extensions: 8;
        /**@type {11} certificate */
        certificate: 11;
        /**@type {12} server_key_exchange_RESERVED */
        server_key_exchange_RESERVED: 12;
        /**@type {13} certificate_request */
        certificate_request: 13;
        /**@type {14} server_hello_done_RESERVED */
        server_hello_done_RESERVED: 14;
        /**@type {15} certificate_verify */
        certificate_verify: 15;
        /**@type {16} client_key_exchange_RESERVED */
        client_key_exchange_RESERVED: 16;
        /**@type {20} finished */
        finished: 20;
        /**@type {21} certificate_url_RESERVED */
        ertificate_url_RESERVED: 21;
        /**@type {22} certificate_status_RESERVED */
        certificate_status_RESERVED: 22;
        /**@type {23} supplemental_data_RESERVED */
        supplemental_data_RESERVED: 23;
        /**@type {24} key_update */
        key_update: 24;
        /**@type {254} message_hash */
        message_hash: 254;
    };
    /**@param {Uint8Array} msg - the message of handshake */
    static client_hello: (msg: Uint8Array) => Handshake;
    /**@param {Uint8Array} msg - the message of handshake */
    static server_hello: (msg: Uint8Array) => Handshake;
    /**@param {Uint8Array} msg - the message of handshake */
    static new_session_ticket: (msg: Uint8Array) => Handshake;
    /**@param {Uint8Array} msg - the message of handshake */
    static end_of_early_data: (msg: Uint8Array) => Handshake;
    /**@param {Uint8Array} msg - the message of handshake */
    static encrypted_extensions: (msg: Uint8Array) => Handshake;
    /**@param {Uint8Array} msg - the message of handshake */
    static certificate: (msg: Uint8Array) => Handshake;
    /**@param {Uint8Array} msg - the message of handshake */
    static certificate_request: (msg: Uint8Array) => Handshake;
    /**@param {Uint8Array} msg - the message of handshake */
    static certificate_verify: (msg: Uint8Array) => Handshake;
    /**@param {Uint8Array} msg - the message of handshake */
    static finished: (msg: Uint8Array) => Handshake;
    /**@param {Uint8Array} msg - the message of handshake */
    static key_update: (msg: Uint8Array) => Handshake;
    /**@param {Uint8Array} msg - the message of handshake */
    static message_hash: (msg: Uint8Array) => Handshake;
    /**
     * @param {Uint8Array} message - with additional "type" property
     * @param {HandshakeType} type - description
     */
    static a(message: Uint8Array, type: HandshakeType): Handshake;
    static sequence: {
        name: string;
        /**
         * @param {Uint8Array} content
         * @param {number} length
         * @param {HandshakeType} type
         * @return
         */
        value(content: Uint8Array, length: number, type: HandshakeType): any;
    }[];
    /**
     * parse a Content or Handshake
     * @param {Uint8Array} content - Content or Handshake
     * @return {Handshake} Handshake data structure
     */
    static parse(content: Uint8Array): Handshake;
    /**
     * @param {Uint8Array} message - with additional "type" property
     * @param {HandshakeType} type - description
     */
    constructor(message: Uint8Array, type: HandshakeType);
    /**
     * @return { HandshakeType }
     */
    get type(): HandshakeType;
    get handshakeLength(): Uint8Array;
    /**
     * return message
     */
    get message(): Uint8Array;
    #private;
}
import { Uint8 } from "../src/base.js";
import { ClientHello } from "../src/clienthello.js";
import { ServerHello } from "../src/serverhello.js";
import { KeyUpdate } from "../src/update.js";
import { EncryptedExtensions, CertificateRequest } from "../src/params.js";
import { Certificate } from "../src/auth.js";
import { CertificateVerify } from "../src/auth.js";
import { Finished } from "../src/auth.js";
import { Struct } from "../src/base.js";
import { NewSessionTicket } from "../src/ticket.js";

