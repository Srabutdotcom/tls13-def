/**
 * @typedef {Object} certificateType
 * @prop {0} X509
 * @prop {1} OpenPGP
 * @prop {2} RawPublicKey
 */
/**
 * struct {
        
        select (certificate_type) {

            case RawPublicKey:
            //From RFC 7250 ASN.1_subjectPublicKeyInfo
            opaque ASN1_subjectPublicKeyInfo<1..2^24-1>;

            case X509:
            opaque cert_data<1..2^24-1>;
        };
        Extension extensions<0..2^16-1>;
    } CertificateEntry;
 */
export class CertificateEntry extends Struct {
    /**
     *
     * @param {Uint8Array} certificate - type either "ASN1 SPKI" or "X509"
     * @param {Uint16} extensions - optional with default value of Uint8Array([0,0])
     */
    constructor(certificate: Uint8Array, extensions?: Uint16);
}
/**
 * struct {
 *
        opaque certificate_request_context<0..2^8-1>;
        CertificateEntry certificate_list<0..2^24-1>;
    } Certificate;
 */
export class Certificate extends Struct {
    static "new"(certificate_list: any, certificate_request_context?: Uint8): Certificate;
    /**
     *
     * @param  {...Uint8Array} certs
     * @returns
     */
    static certificateEntries(...certs: Uint8Array[]): {
        /**
         *
         * @param  {Uint8Array} reqContexts
         * @returns
         */
        contexts(reqContexts: Uint8Array): Certificate;
    };
    /**
     *
     * @param {CertificateEntry[]} certificate_list - list of CertificateEntry
     * @param {Uint8Array[]} certificate_request_context - optional with default value of new Uint8(0)
     */
    constructor(certificate_list: CertificateEntry[], certificate_request_context?: Uint8Array[]);
    payload: () => Handshake;
    handshake: () => Handshake;
    /**
    *
    * @returns Hanshake message
    */
    wrap(): Handshake;
}
/**
 * struct {
 *
        SignatureScheme algorithm;
        opaque signature<0..2^16-1>;
    } CertificateVerify;
 */
export class CertificateVerify extends Struct {
    static "new"(algorithm: any, signature: any): CertificateVerify;
    /**
     *
     * @param {Uint8Array} algorithm SignatureScheme algorithm
     * @param {Uint8Array} signature
     */
    constructor(algorithm: Uint8Array, signature: Uint8Array);
    payload: () => Handshake;
    handshake: () => Handshake;
    /**
    *
    * @returns Hanshake message
    */
    wrap(): Handshake;
}
/**
 * struct {
 *
        opaque verify_data[Hash.length];
    } Finished;
 */
export class Finished extends Struct {
    static "new"(verify_data: any): Finished;
    /**
     *
     * @param {Uint8Array} verify_data - with length the same as hash length
     */
    constructor(verify_data: Uint8Array);
    payload: () => Handshake;
    handshake: () => Handshake;
    /**
    *
    * @returns Hanshake message
    */
    wrap(): Handshake;
}
export type certificateType = {
    X509: 0;
    OpenPGP: 1;
    RawPublicKey: 2;
};
import { Struct } from "../src/base.js";
import { Uint16 } from "../src/base.js";
import { Handshake } from "../src/handshake.js";
import { Uint8 } from "../src/base.js";
