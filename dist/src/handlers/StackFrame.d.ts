import { JsonError } from './Error';
export interface JsonStackFrame {
    /**
     * The column number which the error occured on.
     */
    columnNumber: number;
    /**
     * The line number which the error occured on.
     */
    lineNumber: number;
    /**
     * The file the error occured in.
     */
    fileName: string;
    /**
     * The name of the function which the error occured in.
     */
    functionName: string;
    /**
     * The argument which were passed into this function.
     */
    args: any[];
    /**
     * The contents of this.fileName.
     */
    fileContents: string;
}
/**
 * Convert and Error into a JsonError.
 * @param error The error to convert.
 */
export declare function toJson(error: Error): Promise<JsonError>;
