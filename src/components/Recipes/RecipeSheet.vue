// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// View for a recipe.
<script setup>
    import { ref, inject, watch, computed } from 'vue'
    import { marked } from 'marked'
    import axios  from 'axios'

    import Months from '../Foods/FoodSheet/Months.vue'

    axios.defaults.withCredentials = true

    let props = defineProps(['currentRecipeId', 'edit'])

    let currentStates = ref(inject('currentStates'))
    let sessionData   = ref(inject('PersistentLocalStorage_sessionData'))
    let title         = ref('')
    let months        = ref([])
    let picture       = ref('')
    let content       = ref('')
    let nbOfParts     = ref(0)
    let ingredients   = ref([])
    let type          = ref('')
    let temperature   = ref('')
    let diet          = ref([])
    let prepTime      = ref(0)
    let cookTime      = ref(0)
    let restTime      = ref(0)
    let ingredCost    = ref(0)
    let energyCost    = ref(0)
    let energy        = ref(0)
    let water         = ref(0)
    let co2           = ref(0)
    let errorMsg      = ref('')

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

    const markedContent = computed(() =>
    {
        return marked(content.value);
    })

    function closeRecipe()
    {
        currentStates.value.currentRecipeId = ''
    }

    function loadIngredientData(ingredient)
    {
        let url = ''

        if (ingredient.hasOwnProperty('food'))
            url = 'https://api.mon-menu.app/getFoodData/' + ingredient.food

        else if (ingredient.hasOwnProperty('recipe'))
            url = 'https://api.mon-menu.app/getRecipeData/' + ingredient.recipe

        else
            return

        // Get data.
        axios.get(url)
        .then((response) =>
        {
            if (response.status == 200)
            {
                let id = response.data.id

                let d =
                {
                    ingredient: ingredient,
                    data:       response.data
                }

                ingredients.value.push(d)
            }
        }).catch(function(error)
        {
            errorMsg.value = 'Impossible de charger tous les ingrédients de la recette.'
        });
    }

    function loadRecipeData(id)
    {
        recipeLoaded.value = false
        ingrNb.value       = 0
        errorMsg.value     = ''

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
                energy.value     = parseFloat(response.data.resources.energy.oven)
                                 + parseFloat(response.data.resources.energy.hob)
                                 + parseFloat(response.data.resources.energy.kettle)

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
                type.value = response.data.type

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
                energyCost.value = 0

                // Hob energy cost.
                if (sessionData.value.hobEnergy == 'electricity')
                    energyCost.value += response.data.resources.energy.hob * sessionData.value.electricityCost / 100.0

                else if (sessionData.value.hobEnergy == 'gas')
                    energyCost.value += response.data.resources.energy.hob * sessionData.value.gasCost / 100.0

                // Oven energy cost.
                if (sessionData.value.ovenEnergy == 'electricity')
                    energyCost.value += response.data.resources.energy.oven * sessionData.value.electricityCost / 100.0

                else if (sessionData.value.ovenEnergy == 'gas')
                    energyCost.value += response.data.resources.energy.oven * sessionData.value.gasCost / 100.0

                // Kettle energy cost.
                if (sessionData.value.kittleEnergy == 'electricity')
                    energyCost.value += response.data.resources.energy.kettle * sessionData.value.electricityCost / 100.0

                else if (sessionData.value.kittleEnergy == 'gas')
                    energyCost.value += response.data.resources.energy.kettle * sessionData.value.gasCost / 100.0

                // Compute CO2.
                co2.value = response.data.environmentalImpact.ingredientsCo2eq

                // Hob energy cost.
                if (sessionData.value.hobEnergy == 'electricity')
                    co2.value += response.data.resources.energy.hob * sessionData.value.co2Electricity

                else if (sessionData.value.hobEnergy == 'gas')
                    co2.value += response.data.resources.energy.hob * sessionData.value.co2Gas

                // Oven energy cost.
                if (sessionData.value.ovenEnergy == 'electricity')
                    co2.value += response.data.resources.energy.oven * sessionData.value.co2Electricity

                else if (sessionData.value.ovenEnergy == 'gas')
                    co2.value += response.data.resources.energy.oven * sessionData.value.co2Gas

                // Kettle energy cost.
                if (sessionData.value.kittleEnergy == 'electricity')
                    co2.value += response.data.resources.energy.kettle * sessionData.value.co2Electricity

                else if (sessionData.value.kittleEnergy == 'gas')
                    co2.value += response.data.resources.energy.kettle * sessionData.value.co2Gas

                recipeLoaded.value = true
            }
        })
        .catch(function(error)
        {
            errorMsg.value = 'Impossible de charger la recette.'
        });
    }

    // Watch props changes to update list.
    watch(props, (value) =>
    {
        if (value.currentRecipeId != '' && value.edit != 'edit')
            loadRecipeData(value.currentRecipeId)
    })
