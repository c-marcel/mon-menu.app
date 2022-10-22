// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Food sheet for displaying food data.
// Edit mode available for admin access.
<script setup>
    import { ref, watch } from 'vue'
    import axios from 'axios'

    axios.defaults.withCredentials = true

    import ExternalDatabaseSelection from './ExternalDatabaseSelection.vue'
    import EnvironmentalImpact       from './EnvironmentalImpact.vue'
    import DisplayUnit               from './DisplayUnit.vue'
    import ErrorDialog               from '../../ErrorDialog.vue'
    import Nutrition                 from './Nutrition.vue'
    import Contains                  from './Contains.vue'
    import Months                    from './Months.vue'
    import Title                     from './Title.vue'
    import Subtitle                  from './Subtitle.vue'
    import SupplyArea                from './SupplyArea.vue'
    import Cost                      from './Cost.vue'

    let emit = defineEmits(['listOutdated'])

    let fooddata     = ref(null)
    let errorMsg     = ref('')
    let loadedId     = ref(0)
    let foodModified = ref(false)
    let conversion   = ref({enabled: false, label: "", factor: 0.0})
    let carbonDb     = ref([])
    let nutritionDb  = ref([])
    let co2SelOpen   = ref(false)
    let nutSelOpen   = ref(false)

    let props = defineProps(['currentFoodId', 'edit'])

    // Watch props changes to update food sheet.
    watch(props, (value) =>
    {
        if(loadedId != value.currentFoodId && value.currentFoodId != 0)
        {
            foodModified.value = false
            loadFoodData(value.currentFoodId)
        }

        if (value.currentFoodId == 0)
        {
            loadedId       = 0
            fooddata.value = null
        }

        // If edit mode has been terminated: save item.
        if (!value.edit && foodModified.value && loadedId.value != '' && fooddata.value)
        {
            errorMsg.value = ''

            // Add conversion object.
            if (String(conversion.value.enabled) == "true")
            {
                fooddata.value.units =
                {
                    label:      conversion.value.label,
                    conversion: conversion.value.factor
                }
            }

            else
                fooddata.value.units = null

            // Send food data to Api.
            axios.put('https://api.mon-menu.app/updateFood', fooddata.value)
            .then((response) =>
            {
                if (response.status != 200)
                {
                    errorMsg.value = 'Impossible d\'enregistrer les modifications effectuées dans la base de données.'
                }
                else
                {
                    emit('listOutdated');
                }
            }).catch(function(error)
            {
                errorMsg.value = 'Erreur réseau : impossible d\'enregistrer les modifications effectuées dans la base de données. Contacter l\'administrateur du site.'
            });
        }
    })

    function loadFoodData(id)
    {
        errorMsg.value = ''

        // Load food data from Api.
        axios.get('https://api.mon-menu.app/getFoodData/' + id)
        .then((response) =>
        {
            if (response.status == 200)
            {
                fooddata.value = response.data
                loadedId       = id

                // Load conversion.
                conversion.value.enabled = (response.data.units != null)

                if(response.data.units)
                {
                    conversion.value.label  = response.data.units.label
                    conversion.value.factor = response.data.units.conversion
                }

                else
                {
                    conversion.value.label  = ""
                    conversion.value.factor = 0.0
                }
            }

            else
                errorMsg.value = 'Impossible de récupérer les données de l\'aliment sélectionné.'
        }).catch(function(error)
        {
            errorMsg.value = 'Impossible de récupérer les données de l\'aliment sélectionné.'
        });
    }

    function updateTitle(title)
    {
        if (!props.edit)
            return

        fooddata.value.title = title
        foodModified.value   = true
    }

    function updateSubtitle(subtitle)
    {
        if (!props.edit)
            return

        fooddata.value.details = subtitle
        foodModified.value     = true
    }

    function toogleMonth(month)
    {
        if (!props.edit)
            return

        if (fooddata.value.months == null)
            fooddata.value.months = []

        if (fooddata.value.months.includes(month))
            fooddata.value.months = fooddata.value.months.filter(e => {return e != month})

        else
            fooddata.value.months.push(month)

            foodModified.value = true
    }

    function updateSupplyArea(area)
    {
        if (!props.edit)
            return

        fooddata.value.supplyArea = area
        foodModified.value        = true
    }

    function updateCost(cost)
    {
        if (!props.edit)
            return

        fooddata.value.cost = cost
        foodModified.value  = true
    }

    function updateContains(type, value)
    {
        if (!props.edit)
            return

        foodModified.value  = true

        if (value && !fooddata.value.contains.includes(type))
            fooddata.value.contains.push(type)
        
        else
            fooddata.value.contains = fooddata.value.contains.filter(e => {return e != type})
    }

    function updateCo2eq(value)
    {
        if (!props.edit)
            return

        fooddata.value.environmentalImpact.co2eq.kgco2e_kg = value
        foodModified.value                                 = true
    }

    function changeCo2eqSource(value)
    {
        if (!props.edit)
            return

        fooddata.value.environmentalImpact.co2eq.source = value
        foodModified.value                              = true
    }

    function updateNutrition(field, value)
    {
        if (!props.edit)
            return

        fooddata.value.nutrition[field].value = value
        foodModified.value                    = true
    }

    function updateNutritionSource(field, value)
    {
        if (!props.edit)
            return

        fooddata.value.nutrition[field].source = value
        foodModified.value                     = true
    }

    function enableConversion(value)
    {
        conversion.value.enabled = value
        foodModified.value       = true
    }

    function conversionLabelChanged(label)
    {
        conversion.value.label = label
        foodModified.value     = true
    }

    function conversionFactorChanged(factor)
    {
        conversion.value.factor = factor
        foodModified.value      = true
    }

    function loadCarbonDatabase()
    {
        carbonDb.value = []

        axios.get('https://mon-menu.app/databases/agribalyse.json')
        .then((response) =>
        {
            for (let i = 0 ;  i < response.data.length ; i++)
            {
                let item = 
                {
                    title: response.data[i].title,
                    value: response.data[i].value
                }

                carbonDb.value.push(item)
            }
        })
        .catch(function(error)
        {
            // TODO
            console.log("Error while reading Carbon database.")
            console.log(error)
        });
    }

    loadCarbonDatabase()

    function setCarbonValue(value)
    {
        if (!props.edit)
            return

        fooddata.value.environmentalImpact.co2eq.kgco2e_kg = value
        fooddata.value.environmentalImpact.co2eq.source    = "ADEME Base carbone® v19.0 (AGRIBALYSE)"
        foodModified.value                                 = true
        co2SelOpen.value                                   = false
    }

    function openCarbonDatabase()
    {
        co2SelOpen.value = true
    }

    function loadNutritionatabase()
    {
        nutritionDb.value = []

        axios.get('https://mon-menu.app/databases/ciqual_calnut.json')
        .then((response) =>
        {
            for (let i = 0 ;  i < response.data.length ; i++)
            {
                let item = 
                {
                    title: response.data[i].title,
                    value: response.data[i]
                }

                nutritionDb.value.push(item)
            }
        })
        .catch(function(error)
        {
            // TODO
            console.log("Error while reading nutrition database.")
            console.log(error)
        });
    }

    loadNutritionatabase()

    function setNutritionValues(values)
    {
        if (!props.edit)
            return

        let keys = ["energy_kj", "energy", "water", "salt", "sodium", "magnesium", "phosphorus", "potassium", "calcium", "manganese", "iron", "copper", "zinc", "selenium", "iodine", "proteins", "carbohydrates", "sugars", "fructose", "galactose", "lactose", "glucose", "maltose", "sucrose", "starch", "polyols", "fibers", "lipids", "satured_fa", "monounsaturated_fa", "polyunsaturated_fa", "butyric_fa", "caproic_fa", "caprylic_fa", "whimsical_fa", "lauric_fa", "myristic_fa", "palmitic_fa", "stearic_fa", "omega9", "omega6_la", "omega3_ala", "omega6_ara", "omega3_epa", "omega3_dha", "retinol", "betacarotene", "vitamin_d", "vitamin_e", "vitamin_k1", "vitamin_k2", "vitamin_c", "vitamin_b1", "vitamin_b2", "vitamin_b3", "vitamin_b5", "vitamin_b6", "vitamin_b12", "vitamin_b9", "alcohol", "organic_acids", "cholesterol"]

        for (let i = 0 ; i < keys.length; i++)
        {
            if (!fooddata.value.nutrition.hasOwnProperty(keys[i]))
            {
                fooddata.value.nutrition[keys[i]] =
                {
                    value: 0.0,
                    source: ''
                }
            }

            fooddata.value.nutrition[keys[i]].value = values[keys[i]]
            fooddata.value.nutrition[keys[i]].source = values[keys[i] + '_src']
        }

        foodModified.value = true
        nutSelOpen.value   = false
    }

    function openNutritionDatabase()
    {
        nutSelOpen.value = true
    }
