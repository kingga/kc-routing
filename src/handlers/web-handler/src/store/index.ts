import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { JsonError } from '../../../Error';
import { JsonStackFrame } from '../../../StackFrame';

interface AppInfo {
  error?: JsonError;
  current?: JsonStackFrame;
}

Vue.use(Vuex);

export function createStore(): Store<unknown> {
  return new Vuex.Store({
    state(): AppInfo {
      return {
        error: undefined,
        current: undefined,
      };
    },

    mutations: {
      setError(state: any, error: JsonError): void {
        state.error = error;
      },
    },

    actions: {},

    modules: {},
  });
}
