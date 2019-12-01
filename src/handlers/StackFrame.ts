import { StackFrame, fromError } from 'stacktrace-js';
import { readFileSync } from 'fs';
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
 * Convert the stacktrace-js frames into JsonStackFrames.
 * @param stack The stack frame from stacktrace-js.
 */
function toJsonStackFrame(stack: StackFrame[]): JsonStackFrame[] {
  return stack.map((frame): JsonStackFrame => {
    let fileContents = '';

    if (frame.fileName) {
      try {
        fileContents = readFileSync(frame.fileName).toString();
      } catch (_e) {
        // ...
      }
    }

    return {
      columnNumber: frame.columnNumber || 0,
      lineNumber: frame.lineNumber || 0,
      fileName: frame.fileName || '',
      functionName: frame.functionName || '',
      args: frame.args || [],
      fileContents,
    };
  });
}

/**
 * Convert and Error into a JsonError.
 * @param error The error to convert.
 */
export function toJson(error: Error): Promise<JsonError> {
  return new Promise((resolve) => {
    fromError(error)
      .then((stack) => {
        resolve({
          type: error.name,
          message: error.message,
          stack: toJsonStackFrame(stack),
        });
      })
      .catch(() => {
        resolve({
          type: 'unknown',
          message: error.toString(),
          stack: [],
        });
      });
  });
}
