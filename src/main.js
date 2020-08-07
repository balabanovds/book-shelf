import Vue from 'vue';
import App from './App.vue';
import ListHeader from './components/ListHeader.vue';
import router from './router';
import store from './store';
import VueCompositionAPI from '@vue/composition-api';

Vue.config.productionTip = false;

export const HOST = process.env.VUE_APP_HOST
export const PORT = process.env.VUE_APP_PORT

Vue.use(VueCompositionAPI);
Vue.component('ListHeader', ListHeader);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
