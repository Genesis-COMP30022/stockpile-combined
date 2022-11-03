import Vue from "vue";
import Router from "vue-router";
import {authGuard} from "@marketredesign/auth0-spa-vue";

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
      path: "/settings",
      name: "settings",
      component: () => import("./components/UserSettingsForm.vue"),
      meta: { title: 'Settings' + SUFFIX },
      beforeEnter: authGuard
    },
  //   {
  //     path: "/",
  //     name: "home",
  //     component: () => import("./views/Home.vue"),
  //     meta: { title: 'Home' + SUFFIX },
  // },
    {
        path: "/",
        name: "dashboard",
        component: () => import("./views/HomeTemp.vue"),
        meta: { title: 'Dashboard' + SUFFIX },
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

