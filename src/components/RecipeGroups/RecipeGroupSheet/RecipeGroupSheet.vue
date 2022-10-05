// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Recipe group sheet for displaying recipe group data.
// Edit mode available for admin access.
<script setup>
    import { ref, watch } from 'vue'
    import axios from 'axios'

    import RecipeGroupTitle from './RecipeGroupTitle.vue'
    import ErrorDialog      from '../../ErrorDialog.vue'
    import RecipeList       from './RecipeList.vue'

    axios.defaults.withCredentials = true

    let recipeList          = ref([])
    let loadedId            = ref('')
    let errorMsg            = ref('')
    let variantsErrorMsg    = ref('')

    let props = defineProps(['currentGroupId', 'edit', 'title'])

    // Watch props changes to update food sheet.
    watch(props, (value) =>
    {
        if(loadedId.value != value.currentGroupId && value.currentGroupId != '')
        {
            recipeList.value = []
            loadGroupData(value.currentGroupId)
        }
    })

    function loadGroupData(id)
    {
        errorMsg.value         = ''
        variantsErrorMsg.value = ''

        axios.get('https://api.mon-menu.app/getRecipes?group=' + id)
        .then((response) =>
        {
            if (response.status == 200)
            {
                loadedId.value = id

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
                        variantsErrorMsg.value = 'Toutes les variantes de la recette n\'ont pas pu être récupérées.'
                    });
                }
            }
        }).catch(function(error)
        {
            // 404 error means that there is not recipes into group.
            if (error.response.status == 404)
            {
                loadedId.value         = id
                variantsErrorMsg.value = 'Cette recette ne contient pas de variantes.'
            }

            else
            {
                errorMsg.value = 'Impossible de récupérer la liste des recettes'
                loadedId.value = ''
            }
        });
    }
</script>

<template>
    <div class="RecipeGroupSheet_cls">
        <div v-show="currentGroupId != '' && errorMsg == ''" class="RecipeGroup_cls">
            <RecipeGroupTitle :title="title" :edit="edit" />
            <RecipeList :recipeList="recipeList" />
            <p v-if="variantsErrorMsg != ''" class="WarningBox_Cls">
                ⚠️ <span class="WarningText_Cls">{{ variantsErrorMsg }}</span>
            </p>
        </div>
        <div v-if="errorMsg != ''" class="ErrorMsgContainer_cls">
            <ErrorDialog class="ErrorDialog_cls" :errorMsg="errorMsg" buttonTitle=""></ErrorDialog>
        </div>
    </div>
</template>

<style scoped>
    .ErrorMsgContainer_cls
    {
        display:    block;
        width:      100%;
        height:     100%;
    }

    .ErrorDialog_cls
    {
        position:   absolute;
        top:        50%;
        left:       50%;
        transform:  translate(-50%, -50%);
    }

    .WarningBox_Cls
    {
        text-align:     center;
    }
    .WarningText_Cls
    {
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size:      0.8em;
        font-style:     italic;
    }

    .RecipeGroupSheet_cls
    {
        flex-grow:  1;
        border:     dashed 1px #c8b273;
        overflow:   auto;
    }

    .RecipeGroup_cls
    {
        display:        flex;
        flex-direction: column;
        padding:        5px;
    }
</style>
