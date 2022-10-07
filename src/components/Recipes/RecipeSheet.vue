// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// View for a recipe.
<script setup>
    import { ref, inject, watch, computed } from 'vue'
    import axios from 'axios'

    import Months from '../Foods/FoodSheet/Months.vue'

    axios.defaults.withCredentials = true

    let props = defineProps(['currentRecipeId'])

    let recipeData  = ref(inject('recipeData'))
    let title       = ref('')
    let months      = ref([])
    let picture     = ref('')
    let content     = ref('')
    let nbOfParts   = ref(0)
    let ingredients = ref([])
    let type        = ref('')
    let temperature = ref('')
    let diet        = ref([])
    let prepTime    = ref(0)
    let cookTime    = ref(0)
    let restTime    = ref(0)
    let ingredCost  = ref(0)
    let energyCost  = ref(0)
    let energy      = ref(0)
    let water       = ref(0)
    let co2         = ref(0)

    // Sort ingredients list.
    const sortIngredients = computed(() =>
    {
        return ingredients.value.sort((item1, item2) =>
        {
            return (item1.ingredient.quantity < item2.ingredient.quantity)
        });
    })

    // Recipe loading state.
    let recipeLoaded = ref(false)
    let ingrNb       = ref(0)

    const loaded = computed(() =>
    {
        if (!recipeLoaded.value)
            return false

        return (ingrNb.value == ingredients.value.length)
    })

    function closeRecipe()
    {
        recipeData.value.currentRecipeId = ''
    }

    function loadIngredientData(ingredient)
    {
        // TODO: merge

        // Get food data.
        if (ingredient.hasOwnProperty('food'))
        {
            axios.get('https://api.mon-menu.app/getFoodData/' + ingredient.food)
            .then((response) =>
            {
                if (response.status == 200)
                {
                    let id = response.data.id

                    let d =
                    {
                        ingredient: ingredient,
                        data: response.data
                    }

                    ingredients.value.push(d)
                }
            }).catch(function(error)
            {
                // TODO
            });
        }

        // Get recipe data.
        else if (ingredient.hasOwnProperty('recipe'))
        {
            axios.get('https://api.mon-menu.app/getRecipeData/' + ingredient.recipe)
            .then((response) =>
            {
                if (response.status == 200)
                {
                    let id = response.data.id

                    let d =
                    {
                        ingredient: ingredient,
                        data: response.data
                    }

                    ingredients.value.push(d)
                }
            }).catch(function(error)
            {
                // TODO
            });
        }
    }

    function loadRecipeData(id)
    {
        recipeLoaded.value = false
        ingrNb.value       = 0

        axios.get('https://api.mon-menu.app/getRecipeData/' + id)
        .then((response) =>
        {
            if (response.status == 200)
            {
                title.value      = response.data.details
                months.value     = response.data.months
                content.value    = response.data.recipe
                nbOfParts.value  = response.data.nbOfParts
                prepTime.value   = response.data.times.preparation
                cookTime.value   = response.data.times.cooking
                restTime.value   = response.data.times.rest
                ingredCost.value = response.data.ingredientsCost
                water.value      = response.data.resources.water
                energy.value     = response.data.resources.energy.oven + response.data.resources.energy.hob

                // Set default picture if any.
                picture.value = response.data.picture
                if (picture.value == '')
                    picture.value = 'default.png'

                // Store ingredients and data (from Api).
                ingredients.value = []
                ingrNb.value       = response.data.ingredients.length
                for (let i = 0 ; i < response.data.ingredients.length ; i++)
                {
                    loadIngredientData(response.data.ingredients[i])
                }

                // Recipe type.
                type.value = 'non défini'
                if (response.data.type == 1)
                    type.value = 'apéritif'

                else if (response.data.type == 2)
                    type.value = 'entrée'

                else if (response.data.type == 4)
                    type.value = 'plat'

                else if (response.data.type == 8)
                    type.value = 'dessert'

                // Recipe temperature.
                temperature.value = 'non définie'
                if (response.data.temperature == 0)
                    temperature.value = 'indifférent'

                else if (response.data.temperature == 1)
                    temperature.value = 'froid'

                else if (response.data.temperature == 2)
                    temperature.value = 'chaud'

                // Diet.
                diet.value = []
                if (response.data.exclusions.meat && response.data.exclusions.fish)
                    diet.value.push('vegetarian')

                if (response.data.exclusions.meat && response.data.exclusions.fish
                    && response.data.exclusions.dairy && response.data.exclusions.eggs
                    && response.data.exclusions.oap)
                    diet.value.push('vegan')

                // Compute energy cost.
                // TODO: energy * costs from configuration
                energyCost.value = 0

                // Compute CO2.
                // TODO: add energy emissions with config.
                co2.value = response.data.environmentalImpact.ingredientsCo2eq

                recipeLoaded.value = true
            }
        })
        .catch(function(error)
        {
            // TODO
        });
    }

    // Watch props changes to update list.
    watch(props, (value) =>
    {
        if (value.currentRecipeId != '')
            loadRecipeData(value.currentRecipeId)
    })
