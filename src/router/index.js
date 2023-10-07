import Vue from "vue";
import VueRouter from "vue-router";
import Entry from "../views/entry.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dist",
    redirect: "/",
  },
  {
    path: "/",
    name: "Entry",
    component: Entry,
    meta: { title: "车辆评估", keepAlive: true },
  },
  {
    path: "/details",
    name: "Details",
    meta: { title: "评估详情", keepAlive: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Details.vue"),
  },
  // {
  //   path: "/list",
  //   name: "List",
  //   meta: { title: "历史查询" },
  //   component: () => import("../views/List.vue"),
  // },
  {
    path: "/evaluate",
    name: "Evaluate",
    meta: { title: "车辆评估", keepAlive: false },
    component: () => import("../views/Evaluate.vue"),
  },
  {
    path: "/attachment",
    name: "Attachment",
    meta: { title: "附件评估", keepAlive: false },
    component: () => import("../views/Attachment.vue"),
  },
  {
    path: "/dynamicAttachment",
    name: "DynamicAttachment",
    meta: { title: "附件评估", keepAlive: false },
    component: () => import("../views/DynamicAttachment.vue"),
  },
];

const router = new VueRouter({
  // mode:'history',
  routes,
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
router.install = (Vue) => {
  Vue.component(router, router);
};

export default router;
