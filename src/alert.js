// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/alert.d.ts"

/**
 * !SECTION B.2.  Alert Messages
 * LINK - static https=//datatracker.ietf.org/doc/html/rfc8446#appendix-B.2
 * *DONE - verified
 */

import { Struct, Uint8, Enum } from "./base.js";

class AlertLevel extends Uint8 {
   /**
    * 
    * @param {number} value 
    */
   constructor(value) { super(value) }
}

class AlertDescription extends Uint8 {
   /**
    * 
    * @param {number} value 
    */
   constructor(value) { super(value) }
}

/**
 * Alert handshake message
 */
export class Alert extends Struct {
   /**
    * A static enum representing level
    * @static
    * @enum { number }
    */
   static levelCore = {
      /**@type {1} warning */
      warning: 1,
      /**@type {2} fatal */
      fatal: 2,
      /**@type {255} [Enum.max] */
      [Enum.max]: 255,
      [Enum.class]: AlertLevel
   }
   static level = new Enum(Alert.levelCore)
   /**
    * A static enum representing description
    * @static
    * @enum { number }
    */
   static desCore = {
      /**@type {0} close_notify */
      close_notify: 0,
      /**@type {10} unexpected_message */
      unexpected_message: 10,
      /**@type {20} bad_record_mac */
      bad_record_mac: 20,
      /**@type {21} decryption_failed_RESERVED */
      decryption_failed_RESERVED: 21,
      /**@type {22} record_overflow */
      record_overflow: 22,
      /**@type {30} decompression_failure_RESERVED */
      decompression_failure_RESERVED: 30,
      /**@type {40} handshake_failure */
      handshake_failure: 40,
      /**@type {41} no_certificate_RESERVED */
      no_certificate_RESERVED: 41,
      /**@type {42} bad_certificate */
      bad_certificate: 42,
      /**@type {43} unsupported_certificate */
      unsupported_certificate: 43,
      /**@type {44} certificate_revoked */
      certificate_revoked: 44,
      /**@type {45} certificate_expired */
      certificate_expired: 45,
      /**@type {46} certificate_unknown */
      certificate_unknown: 46,
      /**@type {47} illegal_parameter */
      illegal_parameter: 47,
      /**@type {48} unknown_ca */
      unknown_ca: 48,
      /**@type {49} access_denied */
      access_denied: 49,
      /**@type {50} decode_error */
      decode_error: 50,
      /**@type {51} decrypt_error */
      decrypt_error: 51,
      /**@type {60} export_restriction_RESERVED */
      export_restriction_RESERVED: 60,
      /**@type {70} protocol_version */
      protocol_version: 70,
      /**@type {71} insufficient_security */
      insufficient_security: 71,
      /**@type {80} internal_error */
      internal_error: 80,
      /**@type {86} inappropriate_fallback */
      inappropriate_fallback: 86,
      /**@type {90} user_canceled */
      user_canceled: 90,
      /**@type {100} no_renegotiation_RESERVED */
      no_renegotiation_RESERVED: 100,
      /**@type {109} missing_extension */
      missing_extension: 109,
      /**@type {110} unsupported_extension */
      unsupported_extension: 110,
      /**@type {111} certificate_unobtainable_RESERVED */
      certificate_unobtainable_RESERVED: 111,
      /**@type {112} unrecognized_name */
      unrecognized_name: 112,
      /**@type {113} bad_certificate_status_response */
      bad_certificate_status_response: 113,
      /**@type {114} bad_certificate_hash_value_RESERVED */
      bad_certificate_hash_value_RESERVED: 114,
      /**@type {115} unknown_psk_identity */
      unknown_psk_identity: 115,
      /**@type {116} certificate_required */
      certificate_required: 116,
      /**@type {120} no_application_protocol */
      no_application_protocol: 120,
      /**@type {255} Enum.max */
      [Enum.max]: 255,
      [Enum.class]: AlertDescription
   }
   static description = new Enum(Alert.desCore)

