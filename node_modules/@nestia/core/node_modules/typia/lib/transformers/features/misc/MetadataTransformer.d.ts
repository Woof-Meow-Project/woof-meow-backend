import ts from "typescript";
import { IProject } from "../../IProject";
export declare namespace MetadataTransformer {
    const transform: ({ checker }: IProject) => (expression: ts.CallExpression) => ts.Expression;
}
