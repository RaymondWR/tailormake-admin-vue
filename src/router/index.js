import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
    
  },
  {
    path: "/cars/new",
    name: "NewCar",
    component: () =>
      import("../views/cars/new.vue")
  },
  {
    path: "/posts/new",
    name: "NewPost",
    component: () =>
      import("../views/posts/new.vue")
  }
];

const router = new VueRouter({
  routes,
});

export default router;
