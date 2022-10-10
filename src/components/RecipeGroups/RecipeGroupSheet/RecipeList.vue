// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Widget for displaying recipes variants.
<script setup>
    import { ref, inject } from 'vue'

    let props      = defineProps(['edit', 'recipeList', 'sortKey'])
    let recipeData = ref(inject('recipeData'))

    defineEmits(['sortRequested'])

    function openRecipe(id)
    {
        recipeData.value.currentRecipeId = id
    }
</script>

<template>
    <div class="RecipeList_Cls">
        <div class="RecipeListEntry_Cls RecipeListHeaders_Cls">
            <span class="RecipeListTitle_Cls"></span>
            <span class="RecipeListColumn_Cls" v-bind:class="{RecipeListColumnUnderline_Cls: sortKey == 'diet'}" title="Indique les régimes alimentaires spéciaux : végétariens, végétaliens." @click="$emit('sortRequested', 'diet')">Régime</span>
            <span class="RecipeListColumn_Cls" v-bind:class="{RecipeListColumnUnderline_Cls: sortKey == 'season'}" title="Indique si la recette est actuellement de saison." @click="$emit('sortRequested', 'season')">Saison</span>
            <span class="RecipeListColumn_Cls" v-bind:class="{RecipeListColumnUnderline_Cls: sortKey == 'cost'}" title="Indique le coût financier par part pour les ingrédients et l'énergie nécessaires." @click="$emit('sortRequested', 'cost')">Coût</span>
            <span class="RecipeListColumn_Cls" v-bind:class="{RecipeListColumnUnderline_Cls: sortKey == 'energy'}" title="Indique la quantité d'énergie nécessaire par part." @click="$emit('sortRequested', 'energy')">Energie</span>
            <span class="RecipeListColumn_Cls" v-bind:class="{RecipeListColumnUnderline_Cls: sortKey == 'co2'}" title="Indique les émissions de CO2 par part, incluant les ingrédients et l'usage des énergies." @click="$emit('sortRequested', 'co2')">CO<sub>2</sub></span>
            <span class="RecipeListColumn_Cls" v-bind:class="{RecipeListColumnUnderline_Cls: sortKey == 'time'}" title="Durée globale approximative de la recette (préparation, cuisson, repos)." @click="$emit('sortRequested', 'time')">Durée</span>
        </div>
        <ul >
            <li v-for="entry in recipeList" :key="entry.id" @click="openRecipe(entry.id)">
                <div class="RecipeListEntry_Cls" style="overflow: hidden;">
                    <span class="RecipeListTitle_Cls" style="padding-left: 10px;">{{ entry.title }}</span>
                    <span class="RecipeListColumn_Cls RecipeListDietIcons_Cls">
                        <img v-if="entry.diet.includes('vegan')" class="RecipeListImageVegan_Cls" title="Végétalien" />
                        <img v-if="entry.diet.includes('vegetarian')" class="RecipeListImageVegetarian_Cls" title="Végétarien" />
                    </span>
                    <span class="RecipeListColumn_Cls RecipeInfos_Cls">{{ entry.available ? '✔️' : '' }}</span>
                    <span class="RecipeListColumn_Cls RecipeInfos_Cls">{{ entry.cost == '-' ? '-' : $formatFloat($roundFloat(entry.cost, 2)) + ' €' }}</span>
                    <span class="RecipeListColumn_Cls RecipeInfos_Cls">{{ entry.energy == '-' ? '-' : $formatFloat($roundFloat(entry.energy, 2)) + ' kWh' }}</span>
                    <span class="RecipeListColumn_Cls RecipeInfos_Cls">{{ entry.co2 == '-' ? '-' : $formatFloat($roundFloat(entry.co2 * 1000, 0)) + ' g' }}</span>
                    <span class="RecipeListColumn_Cls RecipeInfos_Cls">{{ $formatTime(entry.time) }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .RecipeList_Cls
    {
        margin-left:        20px;
        margin-right:       20px;
        margin-top:         10px;
    }

    .RecipeListEntry_Cls
    {
        display:            flex; 
        height:             30px;
        line-height:        30px;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        gap:                10px;
    }

    .RecipeInfos_Cls
    {
        font-size:          0.9em;
    }
    .RecipeListHeaders_Cls
    {
        background-color:   #834655;
        color:              #c8b273;
    }

    .RecipeListDietIcons_Cls
    {
        display:            flex;
        justify-content:    center;
        gap:                3px;
        align-items:        center;
    }

    .RecipeListTitle_Cls
    {
        flex-grow:          4;
    }

    .RecipeListColumn_Cls
    {
        width:              70px;
        text-align:         center;
        user-select:        none;
    }

    .RecipeListColumnUnderline_Cls
    {
        text-decoration: underline dashed;
    }

    ul
    {
        list-style: none;
        margin:     0px;
        padding:    0px;
        flex-grow:  4;
        overflow:   auto;
    }

    li
    {
        height:     30px;
        margin-top: 10px;
        cursor:     pointer;
    }

    li:hover
    {
        background-color: #834655;
    }

    .RecipeListImageVegan_Cls
    {
        height:             20px;
        content:            url(/images/vegan.png);
    }

    .RecipeListImageVegetarian_Cls
    {
        height:             20px;
        content:            url(/images/vegetarian.png);
    }
</style>
