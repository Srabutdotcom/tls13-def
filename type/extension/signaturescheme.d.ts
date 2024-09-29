export class SignatureScheme extends Uint16 {
    /**
     * @param {number} value
     * @return
     */
    static a(value: number): SignatureScheme;
    static ecdsa_secp256r1_sha256: SignatureScheme;
    static ecdsa_secp384r1_sha384: SignatureScheme;
    static ecdsa_secp521r1_sha512: SignatureScheme;
    static rsa_pss_rsae_sha256: SignatureScheme;
    static rsa_pss_rsae_sha384: SignatureScheme;
    static rsa_pss_rsae_sha512: SignatureScheme;
    static rsa_pss_pss_sha256: SignatureScheme;
    static rsa_pss_pss_sha384: SignatureScheme;
    static rsa_pss_pss_sha512: SignatureScheme;
    /**
     * @return {string}
     */
    get name(): string;
    #private;
}
/**
 * SignatureSchemeList
 */
export class SignatureSchemeList extends Struct {
    static list(): SignatureSchemeList;
    static a(): SignatureSchemeList;
    static signatureScheme: Enum;
    /**
     * @param {Uint8Array} data
     */
    static parse(data: Uint8Array): SignatureScheme[];
    /**
     * @param  {...SignatureScheme} ss
     */
    constructor(...ss: SignatureScheme[]);
}
import { Uint16 } from "../../src/base.js";
import { Struct } from "../../src/base.js";
import { Enum } from "../../src/base.js";
