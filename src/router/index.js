import { createRouter, createWebHistory } from "vue-router";

import Login from "/src/views/auth/Login.vue";
import ModuleIndex from "/src/views/admin/Module/Index.vue";
import ModuleDetail from "/src/views/admin/Module/Detail.vue";
import CharacterDetail from "/src/views/admin/Character/Detail.vue";
import QuizDetail from "/src/views/admin/Quiz/Detail.vue";
import UserIndex from "/src/views/admin/User/Index.vue";
import UserDetail from "/src/views/admin/User/Detail.vue";
import UserCreate from "/src/views/admin/User/Create.vue";
import UserEdit from "/src/views/admin/User/Edit.vue";
import TribeIndex from "/src/views/admin/Tribe/Index.vue";
import TribeCreate from "/src/views/admin/Tribe/Create.vue";
import TribeEdit from "/src/views/admin/Tribe/Edit.vue";
import ReligionIndex from "/src/views/admin/Religion/Index.vue";
import ReligionCreate from "/src/views/admin/Religion/Create.vue";
import ReligionEdit from "/src/views/admin/Religion/Edit.vue";
import InstituteIndex from "/src/views/admin/Institute/Index.vue";
import InstituteCreate from "/src/views/admin/Institute/Create.vue";
import InstituteEdit from "/src/views/admin/Institute/Edit.vue";
import EducationIndex from "/src/views/admin/Education/Index.vue";
import EducationCreate from "/src/views/admin/Education/Create.vue";
import EducationEdit from "/src/views/admin/Education/Edit.vue";

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
    path: "/user/edit/:id",
    name: "UserEdit",
    component: UserEdit,
    props: true,
    meta: {
      title: "User Edit",
    },
  },
  {
    path: "/tribe",
    name: "TribeIndex",
    component: TribeIndex,
    meta: {
      title: "Tribe",
    },
  },
  {
    path: "/tribe/create",
    name: "TribeCreate",
    component: TribeCreate,
    meta: {
      title: "Buat Tribe",
    },
  },
  {
    path: "/tribe/edit/:id",
    name: "TribeEdit",
    component: TribeEdit,
    props: true,
    meta: {
      title: "Edit Tribe",
    },
  },
  {
    path: "/religion",
    name: "ReligionIndex",
    component: ReligionIndex,
    meta: {
      title: "Religion",
    },
  },
  {
    path: "/religion/create",
    name: "ReligionCreate",
    component: ReligionCreate,
    meta: {
      title: "Buat Religion",
    },
  },
  {
    path: "/religion/edit/:id",
    name: "ReligionEdit",
    component: ReligionEdit,
    props: true,
    meta: {
      title: "Edit Religion",
    },
  },
  {
    path: "/institute",
    name: "InstituteIndex",
    component: InstituteIndex,
    meta: {
      title: "Institute",
    },
  },
  {
    path: "/institute/create",
    name: "InstituteCreate",
    component: InstituteCreate,
    meta: {
      title: "Buat Institute",
    },
  },
  {
    path: "/institute/edit/:id",
    name: "InstituteEdit",
    component: InstituteEdit,
    props: true,
    meta: {
      title: "Edit Institute",
    },
  },
  {
    path: "/education",
    name: "EducationIndex",
    component: EducationIndex,
    meta: {
      title: "Education",
    },
  },
  {
    path: "/education/create",
    name: "EducationCreate",
    component: EducationCreate,
    meta: {
      title: "Buat Education",
    },
  },
  {
    path: "/education/edit/:id",
    name: "EducationEdit",
    component: EducationEdit,
    props: true,
    meta: {
      title: "Edit Education",
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
