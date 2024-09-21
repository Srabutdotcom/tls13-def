/**
 * NamedGroup - a single namedGroup i.e. 0x001D - X25519
 */
export class NamedGroup extends Uint16 {
    constructor(v: any);
    get name(): any;
    #private;
}
/**
 * NamedGroupList - contain list of NamedGroup from 0x0017 - secp256r1 to 0x0104 - ffdhe8192
 */
export class NamedGroupList extends Struct {
    static list(): NamedGroupList;
    static namedGroup: Enum;
    constructor();
}
import { Uint16 } from "../../src/base.js";
import { Struct } from "../../src/base.js";
import { Enum } from "../../src/base.js";
