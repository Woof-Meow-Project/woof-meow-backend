import { IValidation } from "typia";
export type IRequestHeadersValidator<T> = IRequestHeadersValidator.IAssert<T> | IRequestHeadersValidator.IIs<T> | IRequestHeadersValidator.IValidate<T>;
export declare namespace IRequestHeadersValidator {
    interface IAssert<T> {
        type: "assert";
        assert: (input: Record<string, string | string[] | undefined>) => T;
    }
    interface IIs<T> {
        type: "is";
        is: (input: Record<string, string | string[] | undefined>) => T | null;
    }
    interface IValidate<T> {
        type: "validate";
        validate: (input: Record<string, string | string[] | undefined>) => IValidation<T>;
    }
}