</script>

<template>
    <!-- Blur background for the entire window -->
    <div v-show="currentRecipeId != ''" class="RecipeSheet_Cls">
        <!-- Solid background -->
        <div class="RecipeSheetBg_Cls">
            <!-- Header -->
            <div class="RecipeSheetHeader_Cls">
                <!-- Title and months -->
                <div v-show="loaded" class="RecipeSheetTitleMonths_Cls">
                    <div class="RecipeSheetTitle_Cls">
                        {{ title }}
                    </div>
                    <Months class="RecipeSheetMonths_Cls" :months="months">
                    </Months>
                </div>

                <!-- Close button -->
                <span style="flex-grow: 1;"></span>
                <span class="RecipeSheetCloseButton_Cls" @click="closeRecipe()">Fermer</span>
            </div>

            <!-- Loading page -->
            <div class="RecipeSheetLoadingPage_Cls" v-show="!loaded">
                <p>Chargement en cours ....</p>
                <p>
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </p>
            </div>

            <!-- Central container -->
            <div v-show="loaded" class="RecipeSheetCentralContainer_Cls">

                <!-- Left part with picture and ingredients -->
                <div class="RecipeSheetLeft_Cls">
                    <div class="RecipeSheetPhoto_Cls">
                        <img class="RecipeSheetPhotoImg_Cls" v-bind:src="'images/recipes/' + picture" />
                    </div>
                    <div class="RecipeSheetIngredients_Cls">
                        <div class="RecipeSheetNbOfParts_Cls">
                            Pour {{ nbOfParts }} parts :
                        </div>
                        <div class="RecipeSheetIngredientList_Cls">
                            <div class="RecipeSheetIngredientEntry_Cls" v-for="ingredient in sortIngredients" v-bind:key="ingredient.data.id">
                                <!-- Food/recipe picture -->
                                <div class="RecipeSheetIngredientPicture_Cls">🫒</div>

                                <!-- Food/recipe name and quantity -->
                                <div class="RecipeSheetIngredientTitleAndQuantity_Cls">
                                    <div class="RecipeSheetIngredientTitle_Cls">{{ ingredient.data.title }}</div>
                                    <div class="RecipeSheetIngredientQuantity_Cls">
                                        {{ ingredient.data.units != null ? $formatFloat(ingredient.ingredient.quantity * ingredient.data.units.conversion) + ' ' + ingredient.data.units.label : $formatFloat($formatWeight(ingredient.ingredient.quantity))}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right part with data and content -->
                <div class="RecipeSheetRight_Cls">
                    <div class="RecipeSheetData_Cls">
                        <!-- Recipe informations -->
                        <div class="RecipeSheetDataSlot_Cls">
                            <table>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Type : </td>
                                    <td class="RecipeSheetDataValue_Cls">{{ type }}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Température :</td>
                                    <td class="RecipeSheetDataValue_Cls">{{ temperature }}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Régime :</td>
                                    <td class="RecipeSheetDataValue_Cls">
                                        <img v-if="diet.includes('vegan')" style="height: 20px;" src="images/vegan.png" title="Végétalien" />
                                        <img v-if="diet.includes('vegetarian')" style="height: 20px; margin-left: 5px;" src="images/vegetarian.png" title="Végétarien" />
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <!-- Times -->
                        <div class="RecipeSheetDataSlot_Cls">
                            <table>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Préparation : </td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatTime(prepTime) }}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Cuisson :</td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatTime(cookTime) }}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Repos :</td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatTime(restTime) }}</td>
                                </tr>
                            </table>
                        </div>

                        <!-- Costs -->
                        <div class="RecipeSheetDataSlot_Cls">
                            <table>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Coût : </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls RecipeSheetDataTitleAlignRight_Cls">ingrédients :</td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatFloat(ingredCost) + ' €'}}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls RecipeSheetDataTitleAlignRight_Cls">énergies :</td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatFloat(energyCost) + ' €' }}</td>
                                </tr>
                            </table>
                        </div>

                        <!-- Environmental impacts -->
                        <div class="RecipeSheetDataSlot_Cls">
                            <table>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Energie : </td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatFloat(energy) + ' kWh'}}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Eau :</td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatFloat(water) + ' litres'}}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Emissions CO<sub>2</sub> :</td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatFloat(co2) + ' g' }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="RecipeSheetContent_Cls">
                        {{ content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .RecipeSheet_Cls
    {
        backdrop-filter:    blur(5px);
    }

    .RecipeSheetBg_Cls
    {
        position:           fixed;
        display:            flex;
        flex-direction:     column;
        top:                20px;
        bottom:             20px;
        left:               20px;
        right:              20px;
        background-color:   #9f5069;
        border:             solid 2px #c8b273;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .RecipeSheetHeader_Cls
    {
        display:            flex;
    }

    .RecipeSheetTitleMonths_Cls
    {
        display:            flex;
        flex-direction:     column;
        flex-grow:          1;
        background-color:   #9f5069;
        user-select:        none;
    }

    .RecipeSheetCloseButton_Cls
    {
        height:             70px;
        width:              70px;
        line-height:        70px;
        text-align:         center;
        color:              #c8b273;
        background-color:   #834655;
    }

    .RecipeSheetCloseButton_Cls:hover
    {
        text-decoration:    underline;
        cursor:             pointer;
        user-select:        none;
    }

    .RecipeSheetCentralContainer_Cls
    {
        display:            flex;
        flex-grow:          1;
        overflow:           hidden;
    }

    .RecipeSheetLeft_Cls
    {
        display:            flex;
        flex-direction:     column;
        flex-grow:          1;
        min-width:          35%;
        max-width:          35%;
    }

    .RecipeSheetPhoto_Cls
    {
        flex-grow:          1;
        text-align:         center;
    }

    .RecipeSheetPhotoImg_Cls
    {
        width:              95%;
    }

    .RecipeSheetIngredients_Cls
    {
        flex-grow:          100;
        overflow:           hidden;
    }

    .RecipeSheetNbOfParts_Cls
    {
        text-align:         center;
        color:              #c8b273;
        font-size:          1.1em;
    }

    .RecipeSheetIngredientList_Cls
    {
        display:            flex;
        flex-direction:     column;
        gap:                10px;
        margin:             10px;
    }


    .RecipeSheetIngredientEntry_Cls
    {
        display:            flex;
        height:             40px;
        width:              40%;
        overflow:           hidden;
    }

    .RecipeSheetIngredientPicture_Cls
    {
        font-size:          2em;
        line-height:        40px;
    }

    .RecipeSheetIngredientTitleAndQuantity_Cls
    {
        display:            flex;
        flex-direction:     column;
        margin-left:        10px;
    }

    .RecipeSheetIngredientTitle_Cls
    {
        color:              #c8b273;
    }

    .RecipeSheetIngredientQuantity_Cls
    {
        font-style:         italic;
    }

    .RecipeSheetRight_Cls
    {
        display:            flex;
        flex-direction:     column;
        flex-grow:          1;
    }

    .RecipeSheetData_Cls
    {
        display:            flex;
        flex-grow:          1;
        gap:                20px;
    }

    .RecipeSheetDataSlot_Cls
    {
        width:              200px;
    }

    .RecipeSheetDataTitle_Cls
    {
        font-size:          0.9em;
        color:              #c8b273;
        min-width:          100px;
    }

    .RecipeSheetDataTitleAlignRight_Cls
    {
        text-align:         right;
    }

    .RecipeSheetDataValue_Cls
    {
        font-size:          0.9em;
        min-width:          100px;
    }

    .RecipeSheetContent_Cls
    {
        flex-grow:          1;
        padding:            10px;
        text-align:         justify;
        overflow:           auto;
        flex-grow:          100;
    }

    .RecipeSheetTitle_Cls
    {
        text-align:         center;
        padding-top:        10px;
        font-size:          1.2em;
        color:              #c8b273;
    }

    .RecipeSheetMonths_Cls
    {
        text-align:         center;
        margin-top:         5px;
    }

    .RecipeSheetLoadingPage_Cls
    {
        display:            flex;
        flex-direction:     column;
        justify-content:    center;
        text-align:         center;
        flex-grow:          1;
    }

    /* From https://loading.io/css/ */
    .lds-ring
    {
        display:            inline-block;
        position:           relative;
        width:              80px;
        height:             80px;
    }

    .lds-ring div
    {
        box-sizing:         border-box;
        display:            block;
        position:           absolute;
        width:              64px;
        height:             64px;
        margin:             8px;
        border:             8px solid #c8b273;
        border-radius:      50%;
        animation:          lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color:       #c8b273 transparent transparent transparent;
    }

    .lds-ring div:nth-child(1)
    {
        animation-delay:    -0.45s;
    }

    .lds-ring div:nth-child(2)
    {
        animation-delay:    -0.3s;
    }

    .lds-ring div:nth-child(3)
    {
        animation-delay:    -0.15s;
    }

    @keyframes lds-ring
    {
        0%
        {
            transform: rotate(0deg);
        }

        100%
        {
            transform: rotate(360deg);
        }
    }
</style>