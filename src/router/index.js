import { createRouter, createWebHistory } from "vue-router";

import Login from "/src/views/auth/Login.vue";
import Dashboard from "/src/views/admin/Dashboard.vue";

//Routes
const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
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
