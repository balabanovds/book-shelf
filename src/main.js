import Vue from 'vue';
import App from './App.vue';
import ListHeader from './components/ListHeader.vue';
import router from './router';
import VueCompositionAPI from '@vue/composition-api';

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);
Vue.component('ListHeader', ListHeader);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
