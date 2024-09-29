/**
 * ProtocolVersion -> 0x0303 - TLS v1.2 or 0x0304 - TLS v1.3
 */
export class ProtocolVersion extends Uint16 {
    static version: {
        SSL30: ProtocolVersion;
        TLS10: ProtocolVersion;
        TLS11: ProtocolVersion;
        TLS12: ProtocolVersion;
        TLS13: ProtocolVersion;
        legacy: ProtocolVersion;
    };
    /**
     * @param {number} ver - 0x0300[SSL30] to 0x0304[TLS13]
     * @return {ProtocolVersion} description
     */
    static a(ver: number): ProtocolVersion;
    meaning(): "SSL v3.0 - [0x0300]" | "TLS v1.0 - [0x0301]" | "TLS v1.1 - [0x0302]" | "TLS v1.2 - legacy_version[0x0303]" | "TLS v1.3 - [0x0304]";
}
/**
 * opaque Random[32]
 */
export class Random extends Uint8Array {
    /**
     *
     * @param {Uint8Array} rnd - 32 bytes random
     */
    static a(rnd: Uint8Array): Random;
    /**
     *
     * @param {Uint8Array} rnd - 32 bytes random
     */
    constructor(rnd: Uint8Array);
}
/**
 * CipherSuite
 * ```
 * uint8 CipherSuite[2];    Cryptographic suite selector
 * ```
 */
export class CipherSuite extends Uint8Array {
    static TLS_AES_128_GCM_SHA256: CipherSuite;
    static TLS_AES_256_GCM_SHA384: CipherSuite;
    /**
     * @param {0x01|0x02} code
     */
    constructor(code?: 1 | 2);
    meaning(): "TLS_AES_128_GCM_SHA256[0x13, 0x01]" | "TLS_AES_256_GCM_SHA384[0x13, 0x02]";
    get AEAD(): -1 | 256 | 128;
    get SHA(): -1 | 256 | 384;
}
/**
 * List of CipherSuite
 * CipherSuite cipher_suites<2..2^16-2>;
 */
export class CipherSuites extends Minmax {
    /**
     * new CipherSuites
     * @param {Uint8Array} cips - cipherSuites
     * @return {CipherSuites} list of CipherSuite
     * */
    static a(cips: Uint8Array): CipherSuites;
    /**
     *
     * @param {Uint8Array} cips - cipherSuites
     */
    constructor(cips?: Uint8Array);
    ciphers: {
        TLS_AES_128_GCM_SHA256: CipherSuite;
        TLS_AES_256_GCM_SHA384: CipherSuite;
    };
}
import { Uint16 } from "./base.js";
import { Minmax } from "./base.js";
