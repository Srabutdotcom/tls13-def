/**
 * !SECTION B.2.  Alert Messages
 * LINK - static https=//datatracker.ietf.org/doc/html/rfc8446#appendix-B.2
 * *DONE - verified
 */

import { Struct, Uint8, Enum } from "./mod.js";

const _level = {
   /**@type {1} warning */
   warning: 1,
   /**@type {2} fatal */
   fatal: 2,
   /**@type {255} [Enum.max] */
   [Enum.max]: 255
}

const desc = {
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
   [Enum.max]: 255
}

/**
 * Alert handshake message
 */
export class Alert extends Struct {
   /**
    * @type {_level} Alert.level - level of alert
    */
   static level = new Enum(_level)
   /**
    * @type {desc} Alert.description - description of alert
    */
   static description = new Enum(desc)

   /**
    * @typedef {number} uint 
    * @param {("warning"|"fatal")|(1|2)|Uint8Array} _level 
    * @param {("close_notify"|"unexpected_message"|"bad_record_mac"|"decryption_failed_RESERVED"|"record_overflow"|"decompression_failure_RESERVED"|"handshake_failure"|"no_certificate_RESERVED"|"bad_certificate"|"unsupported_certificate"|"certificate_revoked"|"certificate_expired"|"certificate_unknown"|"illegal_parameter"|"unknown_ca"|"access_denied"|"decode_error"|"decrypt_error"|"export_restriction_RESERVED"|"protocol_version"|"insufficient_security"|"internal_error"|"inappropriate_fallback"|"user_canceled"|"no_renegotiation_RESERVED"|"missing_extension"|"unsupported_extension"|"certificate_unobtainable_RESERVED"|"unrecognized_name"|"bad_certificate_status_response"|"bad_certificate_hash_value_RESERVED"|"unknown_psk_identity"|"certificate_required"|"no_application_protocol")|(0|10|20|21|22|30|40|41|42|43|44|45|46|47|48|49|50|51|60|70|71|80|86|90|100|109|110|111|112|113|114|115|116|120)} _desc
    */
   constructor(_level, _desc) {
      if (_level instanceof Uint8Array) {
         super(_level[0], _level[1])
      } else {
         _level = level(_level);
         _desc = description(_desc)
         super(_level, _desc)
      }
   }
   /**
    * return the meaning of alert message in human readable format
    * @returns {string} formated as`"alert[code]-description[code]"`
    */
   meaning() {
      const level = this[0];
      const desc = this[1]
      return `${Alert.level.key(level)}[${level}]-${Alert.description.key(desc)}[${desc}]`
   }
}

function level(_level) {
   let code
   if (typeof _level == "string") {
      code = Alert.level.value(_level);
      if (!code) throw TypeError(`Uknown level :${_level}`)
   }
   if (typeof _level == "number") {
      const desc = Alert.level.key(_level);
      if (!desc) throw TypeError(`Uknown code: ${_level}`)
      code = _level
   }
   if (code == undefined) throw TypeError(`Uknown level :${_level}`)
   return new Uint8(code)
}

function description(desc) {
   let code
   if (typeof desc == "string") {
      code = Alert.description.value(desc);
      if (!code) throw TypeError(`Uknown level :${desc}`)
   }
   if (typeof desc == "number") {
      const _desc = Alert.description.key(desc);
      if (!_desc) throw TypeError(`Uknown code: ${desc}`)
      code = desc
   }
   if (code == undefined) throw TypeError(`Uknown level :${desc}`)
   return new Uint8(code)
}

export function alert() {
   return {
      level: {
         fatal() { return descr(_level.fatal) },
         warning() { return descr(_level.warning) }
      }
   }
}

function descr(alert) {
   return {
      description: {
         close_notify() { return new Alert(alert, desc.close_notify) },
         unexpected_message() { return new Alert(alert, desc.unexpected_message) },
         bad_record_mac() { return new Alert(alert, desc.bad_record_mac) },
         decryption_failed_RESERVED() { return new Alert(alert, desc.decryption_failed_RESERVED) },
         record_overflow() { return new Alert(alert, desc.record_overflow) },
         decompression_failure_RESERVED() { return new Alert(alert, desc.decompression_failure_RESERVED) },
         handshake_failure() { return new Alert(alert, desc.handshake_failure) },
         no_certificate_RESERVED() { return new Alert(alert, desc.no_certificate_RESERVED) },
         bad_certificate() { return new Alert(alert, desc.bad_certificate) },
         unsupported_certificate() { return new Alert(alert, desc.unsupported_certificate) },
         certificate_revoked() { return new Alert(alert, desc.certificate_revoked) },
         certificate_expired() { return new Alert(alert, desc.certificate_expired) },       
         certificate_unknown() { return new Alert(alert, desc.certificate_unknown) },
         illegal_parameter() { return new Alert(alert, desc.illegal_parameter) },
         unknown_ca() { return new Alert(alert, desc.unknown_ca) },
         access_denied() { return new Alert(alert, desc.access_denied) },
         decode_error() { return new Alert(alert, desc.decode_error) },
         decrypt_error() { return new Alert(alert, desc.decrypt_error) },
         export_restriction_RESERVED() { return new Alert(alert, desc.export_restriction_RESERVED) },
         protocol_version() { return new Alert(alert, desc.protocol_version) },
         insufficient_security() { return new Alert(alert, desc.insufficient_security) },
         internal_error() { return new Alert(alert, desc.internal_error) },
         inappropriate_fallback() { return new Alert(alert, desc.inappropriate_fallback) },
         user_canceled() { return new Alert(alert, desc.user_canceled) },
         no_renegotiation_RESERVED() { return new Alert(alert, desc.no_renegotiation_RESERVED) },
         missing_extension() { return new Alert(alert, desc.missing_extension) },
         unsupported_extension() { return new Alert(alert, desc.unsupported_extension) },
         certificate_unobtainable_RESERVED() { return new Alert(alert, desc.certificate_unobtainable_RESERVED) },
         unrecognized_name() { return new Alert(alert, desc.unrecognized_name) },
         bad_certificate_status_response() { return new Alert(alert, desc.bad_certificate_status_response) },
         bad_certificate_hash_value_RESERVED() { return new Alert(alert, desc.bad_certificate_hash_value_RESERVED) },
         unknown_psk_identity() { return new Alert(alert, desc.unknown_psk_identity) },
         certificate_required() { return new Alert(alert, desc.certificate_required) },
         no_application_protocol() { return new Alert(alert, desc.no_application_protocol) },
      }
   }
}



