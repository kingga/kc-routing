"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { StackFrame, fromError } from '~@/stacktrace-js/stacktrace.js';
// import { StackFrame, fromError } from 'stacktrace-js';
const fs_1 = require("fs");
/**
 * Convert the stacktrace-js frames into JsonStackFrames.
 * @param stack The stack frame from stacktrace-js.
 */
function toJsonStackFrame(stack) {
    return stack.map((frame) => {
        let fileContents = '';
        if (frame.fileName) {
            try {
                fileContents = fs_1.readFileSync(frame.fileName).toString();
            }
            catch (_e) {
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
function toJson(_error) {
    return new Promise((resolve) => {
        resolve({
            type: 'Error',
            message: 'Test',
            stack: toJsonStackFrame([
                {
                    columnNumber: 2,
                    lineNumber: 4,
                    fileName: 'D:\\Development\\kings-collections\\kc-routing\\src\\handlers\\StackFrame.ts',
                    functionName: 'functionName'
                },
                {
                    columnNumber: 15,
                    lineNumber: 5,
                    fileName: 'D:\\Development\\kings-collections\\kc-routing\\src\\handlers\\JsonHandler.ts',
                    functionName: 'foo'
                },
                {
                    columnNumber: 100,
                    lineNumber: 30,
                    fileName: 'D:\\Development\\kings-collections\\kc-routing\\src\\Router.ts',
                    functionName: 'bar'
                },
            ]),
        });
        // fromError(error)
        //   .then((stack: StackFrame[]) => {
        //     resolve({
        //       type: error.name,
        //       message: error.message,
        //       stack: toJsonStackFrame(stack),
        //     });
        //   })
        //   .catch(() => {
        //     resolve({
        //       type: 'unknown',
        //       message: error.toString(),
        //       stack: [],
        //     });
        //   });
    });
}
exports.toJson = toJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tGcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9TdGFja0ZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEVBQTBFO0FBQzFFLHlEQUF5RDtBQUN6RCwyQkFBa0M7QUFxQ2xDOzs7R0FHRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsS0FBbUI7SUFDM0MsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFrQixFQUFFO1FBQ3pDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV0QixJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSTtnQkFDRixZQUFZLEdBQUcsaUJBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDeEQ7WUFBQyxPQUFPLEVBQUUsRUFBRTtnQkFDWCxNQUFNO2FBQ1A7U0FDRjtRQUVELE9BQU87WUFDTCxZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDO1lBQ3JDLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUM7WUFDakMsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRTtZQUM5QixZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVksSUFBSSxFQUFFO1lBQ3RDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDdEIsWUFBWTtTQUNiLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixNQUFNLENBQUMsTUFBYTtJQUNsQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDO1lBQ04sSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsTUFBTTtZQUNmLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQztnQkFDdEI7b0JBQ0UsWUFBWSxFQUFFLENBQUM7b0JBQ2YsVUFBVSxFQUFFLENBQUM7b0JBQ2IsUUFBUSxFQUFFLDhFQUE4RTtvQkFDeEYsWUFBWSxFQUFFLGNBQWM7aUJBQzdCO2dCQUNEO29CQUNFLFlBQVksRUFBRSxFQUFFO29CQUNoQixVQUFVLEVBQUUsQ0FBQztvQkFDYixRQUFRLEVBQUUsK0VBQStFO29CQUN6RixZQUFZLEVBQUUsS0FBSztpQkFDcEI7Z0JBQ0Q7b0JBQ0UsWUFBWSxFQUFFLEdBQUc7b0JBQ2pCLFVBQVUsRUFBRSxFQUFFO29CQUNkLFFBQVEsRUFBRSxnRUFBZ0U7b0JBQzFFLFlBQVksRUFBRSxLQUFLO2lCQUNwQjthQUNGLENBQUM7U0FDSCxDQUFDLENBQUM7UUFDSCxtQkFBbUI7UUFDbkIscUNBQXFDO1FBQ3JDLGdCQUFnQjtRQUNoQiwwQkFBMEI7UUFDMUIsZ0NBQWdDO1FBQ2hDLHdDQUF3QztRQUN4QyxVQUFVO1FBQ1YsT0FBTztRQUNQLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIseUJBQXlCO1FBQ3pCLG1DQUFtQztRQUNuQyxtQkFBbUI7UUFDbkIsVUFBVTtRQUNWLFFBQVE7SUFDVixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUExQ0Qsd0JBMENDIn0=