//* the extension below are for tls1.3 only as mentioned in rfc 8446 and iana
//* https://datatracker.ietf.org/doc/html/rfc8446#section-11

import { Enum, Struct } from "../mod.js";

//* https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml
const extensionType = {
   /** @type {0} :     server_name */
   server_name: 0,                             /* RFC 6066 */
   /** @type {1} :     max_fragment_length */
   max_fragment_length: 1,                     /* RFC 6066 */
   /** @type {5} :     status_request */
   status_request: 5,                          /* RFC 6066 */
   /** @type {10} :     supported_groups */
   supported_groups: 10,                       /* RFC 8422, 7919 */
   /** @type {13} :     signature_algorithms */
   signature_algorithms: 13,                   /* RFC 8446 */
   /** @type {14} :     use_srtp */
   use_srtp: 14,                               /* RFC 5764 */
   /** @type {15} :     heartbeat */
   heartbeat: 15,                              /* RFC 6520 */
   /** @type {16} :     application_layer_protocol_negotiation */
   application_layer_protocol_negotiation: 16, /* RFC 7301 */
   /** @type {18} :     signed_certificate_timestamp */
   signed_certificate_timestamp: 18,           /* RFC 6962 */
   /** @type {19} :     client_certificate_type */
   client_certificate_type: 19,                /* RFC 7250 */
   /** @type {20} :     server_certificate_type */
   server_certificate_type: 20,                /* RFC 7250 */
   /** @type {21} :     padding */
   padding: 21,                                /* RFC 7685 */
   /** @type {35} :     session_ticket */
   session_ticket: 35,                         /* [RFC5077][RFC8447] */
   /** @type {41} :     pre_shared_key */
   pre_shared_key: 41,                         /* RFC 8446 */
   /** @type {42} :     early_data */
   early_data: 42,                             /* RFC 8446 */
   /** @type {43} :     supported_versions */
   supported_versions: 43,                     /* RFC 8446 */
   /** @type {44} :     cookie */
   cookie: 44,                                 /* RFC 8446 */
   /** @type {45} :     psk_key_exchange_modes */
   psk_key_exchange_modes: 45,                 /* RFC 8446 */
   /** @type {46} :     RESERVED */
   RESERVED: 46,                               /* Used but never assigned */
   /** @type {47} :     certificate_authorities */
   certificate_authorities: 47,                /* RFC 8446 */
   /** @type {48} :     oid_filters */
   oid_filters: 48,                            /* RFC 8446 */
   /** @type {49} :     post_handshake_auth */
   post_handshake_auth: 49,                    /* RFC 8446 */
   /** @type {50} :     signature_algorithms_cert */
   signature_algorithms_cert: 50,              /* RFC 8446 */
   /** @type {51} :     key_share */
   key_share: 51,                              /* RFC 8446 */
   /** @type {65535} :     Max */
   [Enum.max]: 65535,
}
export const ExtensionType = new Enum(extensionType)

/**
 * Extension
 */
export class Extension extends Struct {
   /**
    * 
    * @param {number} extensionType 
    * @param {Uint8Array} extension_data 
    */
   constructor(extensionType, extension_data) {
      extensionType = extensionType_(extensionType);
      extension_data = uint8array(extension_data)
      super(
         extensionType,
         new OpaqueVar(extension_data, 0, 2 ** 16 - 1)
      )
   }
}

function extensionType_(extType) {
   const types = [0, 1, 5, 10, 13, 14, 15, 16, 18, 19, 20, 21, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]
   if ((typeof extType == "number") && types.includes(extType)) {
      return new Uint16(extType)
   }
   if ((extType instanceof Uint8Array) && types.includes(extType[1])) {
      return extType
   }
   throw TypeError(`Invalid parameter, expected number or Uint16`)
}