</script>

<template>
    <!-- Blur background for the entire window -->
    <div v-show="currentRecipeId != '' && edit != 'edit'" class="RecipeSheet_Cls">
        <!-- Solid background -->
        <div class="RecipeSheetBg_Cls">
            <!-- Header -->
            <div class="RecipeSheetHeader_Cls">
                <span style="flex-grow: 1;"></span>

                <!-- Title and months -->
                <div v-show="loaded && errorMsg == ''" class="RecipeSheetTitleMonths_Cls">
                    <div class="RecipeSheetTitle_Cls">
                        {{ title }}
                    </div>
                    <Months class="RecipeSheetMonths_Cls" :months="months">
                    </Months>
                </div>

                <!-- Close button -->
                <span class="RecipeSheetCloseButton_Cls" @click="closeRecipe()">Fermer</span>
            </div>

            <!-- Loading page -->
            <div class="RecipeSheetLoadingPage_Cls" v-show="!loaded && errorMsg == ''">
                <p>Chargement en cours ....</p>
                <p>
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </p>
            </div>

            <!-- Error page -->
            <div class="RecipeSheetErrorPage_Cls" v-show="errorMsg != ''">
                <p style="margin: 10px; font-size: 1.5em;">⚠️</p>
                <p style="margin: 0px;">{{ errorMsg }}</p>
            </div>

            <!-- Central container -->
            <div v-show="loaded && errorMsg == ''" class="RecipeSheetCentralContainer_Cls">

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
                                        {{ $formatIngredientQuantity(ingredient.ingredient.quantity, ingredient.data.units) + $formatRemainingQuantity(ingredient.ingredient.remainingQuantity, ingredient.data.units)}}
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
                                    <td class="RecipeSheetDataValue_Cls">{{ $recipeTypeToString(type) }}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Température :</td>
                                    <td class="RecipeSheetDataValue_Cls">{{ temperature }}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Régime :</td>
                                    <td class="RecipeSheetDataValue_Cls">
                                        <img v-if="diet.includes('vegan')" class="RecipeSheetImageVegan_Cls" title="Végétalien" />
                                        <img v-if="diet.includes('vegetarian')" class="RecipeSheetImageVegetarian_Cls" title="Végétarien" />
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
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatFloat($roundFloat(ingredCost, 2)) + ' €'}}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls RecipeSheetDataTitleAlignRight_Cls">énergies :</td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatFloat($roundFloat(energyCost, 2)) + ' €' }}</td>
                                </tr>
                            </table>
                        </div>

                        <!-- Environmental impacts -->
                        <div class="RecipeSheetDataSlot_Cls">
                            <table>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Energie : </td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatFloat($roundFloat(energy, 2)) + ' kWh'}}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Eau :</td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatWater(water) }}</td>
                                </tr>
                                <tr>
                                    <td class="RecipeSheetDataTitle_Cls">Emissions CO<sub>2</sub> :</td>
                                    <td class="RecipeSheetDataValue_Cls">{{ $formatCo2(co2) }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="RecipeSheetContent_Cls" v-dompurify-html="markedContent">
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

    .RecipeSheetErrorPage_Cls
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

    .RecipeSheetImageVegan_Cls
    {
        height:             20px;
        content:            url(/images/vegan.png);
    }

    .RecipeSheetImageVegetarian_Cls
    {
        height:             20px;
        margin-left:        5px;
        content:            url(/images/vegetarian.png);
    }
</style>
