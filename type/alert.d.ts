/**
 * Alert handshake message
 */
export class Alert extends Struct {
    /**
     * A static enum representing level
     * @static
     * @enum { number }
     */
    static levelCore: {
        [x: symbol]: typeof AlertLevel | 255;
        /**@type {1} warning */
        warning: 1;
        /**@type {2} fatal */
        fatal: 2;
    };
    static level: Enum;
    /**
     * A static enum representing description
     * @static
     * @enum { number }
     */
    static desCore: {
        [x: symbol]: typeof AlertDescription | 255;
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
    static description: Enum;
    static close_notify: Alert;
    static unexpected_message: Alert;
    static bad_record_mac: Alert;
    static decryption_failed_RESERVED: Alert;
    static record_overflow: Alert;
    static decompression_failure_RESERVED: Alert;
    static handshake_failure: Alert;
    static no_certificate_RESERVED: Alert;
    static bad_certificate: Alert;
    static unsupported_certificate: Alert;
    static certificate_revoked: Alert;
    static certificate_expired: Alert;
    static certificate_unknown: Alert;
    static illegal_parameter: Alert;
    static unknown_ca: Alert;
    static access_denied: Alert;
    static decode_error: Alert;
    static decrypt_error: Alert;
    static export_restriction_RESERVED: Alert;
    static protocol_version: Alert;
    static insufficient_security: Alert;
    static internal_error: Alert;
    static inappropriate_fallback: Alert;
    static user_canceled: Alert;
    static no_renegotiation_RESERVED: Alert;
    static missing_extension: Alert;
    static unsupported_extension: Alert;
    static certificate_unobtainable_RESERVED: Alert;
    static unrecognized_name: Alert;
    static bad_certificate_status_response: Alert;
    static bad_certificate_hash_value_RESERVED: Alert;
    static unknown_psk_identity: Alert;
    static certificate_required: Alert;
    static no_application_protocol: Alert;
    /**
     * @param {Uint8} level
     * @param {Uint8} desc
     */
    constructor(level: Uint8, desc: Uint8);
    /**
     * return the meaning of alert message in human readable format
     * @returns {string} formated as`"alert[code]-description[code]"`
     */
    meaning(): string;
}
import { Struct } from "../src/base.js";
declare class AlertLevel extends Uint8 {
}
import { Enum } from "../src/base.js";
declare class AlertDescription extends Uint8 {
}
import { Uint8 } from "../src/base.js";
export {};
