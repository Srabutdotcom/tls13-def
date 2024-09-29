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
    static typeDesc: {
        [x: symbol]: 65535 | typeof ExtensionType;
        /** @type {0} :     server_name */
        server_name: 0;
        /** @type {1} :     max_fragment_length */
        max_fragment_length: 1;
        /** @type {5} :     status_request */
        status_request: 5;
        /** @type {10} :     supported_groups */
        supported_groups: 10;
        /** @type {13} :     signature_algorithms */
        signature_algorithms: 13;
        /** @type {14} :     use_srtp */
        use_srtp: 14;
        /** @type {15} :     heartbeat */
        heartbeat: 15;
        /** @type {16} :     application_layer_protocol_negotiation */
        application_layer_protocol_negotiation: 16;
        /** @type {18} :     signed_certificate_timestamp */
        signed_certificate_timestamp: 18;
        /** @type {19} :     client_certificate_type */
        client_certificate_type: 19;
        /** @type {20} :     server_certificate_type */
        server_certificate_type: 20;
        /** @type {21} :     padding */
        padding: 21;
        /** @type {35} :     session_ticket */
        session_ticket: 35;
        /** @type {41} :     pre_shared_key */
        pre_shared_key: 41;
        /** @type {42} :     early_data */
        early_data: 42;
        /** @type {43} :     supported_versions */
        supported_versions: 43;
        /** @type {44} :     cookie */
        cookie: 44;
        /** @type {45} :     psk_key_exchange_modes */
        psk_key_exchange_modes: 45;
        /** @type {46} :     RESERVED */
        RESERVED: 46;
        /** @type {47} :     certificate_authorities */
        certificate_authorities: 47;
        /** @type {48} :     oid_filters */
        oid_filters: 48;
        /** @type {49} :     post_handshake_auth */
        post_handshake_auth: 49;
        /** @type {50} :     signature_algorithms_cert */
        signature_algorithms_cert: 50;
        /** @type {51} :     key_share */
        key_share: 51;
        renegotiation_info: number;
    };
    static types: Enum;
    /**
     * new Extension
     * @param {ExtensionType} extensionType
     * @param {Uint8Array} extension_data
     */
    static a(extension_data: Uint8Array, extensionType: ExtensionType): Extension;
    static server_name: {
        /**
         *
         * @param  {...string} serverName
         * @returns Extension
         */
        serverNames(...serverName: string[]): Extension;
    };
    static supported_groups: Extension;
    static signature_algorithms: Extension;
    static supported_versions: {
        client: Extension;
        server: Extension;
    };
    static psk_key_exchange_modes: Extension;
    static key_share: {
        client(): Promise<Extension>;
        server: {
            x25519(): Promise<Extension>;
            p521(): Promise<Extension>;
            p384(): Promise<Extension>;
            p256(): Promise<Extension>;
        };
    };
    /**
     * Parse extensions data
     * @param {Uint8Array} extsData
     * @param {"ClientHello"|"ServerHello"|"KeyShareHelloRetryRequest"} klas - description
     */
    static parse(extsData: Uint8Array, klas: "ClientHello" | "ServerHello" | "KeyShareHelloRetryRequest"): {};
    /**
     *
     * @param {ExtensionType} extensionType
     * @param {Uint8Array} extension_data
     */
    constructor(extension_data: Uint8Array, extensionType: ExtensionType);
    /**@return {string} description */
    get name(): string;
    get data(): Uint8Array;
    #private;
}
/**
 * Extension extensions<2..2^16-1>;
 */
export class Extensions extends Minmax {
    /**
     * @param {number} m - positive integer - represents minimum length
     * @param  {...Extension} extensions
     */
    static a(m: number, ...extensions: Extension[]): Extensions;
    /**
     * @param  {...Extension} extensions
     * @return
     */
    static encryptedExtensions(...extensions: Extension[]): Extensions;
    /**
     * @param  {...Extension} extensions
     * @return
     */
    static certificateRequest(...extensions: Extension[]): Extensions;
    /**
     * @param  {...Extension} extensions
     * @return
     */
    static certificateEntry(...extensions: Extension[]): Extensions;
    /**
     * @param  {...Extension} extensions
     * @return
     */
    static newSessionTicket(...extensions: Extension[]): Extensions;
    /**
     * @param  {...Extension} extensions
     * @return
     */
    static clientHello(...extensions: Extension[]): Extensions;
    /**
     * @param  {...Extension} extensions
     * @return
     */
    static serverHello(...extensions: Extension[]): Extensions;
    /**
     * @param {number} m - positive integer - represents minimum length
     * @param  {...Extension} extensions
     */
    constructor(m: number, ...extensions: Extension[]);
}
import { Struct } from "../base.js";
declare class ExtensionType extends Uint16 {
    /**
     * @param {number} v
     * @return
     */
    static a(v: number): ExtensionType;
    /**
     * @return {string} description
     */
    get name(): string;
    /**
     * @param {"ClientHello"|"ServerHello"|"KeyShareHelloRetryRequest"} type
     * @returns {ServerNameList|NamedGroupList|SignatureSchemeList|PskKeyExchangeModes|KeyShareClientHello|KeyShareServerHello|KeyShareHelloRetryRequest|false}
     */
    klas(type: "ClientHello" | "ServerHello" | "KeyShareHelloRetryRequest"): ServerNameList | NamedGroupList | SignatureSchemeList | PskKeyExchangeModes | KeyShareClientHello | KeyShareServerHello | KeyShareHelloRetryRequest | false;
    #private;
}
import { Enum } from "../base.js";
import { Minmax } from "../base.js";
import { Uint16 } from "../base.js";
import { ServerNameList } from "./servername.js";
import { NamedGroupList } from "./namedgroup.js";
import { SignatureSchemeList } from "./signaturescheme.js";
import { PskKeyExchangeModes } from "./pskeyexchange.js";
import { KeyShareClientHello } from "./keyshare.js";
import { KeyShareServerHello } from "./keyshare.js";
import { KeyShareHelloRetryRequest } from "./keyshare.js";
export {};
