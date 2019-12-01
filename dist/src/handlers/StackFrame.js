"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stacktrace_js_1 = require("stacktrace-js");
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
function toJson(error) {
    return new Promise((resolve) => {
        stacktrace_js_1.fromError(error)
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
exports.toJson = toJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tGcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9TdGFja0ZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQXNEO0FBQ3RELDJCQUFrQztBQW1DbEM7OztHQUdHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFtQjtJQUMzQyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQWtCLEVBQUU7UUFDekMsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXRCLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJO2dCQUNGLFlBQVksR0FBRyxpQkFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN4RDtZQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNYLE1BQU07YUFDUDtTQUNGO1FBRUQsT0FBTztZQUNMLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWSxJQUFJLENBQUM7WUFDckMsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQztZQUNqQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFO1lBQzlCLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWSxJQUFJLEVBQUU7WUFDdEMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRTtZQUN0QixZQUFZO1NBQ2IsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLE1BQU0sQ0FBQyxLQUFZO0lBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM3Qix5QkFBUyxDQUFDLEtBQUssQ0FBQzthQUNiLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2QsT0FBTyxDQUFDO2dCQUNOLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtnQkFDaEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO2FBQy9CLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDVixPQUFPLENBQUM7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pCLEtBQUssRUFBRSxFQUFFO2FBQ1YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFsQkQsd0JBa0JDIn0=