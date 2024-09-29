/**
 * NamedGroup - a single namedGroup i.e. 0x001D - X25519
 */
export class NamedGroup extends Uint16 {
    /**
     * @param {number} v
     */
    static a(v: number): NamedGroup;
    static secp256r1: NamedGroup;
    static secp384r1: NamedGroup;
    static secp521r1: NamedGroup;
    static x25519: NamedGroup;
    static x448: NamedGroup;
    static ffdhe2048: NamedGroup;
    static ffdhe3072: NamedGroup;
    static ffdhe4096: NamedGroup;
    static ffdhe6144: NamedGroup;
    static ffdhe8192: NamedGroup;
    /**
     * @return {string} description
     */
    get name(): string;
    #private;
}
/**
 * NamedGroupList - contain list of NamedGroup from 0x0017 - secp256r1 to 0x0104 - ffdhe8192
 * ```
 * struct {
      NamedGroup named_group_list<2..2^16-1>;
   } NamedGroupList;
   ```
 */
export class NamedGroupList extends Struct {
    /**
     *
     * @return {NamedGroupList}
     */
    static list(): NamedGroupList;
    /**
     * create new NamedGroupList
     * @param  {...NamedGroup} ngl - Uint16 - named_group_list
     */
    static a(...ngl: NamedGroup[]): NamedGroupList;
    static namedGroup: Enum;
    /**
     * @param {Uint8Array} data
     */
    static parse(data: Uint8Array): NamedGroup[];
    /**
     * @param  {...NamedGroup} ngl - Uint16 - named_group_list
     */
    constructor(...ngl: NamedGroup[]);
}
import { Uint16 } from "../../src/base.js";
import { Struct } from "../../src/base.js";
import { Enum } from "../../src/base.js";
