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
    /**
     *
     * @param {Uint8Array} message - with additional "type" property
     * @param {HandshakeType} type - description
     */
    constructor(message: Uint8Array, type: HandshakeType);
    get sequence(): {
        type: Uint8;
        length: Uint24;
        message: Uint8Array;
    };
}
import { Struct } from "./base.js";
import { Uint8 } from "./base.js";
import { Uint24 } from "./base.js";
declare class HandshakeType extends Uint8 {
    constructor(v: any);
}
export {};
