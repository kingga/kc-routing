import { JsonStackFrame } from './StackFrame';

export interface JsonError {
  /**
   * The type of error, e.g. 'Error', 'unknown'.
   */
  type: string;

  /**
   * The message which came with this JSON error.
   */
  message: string;

  /**
   * The stack frames of this error.
   */
  stack: JsonStackFrame[];
}
