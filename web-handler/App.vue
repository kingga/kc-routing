<template>
  <div class="error-page">
    <nav>
      <div class="error-panel">
        <p v-if="error">{{ error.type }}</p>
        <h4 v-if="error">{{ error.message }}</h4>
      </div>

      <div class="stack-frames">
        <p class="stack-title">
          <small v-if="error">Stack frames ({{ error.stack.length }})</small>
        </p>

        <ul v-if="error">
          <li
            v-for="(item, index) in error.stack"
            :key="index"
            :class="{ active: current === item }"
            @click="current = item">

            <div>
              <span class="frame-number">{{ error.stack.length - index }}</span>
              <span class="frame-method">{{ item.functionName || 'Unknown' }}</span>
            </div>

            <p class="frame-file">{{ truncateStackFile(item) }}</p>
          </li>
        </ul>
      </div>
    </nav>

    <section class="code">
      <p v-if="current">{{ current.fileName }}</p>

      <div
        v-if="current"
        v-highlightjs="{ language: 'typescript', code: current.fileContents, stack: current }"
        class="code-container">

        <div class="line-numbers"></div>

        <pre>
          <code></code>
        </pre>
      </div>

      <p v-if="current">No comments for this stack frame.</p>
    </section>

    <section class="info">
      <h2>View In Editor</h2>

      <a :href="getLinkFor('vscode')">VS Code</a>
      <a :href="getLinkFor('atom')">Atom</a>
      <a :href="getLinkFor('sublime')">Sublime</a>
      <a :href="getLinkFor('emacs')">Emacs</a>
      <a :href="getLinkFor('textmate')">Textmate</a>
      <a :href="getLinkFor('macvim')">MacVim</a>

      <h2>Environment Details</h2>

      <p v-for="(value, key) in env" :key="key">
        <strong>{{ key }}:</strong> {{ typeof value !== 'string' ? JSON.stringify(value) : value }}
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { JsonError, JsonStackFrame } from './structs';
import { CodeEditorFactory } from './classes/Factories/CodeEditorFactory';
import { CodeEditors } from './classes/contracts/ICodeEditorLinkFactory';

interface AppInfo {
  error?: JsonError;
  current?: JsonStackFrame;
  env?: any;
}

export default Vue.extend({
  name: 'app',

  data(): AppInfo {
    return {
      error: undefined,
      current: undefined,
      env: undefined,
    };
  },

  computed: {
    linkFactory() {
      return new CodeEditorFactory();
    },
  },

  methods: {
    truncateStackFile(stack: JsonStackFrame): string {
      const max = 37;
      const { fileName, lineNumber } = stack;
      let file = `${fileName}:${lineNumber}`;

      if (file.length > max) {
        file = `...${file.substr(file.length - (max - 3))}`;
      }

      return file;
    },

    getLinkFor(editor: CodeEditors): string {
        if (!this.current) {
            return '#';
        }

        const e = this.linkFactory.make(editor);

        if (e) {
          const { fileName, lineNumber, columnNumber } = this.current;

          return new e().getLink(fileName, lineNumber, columnNumber);
        }

        return '#';
    }
  },

  mounted(): void {
    this.error = window.error;
    this.current = window.error.stack[0] || undefined;
    this.env = window.env;
  },
});
</script>

<style lang="scss">
@import './node_modules/highlight.js/scss/hybrid.scss';

// Colours
$c-black: #242424;
$c-dk-gray: #2a2a2a;
$c-md-gray: #303030;
$c-code: #333;
$c-lt-gray: #ded8d8;
$c-lt-text: #a29d9d;
$c-cream: #eee;
$c-white: #fafafa;
$c-blue: #72a5d9;
$c-red: #d84f4f;

// Font sizes.
$fs-heading: 1.5em;
$fs-subtitle: 1.1em;
$fs-medium: 1em;
$fs-text: 0.9em;
$fs-small: 0.8em;
$fs-tiny: 0.7em;

$ff-header: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
$ff-text: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;

