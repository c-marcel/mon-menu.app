<script setup>
    import { ref, watch } from 'vue'
    import axios from 'axios'

    import EnvironmentalImpact from './EnvironmentalImpact.vue'
    import ErrorDialog         from '../../ErrorDialog.vue'
    import Nutrition           from './Nutrition.vue'
    import Months              from './Months.vue'
    import Title               from './Title.vue'
    import Subtitle            from './Subtitle.vue'
    import SupplyArea          from './SupplyArea.vue'
    import Cost                from './Cost.vue'

    let emit = defineEmits(['listOutdated'])

    let fooddata     = ref(null)
    let errorMsg     = ref('')
    let loadedId     = ref(0)
    let foodModified = ref(false)

    let props = defineProps(['currentFoodId', 'edit'])

    // Watch props changes to update food sheet.
    watch(props, (value) =>
    {
        if(loadedId != value.currentFoodId)
        {
            foodModified.value = false
            loadFoodData(value.currentFoodId)
        }

        // If edit mode has been terminated: save item.
        if (!value.edit && foodModified.value && loadedId.value != 0 && fooddata.value)
        {
            errorMsg.value = ''

            // Send food data to Api.
            axios.put('https://api.mon-menu.app/updateFood', fooddata.value, config)
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
                console.log(error)
                errorMsg.value = 'Erreur réseau : impossible d\'enregistrer les modifications effectuées dans la base de données. Contacter l\'administrateur du site.'
            });
        }
    }) 

    // TODO: remove to config panel.
    let config =
    {
        headers:
        {
            "auth-token": "1e91ccce-9a8d-45a8-8d72-0decd3549a12",
        }
    }

    function loadFoodData(id)
    {
        errorMsg.value = ''

        // Load food data from Api.
        axios.get('https://api.mon-menu.app/getFoodData/' + id, config)
        .then((response) =>
        {
            if (response.status == 200)
            {
                fooddata.value = response.data
                loadedId       = id
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
</script>

<template>
    <div class="FoodSheet_cls">
        <div v-if="fooddata" class="FoodData_cls">
            <Title :title="fooddata.title" :edit="edit" @changeTitle="(title) => updateTitle(title)"></Title>
            <Subtitle :subtitle="fooddata.details" :edit="edit" @changeSubtitle="(subtitle) => updateSubtitle(subtitle)"></Subtitle>
            <div class="FoodData_Spacer_cls"></div>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Disponibilité : </span><Months :months="fooddata.months" :edit="edit" @toogleMonth="(month) => toogleMonth(month)"/></p>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Approvisionnement : </span><SupplyArea :area="fooddata.supplyArea" :edit="edit" @changeSupplyArea="(area) => updateSupplyArea(area)"></SupplyArea></p>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Prix : </span><Cost :cost="fooddata.cost" :edit="edit" @changeCost="(cost) => updateCost(cost)"></Cost></p>
            <div class="FoodData_Spacer_cls"></div>
            <EnvironmentalImpact :data="fooddata.environmentalImpact" :edit="edit" @changeCo2eq="(value) => updateCo2eq(value)" @changeCo2eqSource="(value) => changeCo2eqSource(value)" ></EnvironmentalImpact>
            <Nutrition :data="fooddata.nutrition" :edit="edit" @changeNutritionData="(field, value) => updateNutrition(field, value)" @changeNutritionDataSource="(field, value) => updateNutritionSource(field, value)"></Nutrition>
        </div>

        <div v-if="errorMsg" class="ErrorMsgContainer_cls">
            <ErrorDialog class="ErrorDialog_cls" :errorMsg="errorMsg" buttonTitle=""></ErrorDialog>
        </div>
    </div>
</template>

<style scoped>
    .FoodSheet_cls
    {
        position:   fixed;
        top:        180px;
        left:       25%;
        right:      34px;
        bottom:     10px;
        transform:  translate(24px, 0%);
        border:     dashed 1px #c8b273;
    }

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

    .FoodData_cls
    {
        display:        flex;
        flex-direction: column;
        position:       absolute;
        left:           5px;
        top:            5px;
        right:          5px;
        bottom:         5px;
        overflow:       auto;
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
</style>
