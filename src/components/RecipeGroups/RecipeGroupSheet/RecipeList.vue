// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Widget for displaying recipes variants.
<script setup>
    let props = defineProps(['edit', 'recipeList'])
</script>

<template>
    <div class="RecipeList_Cls">
        <div class="RecipeListEntry_Cls RecipeListHeaders_Cls">
            <span class="RecipeListTitle_Cls"></span>
            <span class="RecipeListColumn_Cls" title="Indique les régimes alimentaires spéciaux : végétariens, végétaliens.">Régime</span>
            <span class="RecipeListColumn_Cls" title="Indique si la recette est actuellement de saison.">Saison</span>
            <span class="RecipeListColumn_Cls" title="Indique le coût financier par part pour les ingrédients et l'énergie nécessaires.">Coût</span>
            <span class="RecipeListColumn_Cls" title="Indique la quantité d'énergie nécessaire par part.">Energie</span>
            <span class="RecipeListColumn_Cls" title="Indique les émissions de CO2 par part, incluant les ingrédients et l'usage des énergies.">CO<sub>2</sub></span>
            <span class="RecipeListColumn_Cls" title="Durée globale approximative de la recette (préparation, cuisson, repos).">Durée</span>
        </div>
        <ul >
            <li v-for="entry in recipeList" :key="entry.id">
                <div class="RecipeListEntry_Cls" style="overflow: hidden;">
                    <span class="RecipeListTitle_Cls" style="padding-left: 10px;">{{ entry.title }}</span>
                    <span class="RecipeListColumn_Cls RecipeListDietIcons_Cls">
                        <img v-if="entry.diet.includes('vegan')" style="height: 20px;" src="images/vegan.png" title="Végétalien" />
                        <img v-if="entry.diet.includes('vegetarian')" style="height: 20px;" src="images/vegetarian.png" title="Végétarien" />
                    </span>
                    <span class="RecipeListColumn_Cls RecipeInfos_Cls">{{ entry.available ? '✔️' : '' }}</span>
                    <span class="RecipeListColumn_Cls RecipeInfos_Cls">{{ entry.cost == '-' ? '-' : $formatFloat($roundFloat(entry.cost, 2)) + ' €' }}</span>
                    <span class="RecipeListColumn_Cls RecipeInfos_Cls">{{ entry.energy == '-' ? '-' : $formatFloat($roundFloat(entry.energy, 2)) + ' kWh' }}</span>
                    <span class="RecipeListColumn_Cls RecipeInfos_Cls">{{ entry.co2 == '-' ? '-' : $formatFloat($roundFloat(entry.co2 * 1000, 0)) + ' g' }}</span>
                    <span class="RecipeListColumn_Cls RecipeInfos_Cls">{{ entry.time < 60 ? entry.time + '\'' : Math.floor(entry.time / 60) + 'h' + entry.time % 60 }}</span>
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
</style>
