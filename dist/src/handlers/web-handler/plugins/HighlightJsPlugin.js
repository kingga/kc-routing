"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const highlight_js_1 = require("highlight.js");
// import { JsonStackFrame } from '@kingga/kc-routing';
const typescript_1 = require("highlight.js/lib/languages/typescript");
const languages = {};
function truncateCode(code, stack) {
    // Truncate the code down to 'x' amount of lines just incase the file is really large.
    // This should get 'x' amount before stack line and 'x' amount after, evenly
    // spreading the lines out around it.
    const maxLines = 26;
    const eitherSide = maxLines / 2;
    const { lineNumber } = stack;
    const diff = eitherSide - lineNumber;
    const firstLine = diff > 0 ? 0 : lineNumber - eitherSide;
    const lastLine = diff > 0 ? lineNumber + eitherSide + diff : lineNumber + eitherSide;
    code = code
        .split('\n')
        .filter((_line, index) => index >= firstLine && index <= lastLine)
        .join('\n');
    return { code, firstLine, lastLine, maxLines: code.split('\n').length };
}
function highlight(el, binding) {
    const highlightCode = () => {
        const truncated = truncateCode(binding.code, binding.stack);
        const code = el.querySelector('pre');
        const lineNumbers = el.querySelector('.line-numbers');
        if (code) {
            // code.textContent = truncated.code;
            const highlightedCode = highlight_js_1.highlight(binding.language, truncated.code, true).value;
            code.innerHTML = highlightedCode;
        }
        if (lineNumbers && truncated.lastLine - truncated.firstLine > 0) {
            let html = '<ul><li>';
            const lines = Array(truncated.maxLines).fill(0);
            html += lines.map((_c, i) => truncated.firstLine + i).join('</li><li>');
            html += '</li></ul>';
            lineNumbers.innerHTML = html;
            // Find the active line and highlight it.
            const line = lineNumbers.querySelector(`li:nth-of-type(${binding.stack.lineNumber})`);
            if (line) {
                line.classList.add('active');
            }
        }
    };
    if (languages[binding.language] === undefined) {
        highlight_js_1.registerLanguage('typescript', typescript_1.default);
        languages[binding.language] = typescript_1.default;
        highlightCode();
    }
    else {
        highlightCode();
    }
}
function HighlightJsPlugin(Vue) {
    Vue.directive('highlightjs', {
        bind(el, binding) {
            highlight(el, binding.value);
        },
        componentUpdated(el, binding) {
            const sameCode = binding.oldValue.code === binding.value.code;
            const sameLanguage = binding.oldValue.language === binding.value.language;
            if (sameCode && sameLanguage) {
                return;
            }
            highlight(el, binding.value);
        },
    });
}
exports.default = HighlightJsPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlnaGxpZ2h0SnNQbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvaGFuZGxlcnMvd2ViLWhhbmRsZXIvcGx1Z2lucy9IaWdobGlnaHRKc1BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLCtDQUFpRztBQUNqRyx1REFBdUQ7QUFDdkQsc0VBQStEO0FBcUIvRCxNQUFNLFNBQVMsR0FBaUIsRUFBRSxDQUFDO0FBRW5DLFNBQVMsWUFBWSxDQUFDLElBQVksRUFBRSxLQUFxQjtJQUN2RCxzRkFBc0Y7SUFDdEYsNEVBQTRFO0lBQzVFLHFDQUFxQztJQUNyQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEIsTUFBTSxVQUFVLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNoQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQzdCLE1BQU0sSUFBSSxHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDckMsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ3pELE1BQU0sUUFBUSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBRXJGLElBQUksR0FBRyxJQUFJO1NBQ1IsS0FBSyxDQUFDLElBQUksQ0FBQztTQUNYLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLFFBQVEsQ0FBQztTQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFZCxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FB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