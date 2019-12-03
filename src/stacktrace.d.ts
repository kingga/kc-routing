// declare namespace StackTrace {
//   export interface SourceCache {
//     [key: string]: string | Promise<string>;
//   }

//   export interface StackTraceOptions {
//     filter?: (stackFrame: StackFrame) => boolean;
//     sourceCache?: SourceCache;
//     offline?: boolean;
//   }

//   export interface StackFrame {
//     constructor(object: StackFrame): StackFrame;
//     columnNumber?: number;
//     lineNumber?: number;
//     fileName?: string;
//     functionName?: string;
//     source?: string;
//     args?: any[];
//     toString(): string;
//   }

//   export function fromError(error: Error, options?: StackTraceOptions): Promise<StackFrame[]>;
// }

// declare module '~@/stacktrace-js/stacktrace.js' {
//   export = StackTrace;
// }
