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

    let recipeData  = ref(inject('recipeData'))
    let sessionData = ref(inject('sessionData'))
    let title       = ref('')
    let months      = ref([])
    let picture     = ref('')
    let content     = ref('')
    let nbOfParts   = ref(0)
    let ingredients = ref([])
    let wastes      = ref([])
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
    let errorMsg    = ref('')
    let weight      = ref(0)

    // Recipe loading state.
    let recipeLoaded = ref(false)
    let ingrNb       = ref(0)
    let excl_meat    = ref(false)
    let excl_fish    = ref(false)
    let excl_eggs    = ref(false)
    let excl_diary   = ref(false)
    let excl_oap     = ref(false)
    let w_water      = ref(0)
    let w_nonrecycl  = ref(0)
    let w_biodeg     = ref(0)
    let w_plastics   = ref(0)
    let w_bricks     = ref(0)
    let w_papers     = ref(0)
    let w_glasses    = ref(0)
    let w_others     = ref(0)
    let e_oven       = ref(0)
    let e_hob        = ref(0)
    let e_kettle     = ref(0)

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
        recipeData.value.currentRecipeId = ''
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
        console.log("Load recipe for edition " + id)
        recipeLoaded.value = false
        ingrNb.value       = 0
        errorMsg.value     = ''

        axios.get('https://api.mon-menu.app/getRecipeData/' + id)
        .then((response) =>
        {
            if (response.status == 200)
            {
                title.value         = response.data.details
                months.value        = response.data.months
                content.value       = response.data.recipe
                nbOfParts.value     = response.data.nbOfParts
                prepTime.value      = response.data.times.preparation
                cookTime.value      = response.data.times.cooking
                restTime.value      = response.data.times.rest
                ingredCost.value    = response.data.ingredientsCost
                water.value         = response.data.resources.water
                energy.value        = response.data.resources.energy.oven + response.data.resources.energy.hob
                weight.value        = response.data.weight
                w_water.value       = response.data.waste.water
                w_nonrecycl.value   = response.data.waste.nonRecyclable 
                w_biodeg.value      = response.data.waste.recyclable.biodegradable
                w_plastics.value    = response.data.waste.recyclable.plastics
                w_bricks.value      = response.data.waste.recyclable.bricks
                w_papers.value      = response.data.waste.recyclable.papers
                w_glasses.value     = response.data.waste.recyclable.glasses
                w_others.value      = response.data.waste.recyclable.others
                e_oven.value        = response.data.resources.energy.oven
                e_hob.value         = response.data.resources.energy.hob
                e_kettle.value      = response.data.resources.energy.kettle

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

                excl_meat.value  = response.data.exclusions.meat
                excl_fish.value  = response.data.exclusions.fish
                excl_diary.value = response.data.exclusions.dairy
                excl_eggs.value  = response.data.exclusions.eggs
                excl_oap.value   = response.data.exclusions.oap

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
        if (value.currentRecipeId != '' && value.edit == 'edit')
            loadRecipeData(value.currentRecipeId)
    })

    function updateContent(c)
    {
        content.value = c
    }

    function saveRecipe()
    {
        // TODO
        console.log("TODO")
    }
</script>

<template>
    <!-- Blur background for the entire window -->
    <div v-show="currentRecipeId != '' && edit == 'edit'" class="RecipeEditSheet_Cls">
        <!-- Solid background -->
        <div class="RecipeEditSheetBg_Cls">
            <!-- Header -->
            <div class="RecipeEditSheetHeader_Cls">
                <span style="flex-grow: 1;"></span>

                <!-- Save button -->
                <span class="RecipeEditSheetButton_Cls" @click="saveRecipe()">Enregistrer</span>

                <!-- Close button -->
                <span class="RecipeEditSheetButton_Cls" @click="closeRecipe()">Fermer</span>
            </div>

            <!-- Loading page -->
            <div class="RecipeEditSheetLoadingPage_Cls" v-show="!loaded && errorMsg == ''">
                <p>Chargement en cours ....</p>
                <p>
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </p>
            </div>

            <!-- Error page -->
            <div class="RecipeEditSheetErrorPage_Cls" v-show="errorMsg != ''">
                <p style="margin: 10px; font-size: 1.5em;">⚠️</p>
                <p style="margin: 0px;">{{ errorMsg }}</p>
            </div>

            <!-- Central container -->
            <div v-show="loaded && errorMsg == ''" class="RecipeEditSheetCentralContainer_Cls">
                <!-- Left part: recipe metadata and ingredients -->
                <div class="RecipeEditSheetLeft_Cls">

                    <!-- Title -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls">Titre :</span>
                        <span class="RecipeEditSheetEntryContent_Cls">
                            <input type="text" :value="title" style="width: 100%;"/>
                        </span>
                    </div>

                    <!-- Image (filename into recipe images directory) -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls">Image :</span>
                        <span class="RecipeEditSheetEntryContent_Cls">
                            <input type="text" :value="picture" style="width: 100%;"/>
                        </span>
                    </div>

                    <!-- Number of parts -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls">Nombre de parts :</span>
                        <span class="RecipeEditSheetEntryContent_Cls">
                            <input type="number" min="0" max="100" step="1" :value="nbOfParts" style="width: 80px;"/>
                        </span>
                    </div>

                    <!-- Final weight -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls">Poids final :</span>
                        <span class="RecipeEditSheetEntryContent_Cls">
                            <input type="number" min="0" max="100" step="0.01" :value="weight" style="width: 80px; margin-right: 10px;"/>
                            <span class="RecipeEditSheetUnit_Cls">kg</span>
                        </span>
                    </div>

                    <!-- Type -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls">Type :</span>
                        <span class="RecipeEditSheetEntryContent_Cls RecipeEditSheetCheckboxList_Cls">
                            <input type="checkbox" id="type1" :checked="type & 0x01"><label for="type1">apéritif</label>
                            <input type="checkbox" id="type2" :checked="type & 0x02"><label for="type2">entrée</label>
                            <input type="checkbox" id="type4" :checked="type & 0x04"><label for="type4">plat</label>
                            <input type="checkbox" id="type8" :checked="type & 0x08"><label for="type8">dessert</label>
                        </span>
                    </div>

                    <!-- Temperature -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls">Température :</span>
                        <span class="RecipeEditSheetEntryContent_Cls RecipeEditSheetCheckboxList_Cls">
                            <fieldset id="temperatureGroup" style="border: none; height: 10px; padding: 0px;">
                                <input type="radio" id="temperature1" :checked="temperature == 'froid'" name="temperatureGroup"><label for="temperature1">froid</label>
                                <input type="radio" id="temperature2" :checked="temperature == 'chaud'" name="temperatureGroup"><label for="temperature2">chaud</label>
                            </fieldset>
                        </span>
                    </div>

                    <!-- Exclusions -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls">Exclusions :</span>
                        <span class="RecipeEditSheetEntryContent_Cls RecipeEditSheetCheckboxList_Cls">
                            <input type="checkbox" id="excl_meat" :checked="excl_meat"><label for="type1">viande</label>
                            <input type="checkbox" id="excl_fish" :checked="excl_fish"><label for="type2">poisson</label>
                            <input type="checkbox" id="excl_diary" :checked="excl_diary"><label for="type4">produits laitiers</label>
                            <input type="checkbox" id="excl_eggs" :checked="excl_eggs"><label for="type8">oeufs</label>
                            <input type="checkbox" id="excl_oap" :checked="excl_oap"><label for="type8">autres produits animaux</label>
                        </span>
                    </div>

                    <!-- Times -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls">Temps :</span>
                        <span class="RecipeEditSheetEntryContent_Cls RecipeEditSheetCheckboxList_Cls">
                            <span class="RecipeEditSheetLabel_Cls">Préparation :</span>
                            <input type="number" min="0" max="999" step="1" :value="prepTime" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">'</span>
                            <span class="RecipeEditSheetLabel_Cls">Cuisson :</span>
                            <input type="number" min="0" max="999" step="1" :value="cookTime" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">'</span>
                            <span class="RecipeEditSheetLabel_Cls">Repos :</span>
                            <input type="number" min="0" max="999" step="1" :value="restTime" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">'</span>
                        </span>
                    </div>

                    <!-- Resources (water) -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls">Ressources :</span>
                        <span class="RecipeEditSheetEntryContent_Cls RecipeEditSheetCheckboxList_Cls">
                            <span class="RecipeEditSheetLabel_Cls">Eau :</span> 
                            <input type="number" min="0" max="99" step="0.01" :value="water" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">litres</span>
                        </span>
                    </div>

                    <!-- Resources (energy) -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls"></span>
                        <span class="RecipeEditSheetEntryContent_Cls RecipeEditSheetCheckboxList_Cls">
                            <span class="RecipeEditSheetLabel_Cls">Four :</span> 
                            <input type="number" min="0" max="99" step="0.01" :value="e_oven" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">kWh</span>
                            <span class="RecipeEditSheetLabel_Cls">Plaques :</span>
                            <input type="number" min="0" max="99" step="0.01" :value="e_hob" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">kWh</span>
                            <span class="RecipeEditSheetLabel_Cls">Bouilloire :</span>
                            <input type="number" min="0" max="99" step="0.01" :value="e_kettle" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">kWh</span>
                        </span>
                    </div>

                    <!-- Waste (part 1) -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls">Déchets :</span>
                        <span class="RecipeEditSheetEntryContent_Cls RecipeEditSheetCheckboxList_Cls">
                            <span class="RecipeEditSheetLabel_Cls">Eau :</span> 
                            <input type="number" min="0" max="99" step="0.01" :value="w_water" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">litres</span>
                            <span class="RecipeEditSheetLabel_Cls">Non recycl. :</span> 
                            <input type="number" min="0" max="99" step="0.01" :value="w_nonrecycl" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">kg</span>
                        </span>
                    </div>

                    <!-- Waste (part 2) -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls"></span>
                        <span class="RecipeEditSheetEntryContent_Cls RecipeEditSheetCheckboxList_Cls">
                            <span class="RecipeEditSheetLabel_Cls">Verts :</span> 
                            <input type="number" min="0" max="99" step="0.01" :value="w_biodeg" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">kg</span>
                            <span class="RecipeEditSheetLabel_Cls">Plastiques :</span> 
                            <input type="number" min="0" max="99" step="0.01" :value="w_plastics" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">kg</span>
                            <span class="RecipeEditSheetLabel_Cls">Briques :</span> 
                            <input type="number" min="0" max="99" step="0.01" :value="w_bricks" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">kg</span>
                        </span>
                    </div>

                    <!-- Waste (part 3) -->
                    <div class="RecipeEditSheetEntry_Cls">
                        <span class="RecipeEditSheetEntryTitle_Cls"></span>
                        <span class="RecipeEditSheetEntryContent_Cls RecipeEditSheetCheckboxList_Cls">
                            <span class="RecipeEditSheetLabel_Cls">Papiers :</span> 
                            <input type="number" min="0" max="99" step="0.01" :value="w_papers" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">kg</span>
                            <span class="RecipeEditSheetLabel_Cls">Verres :</span> 
                            <input type="number" min="0" max="99" step="0.01" :value="w_glasses" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">kg</span>
                            <span class="RecipeEditSheetLabel_Cls">Divers :</span> 
                            <input type="number" min="0" max="99" step="0.01" :value="w_others" style="width: 60px;"/> <span class="RecipeEditSheetUnit_Cls">kg</span>
                        </span>
                    </div>

                    <!-- Ingredients and waste (as ingredients) -->
                    <div class="RecipeEditSheetAlimentsList_Cls">
                        <div class="RecipeEditSheetAliments_Cls">
                            <div class="RecipeEditSheetTitleText_Cls" style="line-height: 50px;">Aliments <button>➕</button></div>
                            <div class="RecipeEditSheetTableLine_Cls">
                                <span class="RecipeEditSheetTitleText_Cls" style="flex-grow: 1;">Aliment</span>
                                <span class="RecipeEditSheetTitleText_Cls" style="min-width: 100px;">Qté (kg)</span>
                                <span class="RecipeEditSheetTitleText_Cls" style="min-width: 100px;">restant (kg)</span>
                                <span class="RecipeEditSheetTitleText_Cls" style="min-width: 30px;">Cru</span>
                                <span class="RecipeEditSheetTitleText_Cls" style="min-width: 30px;"></span>
                            </div>
                            <div v-for="ingredient in ingredients" class="RecipeEditSheetTableLine_Cls" v-bind:key="ingredient.data.id">
                                <span class="RecipeEditSheetValueText_Cls RecipeEditSheetIngredientLink_Cls" style="flex-grow: 1;">
                                    {{ ingredient.data.title }}
                                </span>
                                <span class="RecipeEditSheetValueText_Cls" style="min-width: 100px;">
                                    <input type="number" min="0" max="99" step="0.01" :value="ingredient.ingredient.quantity" style="width: 60px;"/>
                                </span>
                                <span class="RecipeEditSheetValueText_Cls" style="min-width: 100px;">
                                    <input type="number" min="0" max="99" step="0.01" :value="ingredient.ingredient.remainingQuantity" style="width: 60px;"/>
                                </span>
                                <span class="RecipeEditSheetValueText_Cls" style="min-width: 30px;">
                                    <input type="checkbox" :checked="ingredient.ingredient.raw">
                                </span>
                                <span class="RecipeEditSheetValueText_Cls RecipeEditSheetTrashLink_Cls" style="min-width: 30px;">
                                    🗑️
                                </span>
                            </div>
                        </div>
                        <div class="RecipeEditSheetWasteAliments_Cls">
                            <div class="RecipeEditSheetTitleText_Cls" style="line-height: 50px;">Déchets <button>➕</button></div>
                            <div class="RecipeEditSheetTableLine_Cls">
                                <span class="RecipeEditSheetTitleText_Cls" style="flex-grow: 1;">Aliment</span>
                                <span class="RecipeEditSheetTitleText_Cls" style="min-width: 100px;">Qté (kg)</span>
                                <span class="RecipeEditSheetTitleText_Cls" style="min-width: 30px;"></span>
                            </div>
                            <div v-for="waste in wastes" class="RecipeEditSheetTableLine_Cls" v-bind:key="waste.data.id">
                                <span class="RecipeEditSheetValueText_Cls RecipeEditSheetIngredientLink_Cls" style="flex-grow: 1;">
                                    {{ waste.data.title }}
                                </span>
                                <span class="RecipeEditSheetValueText_Cls" style="min-width: 100px;">
                                    <input type="number" min="0" max="99" step="0.01" :value="waste.ingredient.quantity" style="width: 60px;"/>
                                </span>
                                <span class="RecipeEditSheetValueText_Cls RecipeEditSheetTrashLink_Cls" style="min-width: 30px;">
                                    🗑️
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right part: recipe content -->
                <div class="RecipeEditSheetRight_Cls">
                    <div class="RecipeEditSheetContent_Cls">
                        <div class="RecipeEditSheetContentRaw_Cls">
                            <span class="RecipeEditSheetEntryTitle_Cls">Contenu brut :</span>
                            <textarea style="flex-grow: 1; margin: 5px;" :value="content" @input="updateContent($event.target.value)"></textarea>
                        </div>
                        <div class="RecipeEditSheetContentMarked_Cls">
                            <span class="RecipeEditSheetEntryTitle_Cls">Rendu :</span>
                            <span class="RecipeEditSheetRendered_Cls" v-dompurify-html="markedContent"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .RecipeEditSheet_Cls
    {
        backdrop-filter:    blur(5px);
    }

    .RecipeEditSheetBg_Cls
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

    .RecipeEditSheetHeader_Cls
    {
        display:            flex;
    }

    .RecipeEditSheetButton_Cls
    {
        height:             50px;
        width:              100px;
        line-height:        50px;
        text-align:         center;
        margin-left:        5px;
        color:              #c8b273;
        background-color:   #834655;
    }

    .RecipeEditSheetButton_Cls:hover
    {
        text-decoration:    underline;
        cursor:             pointer;
        user-select:        none;
    }

    .RecipeEditSheetCentralContainer_Cls
    {
        display:            flex;
        flex-grow:          1;
        overflow:           hidden;
    }

    .RecipeEditSheetLoadingPage_Cls
    {
        display:            flex;
        flex-direction:     column;
        justify-content:    center;
        text-align:         center;
        flex-grow:          1;
    }

    .RecipeEditSheetErrorPage_Cls
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

    .RecipeEditSheetLeft_Cls
    {
        display:            flex;
        flex-direction:     column;
        flex-grow:          1;
        min-width:          50%;
        max-width:          50%;
        gap:                10px;
    }

    .RecipeEditSheetRight_Cls
    {
        display:            flex;
        flex-direction:     column;
        flex-grow:          1;
        margin-bottom:      40px;
    }

    .RecipeEditSheetEntry_Cls
    {
        display:            flex;
        gap:                10px;
        margin-left:        10px;
        margin-right:       10px;
    }

    .RecipeEditSheetEntryTitle_Cls
    {
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        color:              #c8b273;
        min-width:          150px;
    }

    .RecipeEditSheetEntryContent_Cls
    {
        flex-grow:          1;
    }

    input
    {
        border:             solid 1px #c8b273;
        background-color:   #9f5069;
        outline:            none;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .RecipeEditSheetCheckboxList_Cls
    {
        display:            flex;
        gap:                10px;
    }

    .RecipeEditSheetUnit_Cls
    {
        font-size:          0.8em;
        margin-right:       20px;
        line-height:        20px;
        min-width:          30px;
    }

    .RecipeEditSheetLabel_Cls
    {
        min-width:          100px;
    }

    .RecipeEditSheetContent_Cls
    {
        display:            flex;
        flex-direction:     column;
        height:             100%;
        margin:             10px;
    }

    .RecipeEditSheetContentRaw_Cls
    {
        display:            flex;
        flex-direction:     column;
        min-height:         50%;
        flex-grow:          1;
    }

    .RecipeEditSheetContentMarked_Cls
    {
        display:            flex;
        flex-direction:     column;
        min-height:         50%;
        flex-grow:          1;
        margin-top:         20px;
    }

    .RecipeEditSheetAlimentsList_Cls
    {
        display:            flex;
        margin-left:        10px;
        margin-right:       10px;
        margin-bottom:      10px;
        flex-grow:          1;
    }

    .RecipeEditSheetAliments_Cls
    {
        display:            flex;
        flex-direction:     column;
        width:              60%;
        gap:                5px;
    }

    .RecipeEditSheetWasteAliments_Cls
    {
        display:            flex;
        flex-direction:     column;
        width:              40%;
        gap:                5px;
    }

    .RecipeEditSheetTableLine_Cls
    {
        display:            flex;
    }

    button
    {
        height:         30px;
        width:          30px;
        border:         solid 1px #c8b273;
        border-radius:  5px;
        margin-left:    5px;
    }

    .RecipeEditSheetTitleText_Cls
    {
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        color:              #c8b273;
        text-align:         center;
    }

    .RecipeEditSheetValueText_Cls
    {
        text-align:         center;
        font-size:          0.8em;
    }

    .RecipeEditSheetIngredientLink_Cls
    {
        color:              #c8b273;
    }

    .RecipeEditSheetIngredientLink_Cls:hover
    {
        cursor:             pointer;
        text-decoration:    underline;
    }

    .RecipeEditSheetTrashLink_Cls:hover
    {
        cursor:             pointer;
    }

    .RecipeEditSheetRendered_Cls
    {
        overflow:           auto;
        margin-top:         10px;
    }
</style>
