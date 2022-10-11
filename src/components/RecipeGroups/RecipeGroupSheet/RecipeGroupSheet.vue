// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Recipe group sheet for displaying recipe group data.
// Edit mode available for admin access.
<script setup>
    import { ref, watch, inject } from 'vue'
    import axios from 'axios'

    import RecipeGroupTitle from './RecipeGroupTitle.vue'
    import ErrorDialog      from '../../ErrorDialog.vue'
    import RecipeList       from './RecipeList.vue'

    axios.defaults.withCredentials = true

    let emit = defineEmits(['listOutdated'])

    let sessionData         = ref(inject('sessionData'))
    let recipeList          = ref([])
    let loadedId            = ref('')
    let errorMsg            = ref('')
    let variantsErrorMsg    = ref('')
    let sortOrder           = ref('')
    let sortKey             = ref('')
    let titleModified       = ref(false)
    let currentTitle        = ref('')

    let props = defineProps(['currentGroupId', 'edit', 'title'])

    // Watch props changes to update food sheet.
    watch(props, (value) =>
    {
        if(loadedId.value != value.currentGroupId && value.currentGroupId != '')
        {
            recipeList.value = []
            loadGroupData(value.currentGroupId)
        }

        // If edit mode has been terminated: save item.
        if (!value.edit && titleModified.value && loadedId.value != '')
        {
            errorMsg.value = ''

            let recipeGroup =
            {
                id:     loadedId.value,
                title:  currentTitle.value
            }

            // Send food data to Api.
            axios.put('https://api.mon-menu.app/updateRecipeGroup', recipeGroup)
            .then((response) =>
            {
                if (response.status != 200)
                {
                    errorMsg.value = 'Impossible d\'enregistrer les modifications effectuées dans la base de données.'
                }
                else
                {
                    titleModified.value = false

                    emit('listOutdated', currentTitle.value);
                    loadGroupData(value.currentGroupId)
                }
            }).catch(function(error)
            {
                console.log(error)
                errorMsg.value = 'Erreur réseau : impossible d\'enregistrer les modifications effectuées dans la base de données. Contacter l\'administrateur du site.'
            });
        }
    })

    function addRecipeIntoList(response)
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
        if (response.data.nbOfParts > 0 )
        {
            let energyCost = response.data.ingredientsCost

            // Hob energy cost.
            if (sessionData.value.hobEnergy == 'electricity')
                energyCost += response.data.resources.energy.hob * sessionData.value.electricityCost / 100.0

            else if (sessionData.value.hobEnergy == 'gas')
                energyCost += response.data.resources.energy.hob * sessionData.value.gasCost / 100.0

            // Oven energy cost.
            if (sessionData.value.ovenEnergy == 'electricity')
                energyCost += response.data.resources.energy.oven * sessionData.value.electricityCost / 100.0

            else if (sessionData.value.ovenEnergy == 'gas')
                energyCost += response.data.resources.energy.oven * sessionData.value.gasCost / 100.0

            // Kettle energy cost.
            if (sessionData.value.kittleEnergy == 'electricity')
                energyCost += response.data.resources.energy.kettle * sessionData.value.electricityCost / 100.0

            else if (sessionData.value.kittleEnergy == 'gas')
                energyCost += response.data.resources.energy.kettle * sessionData.value.gasCost / 100.0

            recipe.cost = energyCost / response.data.nbOfParts
        }
        else
            recipe.cost = '-'

        // Energy.
        if (response.data.nbOfParts > 0 )
            recipe.energy = (response.data.resources.energy.oven + response.data.resources.energy.hob) / response.data.nbOfParts
        else
            recipe.energy = '-'

        // CO2.
        if (response.data.nbOfParts > 0 )
        {
            let co2 = response.data.environmentalImpact.ingredientsCo2eq

            // Hob energy cost.
            if (sessionData.value.hobEnergy == 'electricity')
                co2 += response.data.resources.energy.hob * sessionData.value.co2Electricity

            else if (sessionData.value.hobEnergy == 'gas')
                co2 += response.data.resources.energy.hob * sessionData.value.co2Gas

            // Oven energy cost.
            if (sessionData.value.ovenEnergy == 'electricity')
                co2 += response.data.resources.energy.oven * sessionData.value.co2Electricity

            else if (sessionData.value.ovenEnergy == 'gas')
                co2 += response.data.resources.energy.oven * sessionData.value.co2Gas

            // Kettle energy cost.
            if (sessionData.value.kittleEnergy == 'electricity')
                co2 += response.data.resources.energy.kettle * sessionData.value.co2Electricity

            else if (sessionData.value.kittleEnergy == 'gas')
                co2 += response.data.resources.energy.kettle * sessionData.value.co2Gas

            recipe.co2 = co2 / response.data.nbOfParts
        }
        else
            recipe.co2 = '-'

        // Time.
        recipe.time = response.data.times.preparation + response.data.times.cooking + response.data.times.rest

        recipeList.value.push(recipe)
    }

    function loadGroupData(id)
    {
        errorMsg.value         = ''
        variantsErrorMsg.value = ''
        titleModified.value    = false
        recipeList.value       = []

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
                        addRecipeIntoList(response)
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

    function sortByTime()
    {
        sortKey.value = 'time'
        
        if (sortOrder == 'asc')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.time > item2.time)
            });
        }

        else if (sortOrder == 'des')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.time < item2.time)
            });
        }
    }

    function sortByCo2()
    {
        sortKey.value = 'co2'
        
        if (sortOrder == 'asc')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.co2 > item2.co2)
            });
        }

        else if (sortOrder == 'des')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.co2 < item2.co2)
            });
        }
    }

    function sortByEnergy()
    {
        sortKey.value = 'energy'
        
        if (sortOrder == 'asc')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.energy > item2.energy)
            });
        }

        else if (sortOrder == 'des')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.energy < item2.energy)
            });
        }
    }

    function sortByCost()
    {
        sortKey.value = 'cost'
        
        if (sortOrder == 'asc')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.cost > item2.cost)
            });
        }

        else if (sortOrder == 'des')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.cost < item2.cost)
            });
        }
    }

    function sortBySeason()
    {
        sortKey.value = 'season'
        
        if (sortOrder == 'asc')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.available > item2.available)
            });
        }

        else if (sortOrder == 'des')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.available < item2.available)
            });
        }
    }

    function sortByDiet()
    {
        sortKey.value = 'diet'
        
        if (sortOrder == 'asc')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.diet.reduce((accumulator, value) =>
                        {
                            return accumulator + value;
                        }, 0) > item2.diet.reduce((accumulator, value) =>
                        {
                            return accumulator + value;
                        }, 0))
            });
        }

        else if (sortOrder == 'des')
        {
            recipeList.value = recipeList.value.sort((item1, item2) =>
            {
                return (item1.diet.reduce((accumulator, value) =>
                        {
                            return accumulator + value;
                        }, 0) < item2.diet.reduce((accumulator, value) =>
                        {
                            return accumulator + value;
                        }, 0))
            });
        }
    }

    function sortList(key)
    {
        // If key is already used: switch order.
        if (sortKey.value == key)
        {
            if (sortOrder == 'asc')
                sortOrder = 'des'

            else
                sortOrder = 'asc'
        }

        // Else: use ascending for the first time.
        else
            sortOrder = 'asc'

        if (key == 'time')
            sortByTime()

        else if (key == 'co2')
            sortByCo2()

        else if (key == 'energy')
            sortByEnergy()

        else if (key == 'cost')
            sortByCost()

        else if (key == 'season')
            sortBySeason()

        else if (key == 'diet')
            sortByDiet()
    }

    function updateTitle(title)
    {
        titleModified.value = true
        currentTitle.value  = title
    }

    function removeRecipeFromList(id)
    {
        recipeList.value = recipeList.value.filter(item =>
        {
            return (item.id != id)
        });

        if (recipeList.value.length == 0)
        {
            variantsErrorMsg.value = 'Cette recette ne contient pas de variantes.'
        }
    }

    function loadRecipeIntoList(id)
    {
        variantsErrorMsg.value = ''

        axios.get('https://api.mon-menu.app/getRecipeMetadata/' + id)
        .then((response) =>
        {
            addRecipeIntoList(response)
        }).catch(function(error)
        {
            variantsErrorMsg.value = 'Impossible de charger la variante ajoutée.'
        });
    }
</script>

<template>
    <div class="RecipeGroupSheet_cls">
        <div v-show="currentGroupId != '' && errorMsg == ''" class="RecipeGroup_cls">
            <RecipeGroupTitle :title="title" :edit="edit" @changeTitle="(title) => { updateTitle(title) }" />
            <RecipeList :currentGroupId="currentGroupId" :recipeList="recipeList" :sortKey="sortKey" @sortRequested="(key) => { sortList(key) }" @removeRecipeRequested="(id) => { removeRecipeFromList(id) }" @addRecipeRequested="(id) => {loadRecipeIntoList(id)} "/>
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
