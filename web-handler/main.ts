import Vue from 'vue';
import App from './App.vue';
import HighlightJsPlugin from './plugins/HighlightJsPlugin';

Vue.config.productionTip = false;

Vue.use(HighlightJsPlugin);

const app = new Vue({
    render: (h) => h(App),
}).$mount('#app');

console.log({
  App,
  vue: app,
  HighlightJsPlugin,
});
