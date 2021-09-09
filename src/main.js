import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/css/common.scss';
import 'lib-flexible';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import './utils/vant.js' // 引入局部ui

Vue.config.productionTip = false;
Vue.use(Mint);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
