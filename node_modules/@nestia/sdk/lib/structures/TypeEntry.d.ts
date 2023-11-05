import ts from "typescript";
export declare class TypeEntry {
    readonly type: ts.Type;
    readonly nullable: boolean;
    readonly required: boolean;
    constructor(type: ts.Type, nullable: boolean, required: boolean);
    equals(obj: TypeEntry): boolean;
    hashCode(): number;
}
