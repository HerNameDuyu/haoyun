import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/dist",
    redirect: "/"
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{ title : "车辆评估",keepAlive:false },
  },
  {
    path: "/details",
    name: "Details",
    meta:  {title : "车辆详情",keepAlive:true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Details.vue"),
  },
  {
    path:"/list",
    name:"List",
    meta: { title : "历史查询" },
    component: () =>
      import ("../views/List.vue")
  },
  {
    path:"/evaluate",
    name:"Evaluate",
    meta: { title : "车辆评估" },
    component: () =>
      import ("../views/Evaluate.vue")
  }
];

const router = new VueRouter({
  // mode:'history',
  routes,
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.install = (Vue)=>{
  Vue.component(router,router)
}

export default router;
