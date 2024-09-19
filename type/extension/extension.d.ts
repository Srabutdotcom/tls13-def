/**
 * ```
 * extension_data: Uint8Array
 * extensionType: ExtensionType
 * new(extension_data, extensionType)=>Extension
 *
 * types: ...ExtensionType
 *
 * extensions: {...}
 * ```
 *
 * struct {
 *
        ExtensionType extension_type;
        opaque extension_data<0..2^16-1>;
    } Extension;
 */
export class Extension extends Struct {
    static types: Enum;
    /**
     *
     * @param {number} extensionType
     * @param {Uint8Array} extension_data
     */
    static "new"(extension_data: Uint8Array, extensionType: number): Extension;
    static extensions: {
        server_name: {
            /**
             *
             * @param  {...string} serverName
             * @returns Extension
             */
            serverNames(...serverName: string[]): Extension;
        };
        supported_groups: Extension;
        signature_algorithms: Extension;
        supported_versions: {
            client: Extension;
            server: Extension;
        };
        psk_key_exchange_modes: Extension;
        key_share: {
            client(): Promise<Extension>;
            server: {
                x25519(): Promise<Extension>;
                p521(): Promise<Extension>;
                p384(): Promise<Extension>;
                p256(): Promise<Extension>;
            };
        };
    };
    /**
     *
     * @param {number} extensionType
     * @param {Uint8Array} extension_data
     */
    constructor(extension_data: Uint8Array, extensionType: number);
}
/**
 * Extension extensions<2..2^16-1>;
 */
export class Extensions extends Minmax {
    /**
     * @param {number} m - minimum length
     * @param {number} M - maximum length
     * @param  {...Extension} extensions
     */
    static "new"(m: number, M: number, ...extensions: Extension[]): Extensions;
    /**
     * @param {number} m - minimum length
     * @param {number} M - maximum length
     * @param  {...Extension} extensions
     */
    constructor(m: number, M: number, ...extensions: Extension[]);
}
import { Struct } from "../../src/base.js";
import { Enum } from "../../src/base.js";
import { Minmax } from "../../src/base.js";
