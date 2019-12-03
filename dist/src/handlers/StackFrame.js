"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
/*
 * Parse methods taken from stacktrace-parser. It couldn't be imported.
 */
function parseNode(line) {
    const parts = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i.exec(line);
    if (!parts) {
        return null;
    }
    return {
        fileName: parts[2],
        functionName: parts[1] || '<unknown>',
        args: [],
        lineNumber: +parts[3],
        columnNumber: parts[4] ? +parts[4] : 0,
        fileContents: fs_1.readFileSync(parts[2]).toString(),
    };
}
function parse(stack) {
    if (!stack) {
        return [];
    }
    const lines = stack.split('\n');
    return lines.reduce((stack, line) => {
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
function toJson(error) {
    return new Promise((resolve) => {
        resolve({
            type: 'Error',
            message: 'Test',
            stack: parse(error.stack),
        });
    });
}
exports.toJson = toJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tGcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9TdGFja0ZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQWtDO0FBbUNsQzs7R0FFRztBQUVILFNBQVMsU0FBUyxDQUFDLElBQVk7SUFDN0IsTUFBTSxLQUFLLEdBQUcsK0ZBQStGLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpILElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsT0FBTztRQUNMLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVztRQUNyQyxJQUFJLEVBQUUsRUFBRTtRQUNSLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDckIsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsWUFBWSxFQUFFLGlCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0tBQ2hELENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsS0FBYztJQUMzQixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUVELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFaEMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBdUIsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNwRCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEI7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNULENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixNQUFNLENBQUMsS0FBWTtJQUNqQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDO1lBQ04sSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsTUFBTTtZQUNmLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFSRCx3QkFRQyJ9