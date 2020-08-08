import Vue from 'vue';
import App from './App.vue';
import ListHeader from './components/ListHeader.vue';
import router from './router';
import store from './store';
import VueCompositionAPI from '@vue/composition-api';

Vue.config.productionTip = false;

const ADDR = process.env.VUE_APP_ADDR
const PROTO = process.env.VUE_APP_PROTO

export const BASE_URL = `${PROTO}://${ADDR}`

Vue.use(VueCompositionAPI);
Vue.component('ListHeader', ListHeader);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
