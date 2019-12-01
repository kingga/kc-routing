"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const highlight_js_1 = require("highlight.js");
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
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const highlightCode = () => {
                const truncated = truncateCode(binding.code, binding.stack);
                const code = el.querySelector('pre');
                const lineNumbers = el.querySelector('.line-numbers');
                if (code) {
                    code.textContent = truncated.code;
                    highlight_js_1.highlightBlock(code);
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
                Promise.resolve().then(() => require(`highlight.js/lib/languages/${binding.language}.js`)).then((language) => {
                    languages[binding.language] = language.default;
                    highlight_js_1.registerLanguage(binding.language, languages[binding.language]);
                    highlightCode();
                    resolve();
                })
                    .catch(() => reject('Could not import the language file.'));
            }
            else {
                highlightCode();
                return resolve();
            }
        });
    });
}
function HighlightJsPlugin(Vue) {
    Vue.directive('highlightjs', {
        bind(el, binding) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield highlight(el, binding.value);
                }
                catch (error) {
                    /* eslint-disable */
                    console.error(error);
                }
            });
        },
        componentUpdated(el, binding) {
            return __awaiter(this, void 0, void 0, function* () {
                const sameCode = binding.oldValue.code === binding.value.code;
                const sameLanguage = binding.oldValue.language === binding.value.language;
                if (sameCode && sameLanguage) {
                    return;
                }
                try {
                    yield highlight(el, binding.value);
                }
                catch (error) {
                    /* eslint-disable */
                    console.error(error);
                }
            });
        },
    });
}
exports.default = HighlightJsPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlnaGxpZ2h0SnNQbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvaGFuZGxlcnMvd2ViLWhhbmRsZXIvcGx1Z2lucy9IaWdobGlnaHRKc1BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLCtDQUF1RjtBQW9CdkYsTUFBTSxTQUFTLEdBQWlCLEVBQUUsQ0FBQztBQUVuQyxTQUFTLFlBQVksQ0FBQyxJQUFZLEVBQUUsS0FBcUI7SUFDdkQsc0ZBQXNGO0lBQ3RGLDRFQUE0RTtJQUM1RSxxQ0FBcUM7SUFDckMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sVUFBVSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDaEMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUM3QixNQUFNLElBQUksR0FBRyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ3JDLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUN6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUVyRixJQUFJLEdBQUcsSUFBSTtTQUNSLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLElBQUksU0FBUyxJQUFJLEtBQUssSUFBSSxRQUFRLENBQUM7U0FDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWQsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUks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