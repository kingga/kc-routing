"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
/*
 * Parse methods taken from stacktrace-parser. It couldn't be imported.
 */
function parseNode(line) {
    let fileContents = '';
    const parts = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i.exec(line);
    if (!parts) {
        return null;
    }
    try {
        fileContents = fs_1.readFileSync(parts[2]).toString();
    }
    catch (_e) {
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
exports.toJson = toJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tGcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9TdGFja0ZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQWtDO0FBbUNsQzs7R0FFRztBQUVILFNBQVMsU0FBUyxDQUFDLElBQVk7SUFDN0IsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLE1BQU0sS0FBSyxHQUFHLCtGQUErRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV6SCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQUk7UUFDRixZQUFZLEdBQUcsaUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNsRDtJQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ1gsWUFBWSxHQUFHLEVBQUUsQ0FBQztLQUNuQjtJQUVELE9BQU87UUFDTCxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsQixZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVc7UUFDckMsSUFBSSxFQUFFLEVBQUU7UUFDUixVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLFlBQVk7S0FDYixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsS0FBSyxDQUFDLEtBQWM7SUFDM0IsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWhDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQXVCLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDcEQsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9CLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IsTUFBTSxDQUFDLEtBQXFCO0lBQzFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM3QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7UUFFRCxPQUFPLENBQUM7WUFDTixJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztZQUN0QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBWkQsd0JBWUMifQ==