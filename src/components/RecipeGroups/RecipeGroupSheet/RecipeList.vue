// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Widget for displaying recipes variants.
<script setup>
    import { ref, watch } from 'vue'
    import axios from 'axios'

    let recipeList = ref([])
    let loadedId   = ref('')

    let props = defineProps(['currentGroupId', 'edit'])

    // Watch props changes to update food sheet.
    watch(props, (value) =>
    {
        if(loadedId != value.currentGroupId && value.currentGroupId != '')
        {
            recipeList.value = []
            loadGroupData(value.currentGroupId)
        }
    })

    function loadGroupData(id)
    {
        axios.get('https://api.mon-menu.app/getRecipes?group=' + id)
        .then((response) =>
        {
            if (response.status == 200)
            {
                loadedId = id

                // Get recipes metadata.
                for (let i = 0 ; i < response.data.recipes.length ; i++)
                {
                    let recipeId = response.data.recipes[i]

                    axios.get('https://api.mon-menu.app/getRecipeMetadata/' + recipeId)
                    .then((response) =>
                    {
                        // Add recipe into list.
                        let recipe = new Object();
                        
                        // Diet.
                        recipe.diet = []
                        if (response.data.exclusions.meat && response.data.exclusions.fish)
                            recipe.diet.push('vegetarian')

                        if (response.data.exclusions.meat && response.data.exclusions.fish
                            && response.data.exclusions.dairy && response.data.exclusions.eggs
                            && response.data.exclusions.oap)
                            recipe.diet.push('vegan')

                        // Id.
                        recipe.id = response.data.id

                        // Title.
                        recipe.title = response.data.details

                        // Available.
                        let currentMonth = new Date().getMonth() + 1;
                        recipe.available = (response.data.months.includes(currentMonth))

                        // Cost.
                        // TODO: add energy cost.
                        if (response.data.nbOfParts > 0 )
                            recipe.cost = response.data.ingredientsCost / response.data.nbOfParts
                        else
                            recipe.cost = '-'

                        // Energy.
                        if (response.data.nbOfParts > 0 )
                            recipe.energy = (response.data.resources.energy.oven + response.data.resources.energy.hob) / response.data.nbOfParts
                        else
                            recipe.energy = '-'

                        // CO2.
                        // TODO: add energy CO2.
                        if (response.data.nbOfParts > 0 )
                            recipe.co2 = response.data.environmentalImpact.ingredientsCo2eq / response.data.nbOfParts
                        else
                            recipe.co2 = '-'

                        // Time.
                        recipe.time = response.data.times.preparation + response.data.times.cooking + response.data.times.rest

                        recipeList.value.push(recipe)
                    }).catch(function(error)
                    {
                        // TODO: error message
                        console.log(error)
                    });
                }
            }
        }).catch(function(error)
        {
            // 404 error means that there is not recipes into group.
            if (error.response.status == 404)
            {
                loadedId = id
            }

            else
            {
                // TODO
                console.log(error)
            }
        });
    }
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
