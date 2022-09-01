import { createRouter, createWebHashHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'

import Configuration from './components/Configuration/Configuration.vue';
import Recipes       from './components/Recipes/Recipes.vue';
import Foods         from './components/Foods/Foods.vue';

const routes =
[
    { path: '/foods',   component: Foods         },
    { path: '/recipes', component: Recipes       },
    { path: '/config',  component: Configuration },
    { path: '/',        component: null          },
]

const router = createRouter(
{
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount("#app")
