/**
 * ProtocolVersion -> 0x0303 - TLS v1.2 or 0x0304 - TLS v1.3
 * @extends {Uint16}
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
    toString(): "SSL v3.0 - [0x0300]" | "TLS v1.0 - [0x0301]" | "TLS v1.1 - [0x0302]" | "TLS v1.2 - legacy_version[0x0303]" | "TLS v1.3 - [0x0304]";
}
/**
 * opaque Random[32]
 * @extends {Uint8Array}
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
 * @extends {Uint8Array}
 */
export class CipherSuite extends Uint8Array {
    static TLS_AES_128_GCM_SHA256: CipherSuite;
    static TLS_AES_256_GCM_SHA384: CipherSuite;
    /**
     * @param {0x01|0x02|0x03|0x04|0x05} code
     */
    static a(code: 1 | 2 | 3 | 4 | 5): CipherSuite;
    /**
     * @param {0x01|0x02|0x03|0x04|0x05} code
     */
    constructor(code?: 1 | 2 | 3 | 4 | 5);
    get name(): "TLS_AES_128_GCM_SHA256" | "TLS_AES_256_GCM_SHA384" | "TLS_CHACHA20_POLY1305_SHA256" | "TLS_AES_128_CCM_SHA256" | "TLS_AES_128_CCM_8_SHA256";
    toString(): "TLS_AES_128_GCM_SHA256" | "TLS_AES_256_GCM_SHA384" | "TLS_CHACHA20_POLY1305_SHA256" | "TLS_AES_128_CCM_SHA256" | "TLS_AES_128_CCM_8_SHA256";
    get AEAD(): -1 | 256 | 128;
    get SHA(): -1 | 256 | 384;
}
/**
 * List of CipherSuite
 * CipherSuite cipher_suites<2..2^16-2>;
 * @extends {Minmax}
 */
export class CipherSuites extends Minmax {
    /**
     * re-Create list of CipherSuite based on byte data
     * @param {Uint8Array} cips
     */
    static array(cips: Uint8Array): CipherSuites;
    /**
     * new CipherSuites
     * @param {...CipherSuite} cips - cipherSuites
     * @return {CipherSuites} list of CipherSuite
     * */
    static a(...cips: CipherSuite[]): CipherSuites;
    /**
     * Create list of CipherSuite
     * @param {...CipherSuite} cips - cipherSuites
     */
    constructor(...cips: CipherSuite[]);
    get ciphs(): CipherSuite[];
    /**
     * return the selected Cipher or false if not found
     * @param {Array<CipherSuite>} ciphs - preferred CipherSuite ordered from the most preferred
     * @returns {CipherSuite|false} CipherSuite or false
     */
    match(ciphs: Array<CipherSuite>): CipherSuite | false;
    #private;
}
import { Uint16, Minmax } from "../src/base.js";
