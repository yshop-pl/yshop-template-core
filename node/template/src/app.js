import {createApp, nextTick} from 'vue'
import App from './App.vue';
import {createRouter, createWebHistory} from "vue-router";
import Index from "./pages/Index.vue";
import Products from "./pages/Products.vue";
import {createPinia} from "pinia";
import Subpage from "./pages/Subpage.vue";
import Error from "./pages/Error.vue";
import Toast from "vue-toastification";

import './assets/main.css';
import "vue-toastification/dist/index.css";
import $config from "@/utils/$config.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Index, meta: { name: "Strona główna" } },
        { path: '/server/:serverSlug', component: Products },
        { path: '/page/:pageSlug', component: Subpage },
        { path: '/:pathMatch(.*)*', component: Error, meta: { name: "Not found" }  }
    ]
})
router.afterEach((to, from) => {
    nextTick(() => {
        document.title = to.meta.name ? $config()['title_schema'].replace('{name}', to.meta.name) : $config()['title']
    })
})

const pinia = createPinia()
const app = createApp(App)
    .use(router)
    .use(pinia)
    .use(Toast, {})

app.mount('#app');