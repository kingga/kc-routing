export interface JsonStackFrame {
  columnNumber: number;
  lineNumber: number;
  fileName: string;
  fileContents: string;
  functionName?: string;
  args?: any[];
}

export interface JsonError {
  type: string;
  message: string;
  stack: JsonStackFrame[];
}
