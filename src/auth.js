// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/auth.d.ts"

/**
 * !SECTION B.3.3.  Authentication Messages
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.3
 * *DONE - verified
 */

import { Enum, Minmax, Struct, Uint8 } from "./base.js";
import { Extensions } from "./extension/extension.js";
import { SignatureScheme } from "./extension/signaturescheme.js";
import { Handshake } from "./handshake.js";


/**
 * CertificateType Byte with value either 1 or 2
 *
 * @extends {Uint8}
 */
class CertificateType extends Uint8 {
    static X509 = CertificateType.a(0);
    static RawPublicKey = CertificateType.a(2)
    /** 
     * @param {number} value 
     * @returns 
     */
    static a(value){ return new CertificateType(value)}
    /** 
     * @param {number} value 
     * @returns 
     */
    constructor(value) { super(value) }
}

/**
 * CertificateEntry
 * 
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
 * @extends {Struct}
 */
export class CertificateEntry extends Struct {
    /**
     * new CertificateEntry
     *
     * @static
     * @param {Uint8Array} certificate - type either "ASN1 SPKI" or "X509"
     * @param {Uint8Array} [extensions=Extensions.certificateEntry()] - optional with default value of Uint8Array([0,0])
     * @returns {CertificateEntry}
     */
    static a(certificate, extensions =Extensions.certificateEntry()) { return new CertificateEntry(certificate, extensions) }
    /**
     * new CertificateEntry
     *
     * @static
     * @param {Uint8Array} certificate - type either "ASN1 SPKI" or "X509"
     * @param {Uint8Array} [extensions=Extensions.certificateEntry()] - optional with default value of Uint8Array([0,0])
     * @returns {CertificateEntry}
     */
    constructor(certificate, extensions = Extensions.certificateEntry()) {
        super(
            Minmax.min(1).max(2 ** 24 - 1).byte(certificate),//cert_data,
            extensions
        )
    }
}

/**
 * Certificate
 * 
 * ```
 * struct {
        opaque certificate_request_context<0..2^8-1>;
        CertificateEntry certificate_list<0..2^24-1>;
   } Certificate;
   ```
 * @extends {Struct}
 */
export class Certificate extends Struct {
    static typeDesc = {
        /**@type {0} X509 - description */
        X509: 0,
        /**@type {1} OpenPGP - description */
        OpenPGP: 1,
        /**@type {2} RawPublicKey - description */
        RawPublicKey: 2, /* From RFC 7250 ASN.1_subjectPublicKeyInfo */
    }
    /**@type {Certificate.typeDesc} types - description */
    static types = new Enum(Certificate.typeDesc, 255, CertificateType)

    /**
     * Create Certificate
     * @param  {...CertificateEntry} certs - list of CertificateEntry
     * @returns {Certificate}
     */
    static certificateEntries(...certs) {
        const certificate_list = Minmax.min(0).max(2 ** 24 - 1).byte(...certs);
        return {
            /**
             * 
             * @param  {Uint8Array} reqContexts - optional
             * @returns 
             */
            contexts(reqContexts) {
                const certificate_request_context = Minmax.min(0).max(2 ** 8 - 1).byte(reqContexts);
                return new Certificate(certificate_list, certificate_request_context)
            }
        }
    }
    payload = this.wrap
    handshake = this.wrap
    /**
     * 
     * @param {CertificateEntry[]} certificate_list - list of CertificateEntry
     * @param {Uint8Array[]} certificate_request_context - optional with default value of new Uint8(0)
     */
    constructor(certificate_list, certificate_request_context = new Uint8(0)) {
        super(
            certificate_request_context,
            certificate_list
        )
    }
    /**
    * 
    * @return {Handshake} message
    */
    wrap() {
        return Handshake.certificate(this)
    }
}

/**
 * CertificateVerify
 * ```
 * struct {
     SignatureScheme algorithm;
     opaque signature<0..2^16-1>;
   } CertificateVerify;
   ```
 * @extends {Struct}
 */
export class CertificateVerify extends Struct {
    /**
     * Create new CertificateVerify based on specific algorithm
     * 
     */

    /* RSASSA-PKCS1-v1_5 algorithms */
    /* rsa_pkcs1_sha256(0x0401),
    rsa_pkcs1_sha384(0x0501),
    rsa_pkcs1_sha512(0x0601), */

    /* ECDSA algorithms */
    static ecdsa_secp256r1_sha256 = sign(SignatureScheme.ecdsa_secp256r1_sha256)
    static ecdsa_secp384r1_sha384 = sign(SignatureScheme.ecdsa_secp384r1_sha384)
    static ecdsa_secp521r1_sha512 = sign(SignatureScheme.ecdsa_secp521r1_sha512)

    /* RSASSA-PSS algorithms with public key OID rsaEncryption */
    static rsa_pss_rsae_sha256 = sign(SignatureScheme.rsa_pss_rsae_sha256)
    static rsa_pss_rsae_sha384 = sign(SignatureScheme.rsa_pss_rsae_sha384)
    static rsa_pss_rsae_sha512 = sign(SignatureScheme.rsa_pss_rsae_sha512)
    /* EdDSA algorithms */
    /* ed25519(0x0807),
    ed448(0x0808), */

    /* RSASSA-PSS algorithms with public key OID RSASSA-PSS */
    static rsa_pss_pss_sha256 = sign(SignatureScheme.rsa_pss_pss_sha256)
    static rsa_pss_pss_sha384 = sign(SignatureScheme.rsa_pss_rsae_sha384)
    static rsa_pss_pss_sha512 = sign(SignatureScheme.rsa_pss_pss_sha512)


    payload = this.wrap;
    handshake = this.wrap

    /**
     * 
     * @param {SignatureScheme} algorithm SignatureScheme algorithm
     * @param {Uint8Array} signature 
     */
    constructor(algorithm, signature) {
        super(
            algorithm,
            Minmax.min(0).max(2 ** 16 - 1).byte(signature)
        )
    }
    /**
    * 
    * @return {Handshake} message
    */
    wrap() {
        return Handshake.certificate_verify(this)
    }
}
/**
 * Finished
 * ```
 * struct {
    opaque verify_data[Hash.length];
   } Finished;
   ```
 * @extends {Struct}
 */
export class Finished extends Struct {
    /**
     * new Finished
     * @param {Uint8Array} verify_data 
     * @returns 
     */
    static new(verify_data) { return new Finished(verify_data) }
    payload = this.wrap
    handshake = this.wrap

    /**
     * 
     * @param {Uint8Array} verify_data - with length the same as hash length
     */
    constructor(verify_data) {
        super(verify_data)
    }
    /**
    * 
    * @return {Handshake} message
    */
    wrap() {
        return Handshake.finished(this)
    }
}

function sign(algorithm) {
    return {
        /**
         * 
         * @param {...Uint8Array} signatures
         * @returns 
         */
        signature(...signatures) { return new CertificateVerify(algorithm, ...signatures) }
    }
}

// npx -p typescript tsc ./src/auth.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist

