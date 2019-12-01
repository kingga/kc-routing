<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app',
});
</script>

<style lang="scss">
// @import '~@/highlight.js/scss/hybrid.scss';

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

@font-face {
  font-family: 'Fira Code';
  src: url('./assets/fonts/woff2/FiraCode-Regular.woff2') format('woff2'),
    url('./assets/fonts/woff/FiraCode-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Fira Code';
  src: url('./assets/fonts/woff2/FiraCode-Medium.woff2') format('woff2'),
    url('./assets/fonts/woff/FiraCode-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Fira Code';
  src: url('./assets/fonts/woff2/FiraCode-Bold.woff2') format('woff2'),
    url('./assets/fonts/woff/FiraCode-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
}

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
    grid-template-columns: minmax(350px, 30%) 1fr;
    grid-template-rows: 65% auto;
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

/* Code Formatting */

/*

vim-hybrid theme by w0ng (https://github.com/w0ng/vim-hybrid)

*/

/*background color*/
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #1d1f21;
}

/*selection color*/
.hljs::selection,
.hljs span::selection {
  background: #373b41;
}

.hljs::-moz-selection,
.hljs span::-moz-selection {
  background: #373b41;
}

/*foreground color*/
.hljs {
  color: #c5c8c6;
}

/*color: fg_yellow*/
.hljs-title,
.hljs-name {
  color: #f0c674;
}

/*color: fg_comment*/
.hljs-comment,
.hljs-meta,
.hljs-meta .hljs-keyword {
  color: #707880;
}

/*color: fg_red*/
.hljs-number,
.hljs-symbol,
.hljs-literal,
.hljs-deletion,
.hljs-link {
 color: #cc6666
}

/*color: fg_green*/
.hljs-string,
.hljs-doctag,
.hljs-addition,
.hljs-regexp,
.hljs-selector-attr,
.hljs-selector-pseudo {
  color: #b5bd68;
}

/*color: fg_purple*/
.hljs-attribute,
.hljs-code,
.hljs-selector-id {
 color: #b294bb;
}

/*color: fg_blue*/
.hljs-keyword,
.hljs-selector-tag,
.hljs-bullet,
.hljs-tag {
 color: #81a2be;
}

/*color: fg_aqua*/
.hljs-subst,
.hljs-variable,
.hljs-template-tag,
.hljs-template-variable {
  color: #8abeb7;
}

/*color: fg_orange*/
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-quote,
.hljs-section,
.hljs-selector-class {
  color: #de935f;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
</style>
