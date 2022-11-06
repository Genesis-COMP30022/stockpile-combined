import Vue from "vue";
import Router from "vue-router";
import {authGuard} from "@marketredesign/auth0-spa-vue";


Vue.use(Router);

const SUFFIX = ' | Stockpile';

const DEFAULT_TITLE = 'Stockpile';


var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landingpage",
      component: () => import("./views/LandingPage.vue"),
      meta: { title: 'Home' + SUFFIX },
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
    {
        path: "/search",
        name: "search",
        component: () => import("./components/AdvancedSearch.vue"),
        meta: { title: 'Search' + SUFFIX },
        beforeEnter: authGuard
    },
  ],
});
export default router;
// eslint-disable-next-line
router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
      document.title = to.meta.title || DEFAULT_TITLE;
  });
});