import "./assets/main.css";

import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';

const app = createApp(App);

store.dispatch('initAxios');

app.use(router);
app.use(store);

app.mount('#app');