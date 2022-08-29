import { createRouter, createWebHashHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'

import Foods from './components/Foods.vue';
import About from './components/About.vue';

const routes =
[
    { path: '/foods', component: Foods },
    { path: '/about', component: About },
    { path: '/',      component: About },
]

const router = createRouter(
{
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount("#app")
