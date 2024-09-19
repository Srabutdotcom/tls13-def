export class NamedGroup extends Uint16 {
    constructor(v: any);
    get name(): any;
    #private;
}
export class NamedGroupList extends Struct {
    static list(): NamedGroupList;
    static namedGroup: Enum;
    constructor();
}
import { Uint16 } from "../../src/base.js";
import { Struct } from "../../src/base.js";
import { Enum } from "../../src/base.js";
