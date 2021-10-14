import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/css/layout.scss';
import 'lib-flexible';
import './utils/vant.js' // 引入局部ui
import Meta from "vue-meta";
Vue.use(Meta);

// Vue.prototype.$router = router;
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

