// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

"use strict";

// This file is the entry point for the client side application.
// It will install all the routes and the Vue.js application.
import { createRouter, createWebHashHistory } from 'vue-router'
import { ref, watch } from 'vue'
import { createApp } from 'vue'
import App from './App.vue'

import Plugin_Tools  from './plugins/Tools'

import Configuration from './components/Configuration/Configuration.vue';
import RecipeGroups  from './components/RecipeGroups/RecipeGroups.vue';
import Foods         from './components/Foods/Foods.vue';

const routes =
[
    { path: '/foods',   component: Foods         },
    { path: '/recipes', component: RecipeGroups  },
    { path: '/config',  component: Configuration },
    { path: '/',        component: null          },
]

const router = createRouter(
{
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)

// Install user data.
var userData = new Object(
{
    level: ref(localStorage.userData_level || 'user')   //< User level. Can be: 'user' (standard user) or 'admin' (administrator user).
});

app.provide('userData', userData)

// Store user data.
watch(userData.level, (n) =>
{
    localStorage.userData_level = n
})

// Install recipe data.
var recipeData = new Object(
{
    currentRecipeId: ""     //< Current displayed recipe id. Empty string to hide recipe div.
});

app.provide('recipeData', recipeData)   

// Install plugins.
app.use(Plugin_Tools)

// Install routes and mount application.
app.use(router)
app.mount("#app")
