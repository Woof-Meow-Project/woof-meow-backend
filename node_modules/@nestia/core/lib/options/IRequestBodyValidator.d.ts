import { IValidation } from "typia";
export type IRequestBodyValidator<T> = IRequestBodyValidator.IAssert<T> | IRequestBodyValidator.IIs<T> | IRequestBodyValidator.IValidate<T>;
export declare namespace IRequestBodyValidator {
    interface IAssert<T> {
        type: "assert";
        assert: (input: T) => T;
    }
    interface IIs<T> {
        type: "is";
        is: (input: T) => boolean;
    }
    interface IValidate<T> {
        type: "validate";
        validate: (input: T) => IValidation<T>;
    }
}
