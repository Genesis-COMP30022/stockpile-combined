import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const SUFFIX = ' | Stockpile';

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/recent",
      name: "recent",
      component: () => import("./components/CardBody.vue"),
      meta: { title: 'Recent purchases' + SUFFIX },
    },
    {
        path: "/",
        name: "home",
        component: () => import("./views/HomeTemp.vue"),
        meta: { title: 'Home' + SUFFIX },
    },
    {
        path: "/new",
        name: "new",
        component: () => import("./components/NewItemForm.vue"),
        meta: { title: 'New purchase' + SUFFIX },
    },
    // {
    //     path: "/settings",
    //     name: "settings",
    //     component: () => import("./views/Settings.vue"),
    //     meta: { title: 'Settings' + SUFFIX },
    // },
  ],
});

