import _Vue from 'vue';
import { DirectiveBinding } from 'vue/types/options';
import { highlight as highlightJs, HLJSStatic, IModeBase, registerLanguage } from 'highlight.js';
// import { JsonStackFrame } from '@kingga/kc-routing';
import TsLanguage from 'highlight.js/lib/languages/typescript';

type JsonStackFrame = any;

interface BindingValues {
  language: string;
  code: string;
  stack: JsonStackFrame;
}

interface TruncatedCode {
  code: string;
  firstLine: number;
  lastLine: number;
  maxLines: number;
}

interface LanguageList {
  [key: string]: (hljs?: HLJSStatic) => IModeBase;
}

const languages: LanguageList = {};

function truncateCode(code: string, stack: JsonStackFrame): TruncatedCode {
  // Truncate the code down to 'x' amount of lines just incase the file is really large.
  // This should get 'x' amount before stack line and 'x' amount after, evenly
  // spreading the lines out around it.
  const maxLines = 26;
  const eitherSide = Math.ceil(maxLines / 2);
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

function highlight(el: HTMLElement, binding: BindingValues): void {
  const highlightCode = () => {
    let truncated: TruncatedCode | undefined;
    // const truncated = truncateCode(binding.code, binding.stack);
    const code = el.querySelector('pre');
    const lineNumbers = el.querySelector('.line-numbers');

    if (code) {
      const highlightedCode = highlightJs(binding.language, binding.code, true).value;
      truncated = truncateCode(highlightedCode, binding.stack);
      code.innerHTML = truncated.code;
      // code.innerHTML = highlightedCode;
    }

    if (truncated && lineNumbers && truncated.lastLine - truncated.firstLine > 0) {
      let html = '<ul><li>';
      const lines: number[] = Array(truncated.maxLines).fill(0);
      html += lines.map((_c, i: number) => (truncated || { firstLine: 0 }).firstLine + i).join('</li><li>');
      html += '</li></ul>';

      lineNumbers.innerHTML = html;

      // Find the active line and highlight it.
      const lineNumber = binding.stack.lineNumber - truncated.firstLine;
      const line = lineNumbers.querySelector(`li:nth-of-type(${lineNumber})`);

      if (line) {
        line.classList.add('active');
      }
    }
  };

  if (languages[binding.language] === undefined) {
    registerLanguage('typescript', TsLanguage);
    languages[binding.language] = TsLanguage;
    highlightCode();
  } else {
    highlightCode();
  }
}

export default function HighlightJsPlugin(Vue: typeof _Vue): void {
  Vue.directive('highlightjs', {
    bind(el: HTMLElement, binding: DirectiveBinding) {
      highlight(el, binding.value);
    },

    componentUpdated(el: HTMLElement, binding: DirectiveBinding) {
      const sameCode = binding.oldValue.code === binding.value.code;
      const sameLanguage = binding.oldValue.language === binding.value.language;

      if (sameCode && sameLanguage) {
        return;
      }

      highlight(el, binding.value);
    },
  });
}
