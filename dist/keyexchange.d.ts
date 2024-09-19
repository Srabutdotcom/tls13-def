/**
 * ProtocolVersion -> 0x0303 - TLS v1.2 or 0x0304 - TLS v1.3
 */
export class ProtocolVersion extends Uint16 {
    static version: {
        TLS12: ProtocolVersion;
        TLS13: ProtocolVersion;
        legacy: ProtocolVersion;
    };
    /**
     *
     * @param {0x0303|0x0304} ver - TLS version (1.2 or 1.3)
     */
    constructor(ver: 771 | 772);
    meaning(): "TLS v1.2 - legacy_version[0x0303]" | "TLS v1.3 - [0x0304]";
}
/**
 * opaque Random[32]
 */
export class Random extends Uint8Array {
    static "new"(): Random;
    constructor();
}
/**
 * uint8 CipherSuite[2];    Cryptographic suite selector
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
export class CipherSuites extends Minmax {
    static "new"(): CipherSuites;
    constructor();
    ciphers: {
        TLS_AES_128_GCM_SHA256: CipherSuite;
        TLS_AES_256_GCM_SHA384: CipherSuite;
    };
}
import { Uint16 } from "./base.js";
import { Minmax } from "./base.js";
