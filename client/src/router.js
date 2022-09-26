import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import Everything from "./views/Everything.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/everything",
      name: "everything",
      component: Everything,
    },
  ],
});

