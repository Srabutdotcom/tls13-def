/**
 * !SECTION B.3.3.  Authentication Messages
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.3.3
 * *DONE - verified
 */

import { Enum, OpaqueVar, HandshakeType, Struct } from "./mod.js";

const certificateType = {
    /**@type {0} X509 */
    X509: 0,
    /**@type {1} OpenPGP */
    OpenPGP: 1,
    /**@type {2} RawPublicKey */
    RawPublicKey: 2, /* From RFC 7250 ASN.1_subjectPublicKeyInfo */
    /**@type {255} Enum.max */
    [Enum.max]: 255,
}

/**
 * @type {certificateType} CertificateType - description
 */
export const CertificateType = new Enum(certificateType)

/**
 * CertificateEntry
 */
export class CertificateEntry extends Struct {
    /**
     * 
     * @param {Uint8Array} certificate - type either "ASN1 SPKI" or "X509"
     * @param {Uint8Array([0,0])} extensions - optional with default value of Uint8Array([0,0])
     */
    constructor(certificate, extensions = new Uint16(0)) {
        const opaqueCert = new OpaqueVar(certificate, 1, 2 ** 24 - 1)
        super(
            opaqueCert,
            extensions
        )
    }
}
/**
 * Certificate
 */
export class Certificate extends Struct {
    type = HandshakeType.certificate
    /**
     * 
     * @param {CertificateEntry[]} certificateEntries - list of CertificateEntry
     * @param {OpaqueVar} certificate_request_context - optional with default value of new Uint8(0)
     */
    constructor(certificateEntries, certificate_request_context = new Uint8(0)) {
        const certificate_list = new OpaqueVar(certificateEntries, 0, 2 ** 24 - 1)
        super(
            certificate_request_context,
            certificate_list
        )
    }
}

/**
 * CertificateVerify
 */
export class CertificateVerify extends Struct {
    type = HandshakeType.certificate_verify
    /**
     * 
     * @param {Uint8Array} algorithm SignatureScheme algorithm
     * @param {Uint8Array} signature 
     */
    constructor(algorithm, signature) {
        const opaqueSignature = new OpaqueVar(signature, 0, 2 ** 16 - 1)
        super(
            algorithm,
            opaqueSignature
        )
    }
}
/**
 * Finished
 */
export class Finished extends Struct {
    type = HandshakeType.finished
    /**
     * 
     * @param {Uint8Array} verify_data - with length the same as hash length
     */
    constructor(verify_data) {
        super(verify_data)
    }
}

export function certificateVerify() {
    return {
        algorithm: {
            /* RSASSA-PKCS1-v1_5 algorithms */
            /* rsa_pkcs1_sha256(0x0401),
            rsa_pkcs1_sha384(0x0501),
            rsa_pkcs1_sha512(0x0601), */

            /* ECDSA algorithms */
            ecdsa_secp256r1_sha256() { return sign([0x04, 0x03]) },
            ecdsa_secp384r1_sha384() { return sign([0x05, 0x03]) },
            ecdsa_secp521r1_sha512() { return sign([0x06, 0x03]) },

            /* RSASSA-PSS algorithms with public key OID rsaEncryption */
            rsa_pss_rsae_sha256() { return sign([0x08, 0x04]) },
            rsa_pss_rsae_sha384() { return sign([0x08, 0x05]) },
            rsa_pss_rsae_sha512() { return sign([0x08, 0x06]) },
            /* EdDSA algorithms */
            /* ed25519(0x0807),
            ed448(0x0808), */

            /* RSASSA-PSS algorithms with public key OID RSASSA-PSS */
            rsa_pss_pss_sha256() { return sign([0x08, 0x09]) },
            rsa_pss_pss_sha384() { return sign([0x08, 0x0a]) },
            rsa_pss_pss_sha512() { return sign([0x08, 0x0b]) },
        }
    }
}

function sign(code) {
    return {
        signature(signature) { return new CertificateVerify(new Uint8Array(code), signature) }
    }
}

const a = certificateVerify().algorithm.rsa_pss_pss_sha256().signature(new Uint8Array([1,2,3]))
