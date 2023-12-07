import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/LandingPage.vue";
import ItemPage from "./pages/ItemPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/detail/:itemId", component: ItemPage, name: 'detail' },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
