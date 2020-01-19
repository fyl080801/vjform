import Vue from "vue";
import VueRouter from "vue-router";
import Basic from "../views/Basic.vue";
import Hooks from "../views/Hooks";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Basic },
  { path: "/basic", component: Basic },
  { path: "/hooks", component: Hooks }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
