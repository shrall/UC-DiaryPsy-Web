import { createRouter, createWebHistory } from "vue-router";

import Login from "/src/views/auth/Login.vue";
import Module from "/src/views/admin/Module.vue";

//Routes
const routes = [
  {
    path: "/",
    name: "Module",
    component: Module,
    meta: {
      title: "Module",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