// @font-face {
//   font-family: 'Fira Code';
//   src: url('./assets/fonts/woff2/FiraCode-Regular.woff2') format('woff2'),
//     url('./assets/fonts/woff/FiraCode-Regular.woff') format('woff');
//   font-weight: 400;
//   font-style: normal;
// }

// @font-face {
//   font-family: 'Fira Code';
//   src: url('./assets/fonts/woff2/FiraCode-Medium.woff2') format('woff2'),
//     url('./assets/fonts/woff/FiraCode-Medium.woff') format('woff');
//   font-weight: 500;
//   font-style: normal;
// }

// @font-face {
//   font-family: 'Fira Code';
//   src: url('./assets/fonts/woff2/FiraCode-Bold.woff2') format('woff2'),
//     url('./assets/fonts/woff/FiraCode-Bold.woff') format('woff');
//   font-weight: 700;
//   font-style: normal;
// }

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background-color: $c-white;
  font-feature-settings: 'calt' 1;
  font-variant-ligatures: contextual;
}

body {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'Fira Code', sans-serif;
  font-weight: normal;

  .error-page {
    display: grid;
    grid-template-areas: 'sidebar code' 'sidebar info';
    grid-template-columns: minmax(350px, 30%) 70%;
    grid-template-rows: auto auto;
    width: 100%;
    height: 100%;

    nav,
    .code,
    .info {
      width: 100%;
      height: 100%;
    }

    nav {
      grid-area: sidebar;
      background-color: $c-lt-gray;

      .error-panel {
        background-color: $c-black;
        background-color: $c-dk-gray;
        color: $c-white;
        padding: 30px 25px;
      }

      .stack-frames {
        padding: 5px;

        .stack-title {
          padding: 0 10px;
          margin-bottom: 5px;
        }

        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
          margin-top: 5px;

          li {
            background-color: $c-cream;
            padding: 20px 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 100%;
            display: block;
            border-bottom: 1px solid $c-lt-gray;

            &.active {
              .frame-method {
                color: $c-blue;
              }
            }

            > div:first-of-type {
              margin-bottom: 10px;
            }

            .frame-number {
              background-color: #e3e3e3;
              color: $c-lt-text;
              padding: 3px 6px;
              border-radius: 100%;
              font-size: $fs-tiny;
            }

            .frame-method {
              margin-left: 5px;
            }

            .frame-file {
              font-size: $fs-small;
              color: $c-lt-text;
            }
          }
        }
      }
    }

    .code {
      grid-area: code;
      background-color: $c-md-gray;
      color: $c-lt-text;
      padding: 30px 50px;

      .code-container {
        position: relative;
        display: flex;
        padding: 5px 10px;
        margin: 7px -10px;
        width: calc(100% + 20px);
        background-color: $c-code;

        .line-numbers {
          width: auto;
        }

        pre,
        ul {
          margin: 0;
          padding: 0;
          font-size: $fs-text;
          white-space: pre;
          font-family: $ff-text;

          // Use pixel line height to avoid problems with this font and 'em' sizes.
          line-height: 18px;
        }

        pre {
          background-color: $c-code;
        }

        ul {
          list-style: none;
          margin-right: 10px;
          margin-block-start: unset;
          margin-block-end: unset;
          margin-inline-start: unset;
          padding-inline-start: unset;

          li {
            display: block;
            text-align: right;

            &.active {
              &::before {
                position: absolute;
                content: ' ';
                background-color: $c-white;
                width: 100%;
                left: 0;
                opacity: 0.1;
              }
            }
          }
        }
      }
    }

    .info {
      grid-area: info;
      padding: 75px 50px;

      p {
        margin: 5px 0;
      }
    }
  }
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-weight: normal;
  margin: 0;
}

h1,
h2 {
  font-size: $fs-heading;
  font-family: 'Fira Code', sans-serif;
  font-weight: 500;
  margin: 10px 0;
}

h3,
h4 {
  font-size: $fs-subtitle;
  margin: 5px 0;
  font-weight: 500;
}

h5,
h6,
p,
span {
  font-size: $fs-text;
}

small {
  font-size: $fs-tiny;
}
</style>
