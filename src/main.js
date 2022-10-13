// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

"use strict";

// This file is the entry point for the client side application.
// It will install all the routes and the Vue.js application.
import { createRouter, createWebHashHistory } from 'vue-router'
import VueDOMPurifyHTML from 'vue-dompurify-html';
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

import Plugin_Tools  from './plugins/Tools'
import Plugin_PLS    from './plugins/PersistentLocalStorage'

import Configuration from './components/Configuration/Configuration.vue';
import RecipeGroups  from './components/RecipeGroups/RecipeGroups.vue';
import Foods         from './components/Foods/Foods.vue';

const routes =
[
    { path: '/foods',   component: Foods         },
    { path: '/recipes', component: RecipeGroups  },
    { path: '/config',  component: Configuration },
    { path: '/',        component: RecipeGroups  },
]

const router = createRouter(
{
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)

// Install recipe data.
var recipeData = new Object(
{
    currentRecipeId:    "",     //< Current displayed recipe id. Empty string to hide recipe div.
    currentMode:        "",     //< Current mode: '' for normal mode or 'edit' for edit mode.
    outdatedRecipe:     ""      //< Current edited recipe (when saved).
});

app.provide('recipeData', recipeData)   

// Install plugins.
app.use(Plugin_Tools)
app.use(Plugin_PLS)

// Security options.
app.use(VueDOMPurifyHTML);

// Install routes and mount application.
app.use(router)
app.mount("#app")

// Load Api configuration.
axios.get('https://api.mon-menu.app/getConfiguration')
.then((response) =>
{
    if (response.status == 200)
    {
        app.config.globalProperties.$setCo2Emissions(response.data.data_co2.co2eq_kwh_electricity, response.data.data_co2.co2eq_kwh_gas)
    }
})
