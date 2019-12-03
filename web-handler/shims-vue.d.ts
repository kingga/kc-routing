declare module '*.vue' {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import Vue from 'vue';
  export default Vue;
}

declare module 'highlight.js/lib/languages/typescript' {
  interface HljsLanguageKeywords {
    keyword: string;
    literal: string;
    build_in: string;
  }

  interface HljsContains {
    begin: RegExp;
    end?: RegExp;
    className?: string;
    beginKeywords: string,
    keywords?: HljsLanguageKeywords[];
    illegal?: string;
    contains?: HljsContains[];
  }

  interface HljsLangauge {
    aliases: string[];
    keywords: HljsLanguageKeywords;
    contains: HljsContains[];
  }

  export default function (hljs: any): HljsLangauge;
}
