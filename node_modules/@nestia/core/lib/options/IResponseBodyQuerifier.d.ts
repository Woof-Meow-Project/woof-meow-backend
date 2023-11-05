import { IValidation } from "typia";
export type IResponseBodyQuerifier<T> = IResponseBodyquerifier.IStringify<T> | IResponseBodyquerifier.IIs<T> | IResponseBodyquerifier.IAssert<T> | IResponseBodyquerifier.IValidate<T>;
export declare namespace IResponseBodyquerifier {
    interface IStringify<T> {
        type: "stringify";
        stringify: (input: T) => URLSearchParams;
    }
    interface IIs<T> {
        type: "is";
        is: (input: T) => URLSearchParams | null;
    }
    interface IAssert<T> {
        type: "assert";
        assert: (input: T) => URLSearchParams;
    }
    interface IValidate<T> {
        type: "validate";
        validate: (input: T) => IValidation<URLSearchParams>;
    }
}
