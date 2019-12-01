import { loadAsyncComponents } from '@akryum/vue-cli-plugin-ssr/client';

import { createApp } from './main';

createApp({
  async before({ router }) {
    await loadAsyncComponents({ router });
  },

  async after({ app, router, store }) {
    store.replaceState(window.__INITIAL_STATE__);
    router.onReady(() => {
      app.$mount('#app');
    });
  },
});
