import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueOnsen from 'vue-onsenui'; // This already imports 'onsenui'
// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueOnsen,
  render: h => h(App)
}).$mount('#app')
