export class SignatureAlgorithm extends Uint16 {
    constructor(value: any);
}
/**
 * SignatureSchemeList
 */
export class SignatureSchemeList extends Struct {
    static list(): SignatureSchemeList;
    static "new"(): SignatureSchemeList;
    static SignatureScheme: Enum;
    constructor();
}
import { Struct } from "../../src/base.js";
import { Enum, Uint16 } from "../../src/base.js";
