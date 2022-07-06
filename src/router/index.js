import { createRouter, createWebHistory } from "vue-router";

import Login from "/src/views/auth/Login.vue";
import ModuleIndex from "/src/views/admin/Module/Index.vue";
import UserIndex from "/src/views/admin/User/Index.vue";
import UserDetail from "/src/views/admin/User/Detail.vue";

//Routes
const routes = [
  {
    path: "/",
    name: "ModuleIndex",
    component: ModuleIndex,
    meta: {
      title: "Module",
    },
  },
  {
    path: "/user",
    name: "UserIndex",
    component: UserIndex,
    meta: {
      title: "User",
    },
  },
  {
    path: "/user/:id",
    name: "UserDetail",
    component: UserDetail,
    props: true,
    meta: {
      title: "User Detail",
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
