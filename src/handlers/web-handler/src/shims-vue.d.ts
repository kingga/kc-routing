declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '@akryum/vue-cli-plugin-ssr/client' {
  import VueRouter from 'vue-router';

  interface Args {
    router: VueRouter;
  }

  export function loadAsyncComponents({ router }: Args): any;
}
