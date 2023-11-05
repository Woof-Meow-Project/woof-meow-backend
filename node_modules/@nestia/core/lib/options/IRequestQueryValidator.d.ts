import { IValidation } from "typia";
export type IRequestQueryValidator<T> = IRequestQueryValidator.IAssert<T> | IRequestQueryValidator.IIs<T> | IRequestQueryValidator.IValidate<T>;
export declare namespace IRequestQueryValidator {
    interface IAssert<T> {
        type: "assert";
        assert: (input: URLSearchParams) => T;
    }
    interface IIs<T> {
        type: "is";
        is: (input: URLSearchParams) => T | null;
    }
    interface IValidate<T> {
        type: "validate";
        validate: (input: URLSearchParams) => IValidation<T>;
    }
}