</script>

<template>
    <div class="FoodSheet_cls">
        <div v-if="fooddata && !co2SelOpen && !nutSelOpen" class="FoodData_cls">
            <Title :title="fooddata.title" :edit="edit" @changeTitle="(title) => updateTitle(title)" />
            <Subtitle :subtitle="fooddata.details" :edit="edit" @changeSubtitle="(subtitle) => updateSubtitle(subtitle)" />
            <div class="FoodData_Spacer_cls"></div>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Disponibilité : </span><Months :months="fooddata.months" :edit="edit" @toogleMonth="(month) => toogleMonth(month)" /></p>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Approvisionnement : </span><SupplyArea :area="fooddata.supplyArea" :edit="edit" @changeSupplyArea="(area) => updateSupplyArea(area)" /></p>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Prix : </span><Cost :cost="fooddata.cost" :edit="edit" @changeCost="(cost) => updateCost(cost)" /></p>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Unité d'affichage : </span><DisplayUnit :edit="edit" :conversionEnabled="conversion.enabled" :label="conversion.label" :conversionFactor="conversion.factor" @enableConversion="(value) => enableConversion(value)" @labelChanged="(value) => conversionLabelChanged(value)" @factorChanged="(value) => conversionFactorChanged(value)" /></p>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Contient : </span><Contains :edit="edit" :contains="fooddata.contains" @changeContains="(type, value) => updateContains(type, value)"/></p>
            <div class="FoodData_Spacer_cls"></div>
            <EnvironmentalImpact :data="fooddata.environmentalImpact" :edit="edit" @changeCo2eq="(value) => updateCo2eq(value)" @changeCo2eqSource="(value) => changeCo2eqSource(value)" @databaseSelectionRequested="openCarbonDatabase()"/>
            <Nutrition :data="fooddata.nutrition" :edit="edit" @changeNutritionData="(field, value) => updateNutrition(field, value)" @changeNutritionDataSource="(field, value) => updateNutritionSource(field, value)" @databaseSelectionRequested="openNutritionDatabase()"/>
            <div class="FoodData_Spacer_cls"></div>
        </div>

        <div v-if="errorMsg && !co2SelOpen && !nutSelOpen" class="DialogContainer_cls">
            <ErrorDialog class="ErrorDialog_cls" :errorMsg="errorMsg" buttonTitle="" />
        </div>

        <div v-if="co2SelOpen" class="DialogContainer_cls">
            <ExternalDatabaseSelection class="ExtDbSelection_Cls" title="Base Carbone ADEME - Agribalyse" :items="carbonDb" @listItemClicked="(value) => setCarbonValue(value)"/>
        </div>

        <div v-if="nutSelOpen" class="DialogContainer_cls">
            <ExternalDatabaseSelection class="ExtDbSelection_Cls" title="Base nutrition Ciqual/CALNUT" :items="nutritionDb" @listItemClicked="(values) => setNutritionValues(values)"/>
        </div>
    </div>
</template>

<style scoped>
    .FoodSheet_cls
    {
        flex-grow:  1;
        border:     dashed 1px #c8b273;
        overflow:   auto;
    }

    .DialogContainer_cls
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

    .FoodData_cls
    {
        display:        flex;
        flex-direction: column;
        padding:        5px;
    }

    .FoodData_Entry_Title
    {
        display:        inline-block;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-weight:    bold;
        color:        #c8b273;
        min-width:      200px;
    }
    .FoodData_Entry_cls
    {
        margin-top:     5px;
        margin-bottom:  0px;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .FoodData_Spacer_cls
    {
        height: 20px;
    }

    .ExtDbSelection_Cls
    {
        left:           50%;
        transform:      translate(-50%, 0px);
        width:          90%;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .FoodData_cls
        {
            padding:        15px;
        }

        .FoodData_Entry_Title
        {
            min-width:      400px;
            font-size:      2em;
        }

        .FoodData_Entry_cls
        {
            margin-top:     15px;
        }

        .FoodData_Spacer_cls
        {
            height: 50px;
        }
    }
</style>
