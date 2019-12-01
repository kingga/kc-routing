import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import HighlightJsPlugin from './plugins/HighlightJsPlugin';
import { CombinedVueInstance } from 'vue/types/vue';
import { Store } from 'vuex';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;

Vue.use(HighlightJsPlugin);

interface CreateAppHooks {
  before: (args: { store: Store<unknown>, router: VueRouter }) => Promise<void>;
  after: (args: CreateAppResult) => Promise<void>;
}

interface CreateAppResult {
  app: CombinedVueInstance<Vue, object, object, object, Record<never, any>>;
  store: Store<unknown>;
  router: VueRouter;
}

export async function createApp({ before = () => Promise.resolve(), after = () => Promise.resolve() }: CreateAppHooks): Promise<CreateAppResult> {
  const store = createStore();
  const router = createRouter();

  await before({ store, router });

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });

  const result = { app, router, store };

  await after(result);

  return result;
}
