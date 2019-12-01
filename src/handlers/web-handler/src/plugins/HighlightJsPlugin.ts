import _Vue from 'vue';
import { DirectiveBinding } from 'vue/types/options';
import { registerLanguage, highlightBlock, HLJSStatic, IModeBase } from 'highlightjs';
import { JsonStackFrame } from '../../../StackFrame';

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

async function highlight(el: HTMLElement, binding: BindingValues): Promise<void> {
  return new Promise((resolve, reject) => {
    const highlightCode = () => {
      const truncated = truncateCode(binding.code, binding.stack);
      const code = el.querySelector('pre');
      const lineNumbers = el.querySelector('.line-numbers');

      if (code) {
        code.textContent = truncated.code;
        highlightBlock(code);
      }

      if (lineNumbers && truncated.lastLine - truncated.firstLine > 0) {
        let html = '<ul><li>';
        const lines: number[] = Array(truncated.maxLines).fill(0);
        html += lines.map((_c, i: number) => truncated.firstLine + i).join('</li><li>');
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
      import(`highlight.js/lib/languages/${binding.language}.js`)
        .then((language) => {
          languages[binding.language] = language.default;
          registerLanguage(binding.language, languages[binding.language]);
          highlightCode();
          resolve();
        })
        .catch(() => reject('Could not import the language file.'));
    } else {
      highlightCode();
      resolve();
    }
  });
}

export default function HighlightJsPlugin(Vue: typeof _Vue): void {
  Vue.directive('highlightjs', {
    async bind(el: HTMLElement, binding: DirectiveBinding) {
      try {
        await highlight(el, binding.value);
      } catch (error) {
        /* eslint-disable */
        console.error(error);
      }
    },

    async componentUpdated(el: HTMLElement, binding: DirectiveBinding) {
      const sameCode = binding.oldValue.code === binding.value.code;
      const sameLanguage = binding.oldValue.language === binding.value.language;

      if (sameCode && sameLanguage) {
        return;
      }

      try {
        await highlight(el, binding.value);
      } catch (error) {
        /* eslint-disable */
        console.error(error);
      }
    },
  });
}
