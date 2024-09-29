/**
 * CertificateEntry
 * ```
 *  struct {
        select (certificate_type) {
            case RawPublicKey:
            //From RFC 7250 ASN.1_subjectPublicKeyInfo
            opaque ASN1_subjectPublicKeyInfo<1..2^24-1>;
            case X509:
            opaque cert_data<1..2^24-1>;
        };
        Extension extensions<0..2^16-1>;
    } CertificateEntry;
   ```
 */
export class CertificateEntry extends Struct {
    /**
     * new CertificateEntry
     * @param {Uint8Array} certificate - type either "ASN1 SPKI" or "X509"
     * @param {Uint8Array} extensions - optional with default value of Uint8Array([0,0])
     */
    static a(certificate: Uint8Array, extensions?: Uint8Array): CertificateEntry;
    /**
     *
     * @param {Uint8Array} certificate - type either "ASN1 SPKI" or "X509"
     * @param {Uint8Array} extensions - optional with default value of Uint8Array([0,0])
     */
    constructor(certificate: Uint8Array, extensions?: Uint8Array);
}
/**
 * Certificate
 * ```
 *  struct {
        opaque certificate_request_context<0..2^8-1>;
        CertificateEntry certificate_list<0..2^24-1>;
    } Certificate;
    ```
 */
export class Certificate extends Struct {
    static typeDesc: {
        [x: symbol]: number | typeof CertificateType;
        /**@type {0} X509 - description */
        X509: 0;
        /**@type {1} OpenPGP - description */
        OpenPGP: 1;
        /**@type {2} RawPublicKey - description */
        RawPublicKey: 2;
    };
    static types: Enum;
    /**
     * Create Certificate
     * @param  {...CertificateEntry} certs - list of CertificateEntry
     * @returns {Certificate}
     */
    static certificateEntries(...certs: CertificateEntry[]): Certificate;
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
    * @return {Handshake} message
    */
    wrap(): Handshake;
}
/**
 * CertificateVerify
 * ```
 * struct {
     SignatureScheme algorithm;
     opaque signature<0..2^16-1>;
   } CertificateVerify;
   ```
 */
export class CertificateVerify extends Struct {
    /**
     * Create new CertificateVerify based on specific algorithm
     *
     */
    static ecdsa_secp256r1_sha256: {
        /**
         *
         * @param {...Uint8Array} signatures
         * @returns
         */
        signature(...signatures: Uint8Array[]): CertificateVerify;
    };
    static ecdsa_secp384r1_sha384: {
        /**
         *
         * @param {...Uint8Array} signatures
         * @returns
         */
        signature(...signatures: Uint8Array[]): CertificateVerify;
    };
    static ecdsa_secp521r1_sha512: {
        /**
         *
         * @param {...Uint8Array} signatures
         * @returns
         */
        signature(...signatures: Uint8Array[]): CertificateVerify;
    };
    static rsa_pss_rsae_sha256: {
        /**
         *
         * @param {...Uint8Array} signatures
         * @returns
         */
        signature(...signatures: Uint8Array[]): CertificateVerify;
    };
    static rsa_pss_rsae_sha384: {
        /**
         *
         * @param {...Uint8Array} signatures
         * @returns
         */
        signature(...signatures: Uint8Array[]): CertificateVerify;
    };
    static rsa_pss_rsae_sha512: {
        /**
         *
         * @param {...Uint8Array} signatures
         * @returns
         */
        signature(...signatures: Uint8Array[]): CertificateVerify;
    };
    static rsa_pss_pss_sha256: {
        /**
         *
         * @param {...Uint8Array} signatures
         * @returns
         */
        signature(...signatures: Uint8Array[]): CertificateVerify;
    };
    static rsa_pss_pss_sha384: {
        /**
         *
         * @param {...Uint8Array} signatures
         * @returns
         */
        signature(...signatures: Uint8Array[]): CertificateVerify;
    };
    static rsa_pss_pss_sha512: {
        /**
         *
         * @param {...Uint8Array} signatures
         * @returns
         */
        signature(...signatures: Uint8Array[]): CertificateVerify;
    };
    /**
     *
     * @param {SignatureScheme} algorithm SignatureScheme algorithm
     * @param {Uint8Array} signature
     */
    constructor(algorithm: SignatureScheme, signature: Uint8Array);
    payload: () => Handshake;
    handshake: () => Handshake;
    /**
    *
    * @return {Handshake} message
    */
    wrap(): Handshake;
}
/**
 * Finished
 * ```
 * struct {
    opaque verify_data[Hash.length];
   } Finished;
   ```
 */
export class Finished extends Struct {
    /**
     * new Finished
     * @param {Uint8Array} verify_data
     * @returns
     */
    static "new"(verify_data: Uint8Array): Finished;
    /**
     *
     * @param {Uint8Array} verify_data - with length the same as hash length
     */
    constructor(verify_data: Uint8Array);
    payload: () => Handshake;
    handshake: () => Handshake;
    /**
    *
    * @return {Handshake} message
    */
    wrap(): Handshake;
}
import { Struct } from "../src/base.js";
import { Uint16 } from "../src/base.js";
import { Handshake } from "../src/handshake.js";
declare class CertificateType extends Uint8 {
    static X509: CertificateType;
    static RawPublicKey: CertificateType;
}
import { Enum } from "../src/base.js";
import { SignatureScheme } from "../src/extension/signaturescheme.js";
import { Uint8 } from "../src/base.js";
export {};
