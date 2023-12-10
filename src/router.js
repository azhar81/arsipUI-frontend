import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/LandingPage.vue";
import ItemPage from "./pages/ItemPage.vue";
import SearchPage from "./pages/SearchPage.vue";
import LoginPage from "./pages/LoginPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/detail/:itemId", component: ItemPage, name: 'detail' },
  { path: "/search", component: SearchPage },
  { path: "/login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
