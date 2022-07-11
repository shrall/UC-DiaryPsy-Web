import { createRouter, createWebHistory } from "vue-router";

import Login from "/src/views/auth/Login.vue";
import ModuleIndex from "/src/views/admin/Module/Index.vue";
import ModuleDetail from "/src/views/admin/Module/Detail.vue";
import CharacterDetail from "/src/views/admin/Character/Detail.vue";
import QuizDetail from "/src/views/admin/Quiz/Detail.vue";
import UserIndex from "/src/views/admin/User/Index.vue";
import UserDetail from "/src/views/admin/User/Detail.vue";
import UserCreate from "/src/views/admin/User/Create.vue";

//Routes
const routes = [
  {
    path: "/",
    name: "ModuleIndex",
    component: ModuleIndex,
    meta: {
      title: "Modul",
    },
  },
  {
    path: "/module/:id",
    name: "ModuleDetail",
    component: ModuleDetail,
    props: true,
    meta: {
      title: "Modul Detail",
    },
  },
  {
    path: "/character/:id",
    name: "CharacterDetail",
    component: CharacterDetail,
    props: true,
    meta: {
      title: "Karakter Detail",
    },
  },
  {
    path: "/quiz/:id",
    name: "QuizDetail",
    component: QuizDetail,
    props: true,
    meta: {
      title: "Karakter Detail",
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
    path: "/user/create",
    name: "UserCreate",
    component: UserCreate,
    meta: {
      title: "Buat User",
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
