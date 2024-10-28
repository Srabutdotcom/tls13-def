/**
 * Alert handshake message
 *
 * @export
 * @class Alert
 * @extends {Struct}
 */
export class Alert extends Struct {
  /**
   * A static enum representing level
   * @static
   * @enum { number }
   */
  static levelCore: {
      /**@type {1} warning */
      warning: 1;
      /**@type {2} fatal */
      fatal: 2;
  };
  /**@type {Alert.levelCore} level - the value converted to AlertLevel class */
  static level: {
      /**@type {1} warning */
      warning: 1;
      /**@type {2} fatal */
      fatal: 2;
  };
  /**
   * A static enum representing description
   * @static
   * @enum { number }
   */
  static desCore: {
      /**@type {0} close_notify */
      close_notify: 0;
      /**@type {10} unexpected_message */
      unexpected_message: 10;
      /**@type {20} bad_record_mac */
      bad_record_mac: 20;
      /**@type {21} decryption_failed_RESERVED */
      decryption_failed_RESERVED: 21;
      /**@type {22} record_overflow */
      record_overflow: 22;
      /**@type {30} decompression_failure_RESERVED */
      decompression_failure_RESERVED: 30;
      /**@type {40} handshake_failure */
      handshake_failure: 40;
      /**@type {41} no_certificate_RESERVED */
      no_certificate_RESERVED: 41;
      /**@type {42} bad_certificate */
      bad_certificate: 42;
      /**@type {43} unsupported_certificate */
      unsupported_certificate: 43;
      /**@type {44} certificate_revoked */
      certificate_revoked: 44;
      /**@type {45} certificate_expired */
      certificate_expired: 45;
      /**@type {46} certificate_unknown */
      certificate_unknown: 46;
      /**@type {47} illegal_parameter */
      illegal_parameter: 47;
      /**@type {48} unknown_ca */
      unknown_ca: 48;
      /**@type {49} access_denied */
      access_denied: 49;
      /**@type {50} decode_error */
      decode_error: 50;
      /**@type {51} decrypt_error */
      decrypt_error: 51;
      /**@type {60} export_restriction_RESERVED */
      export_restriction_RESERVED: 60;
      /**@type {70} protocol_version */
      protocol_version: 70;
      /**@type {71} insufficient_security */
      insufficient_security: 71;
      /**@type {80} internal_error */
      internal_error: 80;
      /**@type {86} inappropriate_fallback */
      inappropriate_fallback: 86;
      /**@type {90} user_canceled */
      user_canceled: 90;
      /**@type {100} no_renegotiation_RESERVED */
      no_renegotiation_RESERVED: 100;
      /**@type {109} missing_extension */
      missing_extension: 109;
      /**@type {110} unsupported_extension */
      unsupported_extension: 110;
      /**@type {111} certificate_unobtainable_RESERVED */
      certificate_unobtainable_RESERVED: 111;
      /**@type {112} unrecognized_name */
      unrecognized_name: 112;
      /**@type {113} bad_certificate_status_response */
      bad_certificate_status_response: 113;
      /**@type {114} bad_certificate_hash_value_RESERVED */
      bad_certificate_hash_value_RESERVED: 114;
      /**@type {115} unknown_psk_identity */
      unknown_psk_identity: 115;
      /**@type {116} certificate_required */
      certificate_required: 116;
      /**@type {120} no_application_protocol */
      no_application_protocol: 120;
  };
  /**@type {Alert.desCore} description - the value converted to AlertDescription */
  static description: {
      /**@type {0} close_notify */
      close_notify: 0;
      /**@type {10} unexpected_message */
      unexpected_message: 10;
      /**@type {20} bad_record_mac */
      bad_record_mac: 20;
      /**@type {21} decryption_failed_RESERVED */
      decryption_failed_RESERVED: 21;
      /**@type {22} record_overflow */
      record_overflow: 22;
      /**@type {30} decompression_failure_RESERVED */
      decompression_failure_RESERVED: 30;
      /**@type {40} handshake_failure */
      handshake_failure: 40;
      /**@type {41} no_certificate_RESERVED */
      no_certificate_RESERVED: 41;
      /**@type {42} bad_certificate */
      bad_certificate: 42;
      /**@type {43} unsupported_certificate */
      unsupported_certificate: 43;
      /**@type {44} certificate_revoked */
      certificate_revoked: 44;
      /**@type {45} certificate_expired */
      certificate_expired: 45;
      /**@type {46} certificate_unknown */
      certificate_unknown: 46;
      /**@type {47} illegal_parameter */
      illegal_parameter: 47;
      /**@type {48} unknown_ca */
      unknown_ca: 48;
      /**@type {49} access_denied */
      access_denied: 49;
      /**@type {50} decode_error */
      decode_error: 50;
      /**@type {51} decrypt_error */
      decrypt_error: 51;
      /**@type {60} export_restriction_RESERVED */
      export_restriction_RESERVED: 60;
      /**@type {70} protocol_version */
      protocol_version: 70;
      /**@type {71} insufficient_security */
      insufficient_security: 71;
      /**@type {80} internal_error */
      internal_error: 80;
      /**@type {86} inappropriate_fallback */
      inappropriate_fallback: 86;
      /**@type {90} user_canceled */
      user_canceled: 90;
      /**@type {100} no_renegotiation_RESERVED */
      no_renegotiation_RESERVED: 100;
      /**@type {109} missing_extension */
      missing_extension: 109;
      /**@type {110} unsupported_extension */
      unsupported_extension: 110;
      /**@type {111} certificate_unobtainable_RESERVED */
      certificate_unobtainable_RESERVED: 111;
      /**@type {112} unrecognized_name */
      unrecognized_name: 112;
      /**@type {113} bad_certificate_status_response */
      bad_certificate_status_response: 113;
      /**@type {114} bad_certificate_hash_value_RESERVED */
      bad_certificate_hash_value_RESERVED: 114;
      /**@type {115} unknown_psk_identity */
      unknown_psk_identity: 115;
      /**@type {116} certificate_required */
      certificate_required: 116;
      /**@type {120} no_application_protocol */
      no_application_protocol: 120;
  };
  /**
   * This alert notifies the recipient that the sender will
     not send any more messages on this connection.  Any data received
     after a closure alert has been received MUST be ignored.
   *
   * @static
   * @type {Alert}
   */
  static close_notify: Alert;
  /**
   * An inappropriate message (e.g., the wrong
     handshake message, premature Application Data, etc.) was received.
     This alert should never be observed in communication between
     proper implementations.
   *
   * @static
   * @type {Alert}
   */
  static unexpected_message: Alert;
  /**
   * This alert is returned if a record is received which
     cannot be deprotected.  Because AEAD algorithms combine decryption
     and verification, and also to avoid side-channel attacks, this
     alert is used for all deprotection failures.  This alert should
     never be observed in communication between proper implementations,
     except when messages were corrupted in the network.
   *
   * @static
   * @type {Alert}
   */
  static bad_record_mac: Alert;
  static decryption_failed_RESERVED: any;
  /**
   * A TLSCiphertext record was received that had a
     length more than 2^14 + 256 bytes, or a record decrypted to a
     TLSPlaintext record with more than 2^14 bytes (or some other
     negotiated limit).  This alert should never be observed in
     communication between proper implementations, except when messages
     were corrupted in the network.
   *
   * @static
   * @type {Alert}
   */
  static record_overflow: Alert;
  static decompression_failure_RESERVED: any;
  /**
   * Receipt of a "handshake_failure" alert message
     indicates that the sender was unable to negotiate an acceptable
     set of security parameters given the options available.
   *
   * @static
   * @type {Alert}
   */
  static handshake_failure: Alert;
  static no_certificate_RESERVED: any;
  /**
   * A certificate was corrupt, contained signatures
     that did not verify correctly, etc.
   *
   * @static
   * @type {Alert}
   */
  static bad_certificate: Alert;
  /**
   * A certificate was of an unsupported type.
   *
   * @static
   * @type {Alert}
   */
  static unsupported_certificate: Alert;
  /**
   * A certificate was revoked by its signer.
   *
   * @static
   * @type {Alert}
   */
  static certificate_revoked: Alert;
  /**
   * A certificate has expired or is not currently
     valid.
   *
   * @static
   * @type {Alert}
   */
  static certificate_expired: Alert;
  /**
   * Some other (unspecified) issue arose in
     processing the certificate, rendering it unacceptable.
   *
   * @static
   * @type {Alert}
   */
  static certificate_unknown: Alert;
  /**
   * A field in the handshake was incorrect or
     inconsistent with other fields.  This alert is used for errors
     which conform to the formal protocol syntax but are otherwise
     incorrect.
   *
   * @static
   * @type {Alert}
   */
  static illegal_parameter: Alert;
  /**
   * A valid certificate chain or partial chain was received,
     but the certificate was not accepted because the CA certificate
     could not be located or could not be matched with a known trust
     anchor.
   *
   * @static
   * @type {Alert}
   */
  static unknown_ca: Alert;
  /**
   * A valid certificate or PSK was received, but when
     access control was applied, the sender decided not to proceed with
     negotiation.
   *
   * @static
   * @type {Alert}
   */
  static access_denied: Alert;
  /**
   * A message could not be decoded because some field was
     out of the specified range or the length of the message was
     incorrect.  This alert is used for errors where the message does
     not conform to the formal protocol syntax.  This alert should
     never be observed in communication between proper implementations,
     except when messages were corrupted in the network.
   *
   * @static
   * @type {Alert}
   */
  static decode_error: Alert;
  /**
   * A handshake (not record layer) cryptographic
     operation failed, including being unable to correctly verify a
     signature or validate a Finished message or a PSK binder.
   *
   * @static
   * @type {Alert}
   */
  static decrypt_error: Alert;
  static export_restriction_RESERVED: any;
  /**
   * The protocol version the peer has attempted to
     negotiate is recognized but not supported (see Appendix D).
   *
   * @static
   * @type {Alert}
   */
  static protocol_version: Alert;
  /**
   * Returned instead of "handshake_failure" when
     a negotiation has failed specifically because the server requires
     parameters more secure than those supported by the client.
   *
   * @static
   * @type {Alert}
   */
  static insufficient_security: Alert;
  /**
   * An internal error unrelated to the peer or the
     correctness of the protocol (such as a memory allocation failure)
     makes it impossible to continue.
   *
   * @static
   * @type {Alert}
   */
  static internal_error: Alert;
  /**
   * Sent by a server in response to an invalid
     connection retry attempt from a client (see [RFC7507]).
   *
   * @static
   * @type {Alert}
   */
  static inappropriate_fallback: Alert;
  /**
   * This alert notifies the recipient that the sender is
     canceling the handshake for some reason unrelated to a protocol
     failure.  If a user cancels an operation after the handshake is
     complete, just closing the connection by sending a "close_notify"
     is more appropriate.  This alert SHOULD be followed by a
     "close_notify".  This alert generally has AlertLevel=warning.
   *
   * @static
   * @type {Alert}
   */
  static user_canceled: Alert;
  static no_renegotiation_RESERVED: any;
  /**
   * Sent by endpoints that receive a handshake
     message not containing an extension that is mandatory to send for
     the offered TLS version or other negotiated parameters.
   *
   * @static
   * @type {Alert}
   */
  static missing_extension: Alert;
  /**
   * Sent by endpoints receiving any handshake
     message containing an extension known to be prohibited for
     inclusion in the given handshake message, or including any
     extensions in a ServerHello or Certificate not first offered in
     the corresponding ClientHello or CertificateRequest.
   *
   * @static
   * @type {Alert}
   */
  static unsupported_extension: Alert;
  static certificate_unobtainable_RESERVED: any;
  /**
   * Sent by servers when no server exists identified
     by the name provided by the client via the "server_name" extension
     (see [RFC6066]).
   *
   * @static
   * @type {Alert}
   */
  static unrecognized_name: Alert;
  /**
   * Sent by clients when an invalid or
     unacceptable OCSP response is provided by the server via the
     "status_request" extension (see [RFC6066]).
   *
   * @static
   * @type {Alert}
   */
  static bad_certificate_status_response: Alert;
  static bad_certificate_hash_value_RESERVED: any;
  /**
   * Sent by servers when PSK key establishment is
     desired but no acceptable PSK identity is provided by the client.
     Sending this alert is OPTIONAL; servers MAY instead choose to send
     a "decrypt_error" alert to merely indicate an invalid PSK
     identity.
   *
   * @static
   * @type {Alert}
   */
  static unknown_psk_identity: Alert;
  /**
   * Sent by servers when a client certificate is
     desired but none was provided by the client.
   *
   * @static
   * @type {Alert}
   */
  static certificate_required: Alert;
  /**
   * Sent by servers when a client
     "application_layer_protocol_negotiation" extension advertises only
     protocols that the server does not support (see [RFC7301]).
   *
   * @static
   * @type {Alert}
   */
  static no_application_protocol: Alert;
  /**
   * parse Alert and return it
   *
   * @static
   * @param {Uint8Array} octet
   * @returns {Alert}
   */
  static parse(octet: Uint8Array): Alert;
  /**
   * @param {Uint8} level
   * @param {Uint8} desc
   */
  constructor(level: Uint8, desc: Uint8);
  get level(): Uint8;
  get description(): Uint8;
  /**
   * return the meaning of alert message in human readable format
   * @returns {string} formated as`"alert[code]-description[code]"`
   */
  meaning(): string;
  /**
   * A method to return the meaning of alert message in human readable format
   *
   * @type {() => string}
   */
  mean: () => string;
  #private;
}
import { Struct, Uint8 } from "../src/base.js";
export {};
