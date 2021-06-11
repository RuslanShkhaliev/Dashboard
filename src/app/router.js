import Vue from "vue";
import VueRouter from "vue-router";
import {store} from "./store";

import {dashboardRoutes} from "./modules/dashboard/dashboard-routes";
import {profileRoutes} from "./modules/profile/profile-routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/", redirect: {name: "dashboard"}
  },
  {
    path: "*",
    name: "not-found",
    meta: {
      transition: "fade-out",
      prevRoute: true,
      full: true
    },
    component: () => import("./static/Page404")
  },
  ...dashboardRoutes,
  ...profileRoutes,

]
const router = new VueRouter({
  mode: "history",
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  if (
    to.meta?.permissions?.includes('auth')
    &&
    !store.getters.isAuthenticated
  ) {
    return next({name: "dashboard"})
  }
  return next()
})

export {
  router
}
