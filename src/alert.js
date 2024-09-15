/**
 * !SECTION B.2.  Alert Messages
 * LINK - static https=//datatracker.ietf.org/doc/html/rfc8446#appendix-B.2
 * *DONE - verified
 */

import { Struct, Uint8, Enum } from "./base.js";

class AlertLevel extends Uint8 {
   constructor(value) { super(value) }
}

class AlertDescription extends Uint8 {
   constructor(value) { super(value) }
}

/**
 * Alert handshake message
 */
export class Alert extends Struct {
   static level = new Enum({
      /**@type {1} warning */
      warning: 1,
      /**@type {2} fatal */
      fatal: 2,
      /**@type {255} [Enum.max] */
      [Enum.max]: 255,
      [Enum.class]: AlertLevel
   })
   static description = new Enum({
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
   })
   static {
      const { level, description } = Alert; 
      this.close_notify= new Alert(level.warning, description.close_notify)
      this.unexpected_message= new Alert(level.fatal, description.unexpected_message)
      this.bad_record_mac= new Alert(level.fatal, description.bad_record_mac)
      this.decryption_failed_RESERVED= new Alert(level.warning, description.decryption_failed_RESERVED)
      this.record_overflow= new Alert(level.fatal, description.record_overflow)
      this.decompression_failure_RESERVED= new Alert(level.warning, description.decompression_failure_RESERVED)
      this.handshake_failure= new Alert(level.fatal, description.handshake_failure)
      this.no_certificate_RESERVED= new Alert(level.warning, description.no_certificate_RESERVED)
      this.bad_certificate= new Alert(level.fatal, description.bad_certificate)
      this.unsupported_certificate= new Alert(level.fatal, description.unsupported_certificate)
      this.certificate_revoked= new Alert(level.fatal, description.certificate_revoked)
      this.certificate_expired= new Alert(level.fatal, description.certificate_expired)
      this.certificate_unknown= new Alert(level.fatal, description.certificate_unknown)
      this.illegal_parameter= new Alert(level.fatal, description.illegal_parameter)
      this.unknown_ca= new Alert(level.fatal, description.unknown_ca)
      this.access_denied= new Alert(level.fatal, description.access_denied)
      this.decode_error= new Alert(level.fatal, description.decode_error)
      this.decrypt_error= new Alert(level.fatal, description.decrypt_error)
      this.export_restriction_RESERVED= new Alert(level.warning, description.export_restriction_RESERVED)
      this.protocol_version= new Alert(level.fatal, description.protocol_version)
      this.insufficient_security= new Alert(level.fatal, description.insufficient_security)
      this.internal_error= new Alert(level.fatal, description.internal_error)
      this.inappropriate_fallback= new Alert(level.fatal, description.inappropriate_fallback)
      this.user_canceled= new Alert(level.warning, description.user_canceled)
      this.no_renegotiation_RESERVED= new Alert(level.warning, description.no_renegotiation_RESERVED)
      this.missing_extension= new Alert(level.fatal, description.missing_extension)
      this.unsupported_extension= new Alert(level.fatal, description.unsupported_extension)
      this.certificate_unobtainable_RESERVED= new Alert(level.warning, description.certificate_unobtainable_RESERVED)
      this.unrecognized_name= new Alert(level.fatal, description.unrecognized_name)
      this.bad_certificate_status_response= new Alert(level.fatal, description.bad_certificate_status_response)
      this.bad_certificate_hash_value_RESERVED= new Alert(level.warning, description.bad_certificate_hash_value_RESERVED)
      this.unknown_psk_identity= new Alert(level.fatal, description.unknown_psk_identity)
      this.certificate_required= new Alert(level.fatal, description.certificate_required)
      this.no_application_protocol= new Alert(level.fatal, description.no_application_protocol)
   }
   /**
    * @typedef {number} uint 
    * @param {("warning"|"fatal")|(1|2)|Uint8Array} _level 
    * @param {("close_notify"|"unexpected_message"|"bad_record_mac"|"decryption_failed_RESERVED"|"record_overflow"|"decompression_failure_RESERVED"|"handshake_failure"|"no_certificate_RESERVED"|"bad_certificate"|"unsupported_certificate"|"certificate_revoked"|"certificate_expired"|"certificate_unknown"|"illegal_parameter"|"unknown_ca"|"access_denied"|"decode_error"|"decrypt_error"|"export_restriction_RESERVED"|"protocol_version"|"insufficient_security"|"internal_error"|"inappropriate_fallback"|"user_canceled"|"no_renegotiation_RESERVED"|"missing_extension"|"unsupported_extension"|"certificate_unobtainable_RESERVED"|"unrecognized_name"|"bad_certificate_status_response"|"bad_certificate_hash_value_RESERVED"|"unknown_psk_identity"|"certificate_required"|"no_application_protocol")|(0|10|20|21|22|30|40|41|42|43|44|45|46|47|48|49|50|51|60|70|71|80|86|90|100|109|110|111|112|113|114|115|116|120)} _desc
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


