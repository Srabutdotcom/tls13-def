// deno-lint-ignore-file no-slow-types
// @ts-self-types="../../type/extension/extension.d.ts"

//* the extension below are for tls1.3 only as mentioned in rfc 8446 and iana
//* https://datatracker.ietf.org/doc/html/rfc8446#section-11

import { ClientShares, ServerShare } from "./keyshare.js";
import { SignatureSchemeList } from "./signaturescheme.js";
import { PskKeyExchangeModes } from "./pskeyexchange.js";
import { SupportedVersions } from "./supportedversion.js"
import { NamedGroupList } from "./namedgroup.js";
import { Enum, Struct, Uint16, Minmax } from "../base.js";
import { ServerNameList } from "./servername.js"
import { uint8array } from "../deps.js"

class ExtensionType extends Uint16 {
   #value
   constructor(v) {
      super(v)
      this.#value = v
   }
   get name() { return Extension.types.key(this.#value) }
}

//* https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml
/**
 * Extension
 * ```
 * extension_data: Uint8Array
 * extensionType: ExtensionType
 * new(extension_data, extensionType)=>Extension
 * 
 * types: ...ExtensionType
 * 
 * extensions: {...}
 * 
 * struct {
      ExtensionType extension_type;
      opaque extension_data<0..2^16-1>;
   } Extension;
   ```
 */
export class Extension extends Struct {
   static types = new Enum({
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
      [Enum.class]: ExtensionType
   })
   /**
    * new Extension
    * @param {ExtensionType} extensionType 
    * @param {Uint8Array} extension_data 
    */
   static new(extension_data, extensionType) { return new Extension(extension_data, extensionType) }
   static extensions = {
      server_name: {
         /**
          * 
          * @param  {...string} serverName 
          * @returns Extension
          */
         serverNames(...serverName) {
            return new Extension(ServerNameList.list(...serverName), Extension.types.server_name)
         }
      },
      supported_groups: new Extension(NamedGroupList.list(), Extension.types.supported_groups),
      signature_algorithms: new Extension(SignatureSchemeList.list(), Extension.types.signature_algorithms),
      supported_versions: {
         client: new Extension(SupportedVersions.client(), Extension.types.supported_versions),
         server: new Extension(SupportedVersions.server(), Extension.types.supported_versions)
      },
      psk_key_exchange_modes: new Extension(PskKeyExchangeModes.psk_dhe_ke(), Extension.types.psk_key_exchange_modes),
      key_share: {
         async client() { return new Extension(await ClientShares.keyShareClientHello(), Extension.types.key_share) },//
         server: {
            async x25519() { return new Extension(await ServerShare.x25519(), Extension.types.key_share) },
            async p521() { return new Extension(await ServerShare.p521(), Extension.types.key_share) },
            async p384() { return new Extension(await ServerShare.p384(), Extension.types.key_share) },
            async p256() { return new Extension(await ServerShare.p256(), Extension.types.key_share) },
         },//
      }
   }
   /**
    * 
    * @param {ExtensionType} extensionType 
    * @param {Uint8Array} extension_data 
    */
   constructor(extension_data, extensionType) {
      extensionType = extensionType_(extensionType);
      extension_data = uint8array(extension_data)
      super(
         extensionType,
         Minmax.min(0).max(2 ** 16 - 1).byte(extension_data)//new OpaqueVar(extension_data, 0, 2 ** 16 - 1)
      )
   }
}

function extensionType_(extType) {
   if (extType instanceof ExtensionType) return extType;
   throw TypeError(`Invalid parameter, expected number or Uint16`)
}
/**
 * Extension extensions<2..2^16-1>;
 */
export class Extensions extends Minmax {
   /**
    * @param {number} m - minimum length
    * @param {number} M - maximum length
    * @param  {...Extension} extensions 
    */
   static new(m, M, ...extensions) { return new Extensions(m, M, ...extensions) }
   /**
    * @param {number} m - minimum length
    * @param {number} M - maximum length
    * @param  {...Extension} extensions 
    */
   constructor(m, M, ...extensions) {
      super(m, M, ...extensions)
   }
}
