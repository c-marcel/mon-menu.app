<script setup>
    import EnvironmentalImpact from './Food/EnvironmentalImpact.vue'
    import Nutrition           from './Food/Nutrition.vue'
    import Months              from './Food/Months.vue'

    import { ref } from 'vue'
    import axios from 'axios'

    let foods    = ref([])
    let fooddata = ref(null)

    // Read all foods from Api.
    let config =
    {
        headers:
        {
            "auth-token": "1e91ccce-9a8d-45a8-8d72-0decd3549a12",
        }
    }

    axios.get('https://api.mon-menu.app/getFoods', config)
        .then((response) =>
        {
            foods.value = response.data.foods
        })

    function loadFoodData(id)
    {
        // Load food data from Api.
        axios.get('https://api.mon-menu.app/getFoodData/' + id, config)
        .then((response) =>
        {
            fooddata.value = response.data
        })
    }
</script>

<template>
    <div>
        <div class="Foods_List_cls">
            <p class="Foods_List_Title_cls">Aliments</p>
            <ul>
                <li v-for="entry in foods" @click="loadFoodData(entry.id)">
                <p class="Foods_List_Entry_Title_cls">{{ entry.title }}</p>
                <p class="Foods_List_Entry_Subtitle_cls">{{ entry.details }}</p>
                </li>
            </ul>
        </div>

        <div v-if="fooddata" class="FoodData_cls">
            <p class="FoodData_Title_cls">{{ fooddata.title }}</p>
            <p class="FoodData_Subtitle_cls">{{ fooddata.details }}</p>
            <div class="FoodData_Spacer_cls"></div>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Disponibilité : </span> <Months :months="fooddata.months" /></p>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Approvisionnement : </span><span class="FoodData_Entry_Value">{{ fooddata.supplyArea == 1 ? "local" : fooddata.supplyArea == 2 ? "national" : fooddata.supplyArea == 4 ? "continental" : fooddata.supplyArea == 8 ? "mondial" : "non défini" }}</span></p>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Prix : </span><span class="FoodData_Entry_Value">{{ fooddata.cost }} €/kg</span></p>
            <div class="FoodData_Spacer_cls"></div>
            <EnvironmentalImpact :data="fooddata.environmentalImpact"></EnvironmentalImpact>
            <Nutrition :data="fooddata.nutrition"></Nutrition>
        </div>
    </div>
</template>

<style scoped>
    .Foods_List_cls
    {
        position:           absolute;
        background-color: #e3edf0;
        width:              25%;
        margin:             0px;
        top:                10px;
        left:               10px;
        bottom:             10px;
        border:             solid 1px blue;
        border-radius:      5px;
    }

    .Foods_List_Title_cls
    {
        color:              blue;
        font-size:          1.3em;
        font-weight:        bold;
        text-align:         center;
    }

    ul
    {
        list-style: none;
        margin:     10px;
        padding:    0px;
    }

    li
    {
        margin-top: 10px;
        cursor:     pointer;
    }

    .Foods_List_Entry_Title_cls
    {
        margin:         0px;
        font-weight:    bold;
        font-size:      1.1em;
        color:        #66b2ff;
    }

    .Foods_List_Entry_Subtitle_cls
    {
        margin:     0px;
        font-style: italic;
    }

    .FoodData_cls
    {
        position:   absolute;
        left:       27%;
        top:        10px;
        right:      10px;
        bottom:     10px;
        overflow:   auto;
    }

    .FoodData_Title_cls
    {
        font-weight:    bold;
        font-size:      1.3em;
        color:        #66b2ff;
        margin:         0px;
    }

    .FoodData_Subtitle_cls
    {
        margin:     0px;
        font-style: italic;
    }

    .FoodData_Entry_Title
    {
        display:        inline-block;
        font-weight:    bold;
        min-width:      150px;
    }

    .FoodData_Entry_Value
    {
    }

    .FoodData_Entry_cls
    {
        margin-top:     5px;
        margin-bottom:  0px;
    }

    .FoodData_Spacer_cls
    {
        height: 20px;
    }
</style>