   static close_notify = new Alert(Alert.level.warning, Alert.description.close_notify)
   static unexpected_message = new Alert(Alert.level.fatal, Alert.description.unexpected_message)
   static bad_record_mac = new Alert(Alert.level.fatal, Alert.description.bad_record_mac)
   static decryption_failed_RESERVED = new Alert(Alert.level.warning, Alert.description.decryption_failed_RESERVED)
   static record_overflow = new Alert(Alert.level.fatal, Alert.description.record_overflow)
   static decompression_failure_RESERVED = new Alert(Alert.level.warning, Alert.description.decompression_failure_RESERVED)
   static handshake_failure = new Alert(Alert.level.fatal, Alert.description.handshake_failure)
   static no_certificate_RESERVED = new Alert(Alert.level.warning, Alert.description.no_certificate_RESERVED)
   static bad_certificate = new Alert(Alert.level.fatal, Alert.description.bad_certificate)
   static unsupported_certificate = new Alert(Alert.level.fatal, Alert.description.unsupported_certificate)
   static certificate_revoked = new Alert(Alert.level.fatal, Alert.description.certificate_revoked)
   static certificate_expired = new Alert(Alert.level.fatal, Alert.description.certificate_expired)
   static certificate_unknown = new Alert(Alert.level.fatal, Alert.description.certificate_unknown)
   static illegal_parameter = new Alert(Alert.level.fatal, Alert.description.illegal_parameter)
   static unknown_ca = new Alert(Alert.level.fatal, Alert.description.unknown_ca)
   static access_denied = new Alert(Alert.level.fatal, Alert.description.access_denied)
   static decode_error = new Alert(Alert.level.fatal, Alert.description.decode_error)
   static decrypt_error = new Alert(Alert.level.fatal, Alert.description.decrypt_error)
   static export_restriction_RESERVED = new Alert(Alert.level.warning, Alert.description.export_restriction_RESERVED)
   static protocol_version = new Alert(Alert.level.fatal, Alert.description.protocol_version)
   static insufficient_security = new Alert(Alert.level.fatal, Alert.description.insufficient_security)
   static internal_error = new Alert(Alert.level.fatal, Alert.description.internal_error)
   static inappropriate_fallback = new Alert(Alert.level.fatal, Alert.description.inappropriate_fallback)
   static user_canceled = new Alert(Alert.level.warning, Alert.description.user_canceled)
   static no_renegotiation_RESERVED = new Alert(Alert.level.warning, Alert.description.no_renegotiation_RESERVED)
   static missing_extension = new Alert(Alert.level.fatal, Alert.description.missing_extension)
   static unsupported_extension = new Alert(Alert.level.fatal, Alert.description.unsupported_extension)
   static certificate_unobtainable_RESERVED = new Alert(Alert.level.warning, Alert.description.certificate_unobtainable_RESERVED)
   static unrecognized_name = new Alert(Alert.level.fatal, Alert.description.unrecognized_name)
   static bad_certificate_status_response = new Alert(Alert.level.fatal, Alert.description.bad_certificate_status_response)
   static bad_certificate_hash_value_RESERVED = new Alert(Alert.level.warning, Alert.description.bad_certificate_hash_value_RESERVED)
   static unknown_psk_identity = new Alert(Alert.level.fatal, Alert.description.unknown_psk_identity)
   static certificate_required = new Alert(Alert.level.fatal, Alert.description.certificate_required)
   static no_application_protocol = new Alert(Alert.level.fatal, Alert.description.no_application_protocol)

   /**
    * @param {Uint8} level 
    * @param {Uint8} desc
    */
   constructor(level, desc) {
      super(level, desc)
   }
   /**
    * return the meaning of alert message in human readable format
    * @returns {string} formated as`"alert[code]-description[code]"`
    */
   meaning() {
      const { level, description } = Alert
      const lev = this[0];
      const des = this[1]
      return `${level.key(lev)}[${lev}]-${description.key(des)}[${des}]`
   }
}

// npx -p typescript tsc alert.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ../dist
