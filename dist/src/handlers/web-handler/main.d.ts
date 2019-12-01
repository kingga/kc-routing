import Vue from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';
import { Store } from 'vuex';
import VueRouter from 'vue-router';
interface CreateAppHooks {
    before: (args: {
        store: Store<unknown>;
        router: VueRouter;
    }) => Promise<void>;
    after: (args: CreateAppResult) => Promise<void>;
}
interface CreateAppResult {
    app: CombinedVueInstance<Vue, object, object, object, Record<never, any>>;
    store: Store<unknown>;
    router: VueRouter;
}
export declare function createApp({ before, after }: CreateAppHooks): Promise<CreateAppResult>;
export {};
