import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/LandingPage.vue";
import ItemPage from "./pages/ItemPage.vue";
import SearchPage from "./pages/SearchPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import CreatePage from "./pages/CreatePage.vue";
import ContributionsPage from "./pages/ContributionsPage.vue";
import VerificationsPage from "./pages/ContributionsPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/detail/:itemId", component: ItemPage, name: 'detail' },
  { path: "/search", component: SearchPage },
  { path: "/login", component: LoginPage },
  { path: "/create", component: CreatePage },
  { path: "/contributions", component: ContributionsPage },
  { path: "/verifications", component: VerificationsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
