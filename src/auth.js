// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/auth.d.ts"

/**
 * !SECTION B.3.3.  Authentication Messages
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.3
 * *DONE - verified
 */

import { Enum, Minmax, Struct, Uint16, Uint8 } from "./base.js";
import { SignatureSchemeList } from "./extension/signaturescheme.js";
import { Handshake } from "./handshake.js";

class CertificateType extends Uint8 {
    constructor(value) { super(value) }
}

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
    constructor(certificate, extensions = new Uint16(0)) {
        super(
            Minmax.min(1).max(2 ** 24 - 1).byte(certificate),//cert_data,
            extensions
        )
    }
}
/**
 * struct {
 * 
        opaque certificate_request_context<0..2^8-1>;
        CertificateEntry certificate_list<0..2^24-1>;
    } Certificate;
 */
export class Certificate extends Struct {
    static {
        const types = {
            /**@type {Uint8[0]} X509 - description */
            X509: 0,
            /**@type {Uint8[1]} OpenPGP - description */
            OpenPGP: 1,
            /**@type {Uint8[2]} RawPublicKey - description */
            RawPublicKey: 2, /* From RFC 7250 ASN.1_subjectPublicKeyInfo */
            [Enum.max]: 255,
            [Enum.class]: CertificateType
        }
        /**@type {types} this.type - description */
        this.types = new Enum(types)
    }
    static new(certificate_list, certificate_request_context = new Uint8(0)){return new Certificate(certificate_list, certificate_request_context )}
    /**
     * 
     * @param  {...Uint8Array} certs 
     * @returns 
     */
    static certificateEntries(...certs) {
        const certificate_list = Minmax.min(0).max(2 ** 24 - 1).byte(...certs);
        return {
            /**
             * 
             * @param  {Uint8Array} reqContexts 
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
    * @returns Hanshake message
    */
    wrap() {
        return Handshake.certificate(this)
    }
}

/**
 * struct {
 * 
        SignatureScheme algorithm;
        opaque signature<0..2^16-1>;
    } CertificateVerify;
 */
export class CertificateVerify extends Struct {
    static {
        const { SignatureScheme } = SignatureSchemeList
        this.algorithm = {
            /* RSASSA-PKCS1-v1_5 algorithms */
            /* rsa_pkcs1_sha256(0x0401),
            rsa_pkcs1_sha384(0x0501),
            rsa_pkcs1_sha512(0x0601), */

            /* ECDSA algorithms */
            ecdsa_secp256r1_sha256: sign(SignatureScheme.ecdsa_secp256r1_sha256),
            ecdsa_secp384r1_sha384: sign(SignatureScheme.ecdsa_secp384r1_sha384),
            ecdsa_secp521r1_sha512: sign(SignatureScheme.ecdsa_secp521r1_sha512),

            /* RSASSA-PSS algorithms with public key OID rsaEncryption */
            rsa_pss_rsae_sha256: sign(SignatureScheme.rsa_pss_rsae_sha256),
            rsa_pss_rsae_sha384: sign(SignatureScheme.rsa_pss_rsae_sha384),
            rsa_pss_rsae_sha512: sign(SignatureScheme.rsa_pss_rsae_sha512),
            /* EdDSA algorithms */
            /* ed25519(0x0807),
            ed448(0x0808), */

            /* RSASSA-PSS algorithms with public key OID RSASSA-PSS */
            rsa_pss_pss_sha256: sign(SignatureScheme.rsa_pss_pss_sha256),
            rsa_pss_pss_sha384: sign(SignatureScheme.rsa_pss_rsae_sha384),
            rsa_pss_pss_sha512: sign(SignatureScheme.rsa_pss_pss_sha512),
        }
    }

    static new(algorithm, signature){return new CertificateVerify(algorithm, signature)}

    payload = this.wrap;
    handshake = this.wrap

    /**
     * 
     * @param {Uint8Array} algorithm SignatureScheme algorithm
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
    * @returns Hanshake message
    */
    wrap() {
        return Handshake.certificate_verify(this)
    }
}
/**
 * struct {
 * 
        opaque verify_data[Hash.length];
    } Finished;
 */
export class Finished extends Struct {
    static new(verify_data){ return new Finished(verify_data)}
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
    * @returns Hanshake message
    */
    wrap() {
        return Handshake.finished(this)
    }
}

function sign(algorithm) {
    return {
        /**
         * 
         * @param {Uint8Array} signature 
         * @returns 
         */
        signature(...signatures) { return new CertificateVerify(algorithm, ...signatures) }
    }
}

