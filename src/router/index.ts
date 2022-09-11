import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import EditUserPage from "../views/EditUserPage.vue";
import ConfigPage from "../views/ConfigPage.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/edit/",
    name: "EditView",
    component: EditUserPage,
  },
  {
    path: "/config",
    name: "ConfigView",
    component: ConfigPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
