import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/css/common.scss';
import 'lib-flexible';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import './utils/vant.js' // 引入局部ui

let query = window.location.search;
query = query.slice(1);
let arr = query.split('&');
let userId = '';
arr.forEach((item) => {
  if(item.includes('userId')){
    userId = item.split('=')[1];
    window.localStorage.setItem('vinUserId',userId);
  }
})
if(!userId){
  console.log('用户内码为空')
}
// Vue.prototype.$router = router;
Vue.config.productionTip = false;
Vue.use(Mint);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

