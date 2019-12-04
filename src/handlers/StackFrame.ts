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

/*
 * Parse methods taken from stacktrace-parser. It couldn't be imported.
 */

function parseNode(line: string): JsonStackFrame | null {
  let fileContents = '';
  const parts = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i.exec(line);

  if (!parts) {
    return null;
  }

  try {
    fileContents = readFileSync(parts[2]).toString();
  } catch (_e) {
    fileContents = '';
  }

  return {
    fileName: parts[2],
    functionName: parts[1] || '<unknown>',
    args: [],
    lineNumber: +parts[3],
    columnNumber: parts[4] ? +parts[4] : 0,
    fileContents,
  };
}

function parse(stack?: string): JsonStackFrame[] {
  if (!stack) {
    return [];
  }

  const lines = stack.split('\n');

  return lines.reduce((stack: JsonStackFrame[], line) => {
    const parsed = parseNode(line);

    if (parsed !== null) {
      stack.push(parsed);
    }

    return stack;
  }, []);
}

/**
 * Convert and Error into a JsonError.
 * @param error The error to convert.
 */
export function toJson(error: Error | string): Promise<JsonError> {
  return new Promise((resolve) => {
    if (typeof error === 'string') {
      error = new Error(error);
    }

    resolve({
      type: 'Error',
      message: error.message,
      stack: parse(error.stack),
    });
  });
}
