import Vue from "vue";
import Router from "vue-router";
import {authGuard} from "@marketredesign/auth0-spa-vue";

Vue.use(Router);

const SUFFIX = ' | Stockpile';

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landingpage",
      component: () => import("./views/LandingPage.vue"),
      meta: { title: 'Landing page' + SUFFIX },
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("./views/AuthPage.vue"),
      meta: { title: 'Auth' + SUFFIX },
      beforeEnter: authGuard
    },
    {
      path: "/recent",
      name: "recent",
      component: () => import("./components/CardBody.vue"),
      meta: { title: 'Recent purchases' + SUFFIX },
      beforeEnter: authGuard
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
        path: "/dashboard",
        name: "dashboard",
        component: () => import("./views/HomeTemp.vue"),
        meta: { title: 'Dashboard' + SUFFIX },
        beforeEnter: authGuard
    },
    {
        path: "/new",
        name: "new",
        component: () => import("./components/NewItemForm.vue"),
        meta: { title: 'New purchase' + SUFFIX },
        beforeEnter: authGuard
    },
    // {
    //     path: "/settings",
    //     name: "settings",
    //     component: () => import("./views/Settings.vue"),
    //     meta: { title: 'Settings' + SUFFIX },
    // },
  ],
});
export default router;