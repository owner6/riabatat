import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import { createRouter, createWebHistory } from "vue-router";
createApp(App).mount("#app");

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/user/:userId", component: App }],
});

createApp(App).use(router).mount("#app");
