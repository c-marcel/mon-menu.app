<script setup>
    import EnvironmentalImpact from './Food/EnvironmentalImpact.vue'
    import Nutrition           from './Food/Nutrition.vue'
    import Months              from './Food/Months.vue'
    import Title               from './Food/Title.vue'
    import Subtitle            from './Food/Subtitle.vue'
    import SupplyArea          from './Food/SupplyArea.vue'
    import Cost                from './Food/Cost.vue'

    import { ref } from 'vue'
    import axios from 'axios'

    let foods         = ref([])
    let fooddata      = ref(null)
    let currentFoodId = ref(0)
    let edit          = ref(false)

    // Read all foods from Api.
    let config =
    {
        headers:
        {
            "auth-token": "1e91ccce-9a8d-45a8-8d72-0decd3549a12",
        }
    }

    loadFoods()

    function loadFoods()
    {
        axios.get('https://api.mon-menu.app/getFoods', config)
        .then((response) =>
        {
            foods.value = response.data.foods
        })
    }

    function loadFoodData(id)
    {
        // Load food data from Api.
        axios.get('https://api.mon-menu.app/getFoodData/' + id, config)
        .then((response) =>
        {
            fooddata.value = response.data
            currentFoodId  = id
        })
    }

    function addFoodEntry()
    {
        // Add entry into database through Api.
        axios.post('https://api.mon-menu.app/createFood', '', config)
        .then((response) =>
        {
            if (response.status == 200)
                loadFoods()

            // TODO: check for error.
        })
    }

    function deleteFood(event, id)
    {
        // Add entry into database through Api.
        axios.delete('https://api.mon-menu.app/deleteFood/' + id, config)
        .then((response) =>
        {
            if (response.status == 200)
                loadFoods()

            // TODO: check for error.
        })

        event.stopPropagation();
    }

    function saveFood()
    {
        // Send food data to Api.
        axios.put('https://api.mon-menu.app/updateFood', fooddata.value, config)
        .then((response) =>
        {
            // TODO: check for error.
        })
    }

    function toogleEditMode()
    {
        if (edit.value)
            saveFood()

        edit.value = !edit.value
    }

    function updateTitle(title)
    {
        if (!edit.value)
            return

        fooddata.value.title = title

        for (let i = 0 ; i < foods.value.length ; i++)
        {
            var id = foods.value[i].id
            if (id == currentFoodId)
                foods.value[i].title = title
        }
    }

    function updateSubtitle(subtitle)
    {
        if (!edit.value)
            return

        fooddata.value.details = subtitle

        for (let i = 0 ; i < foods.value.length ; i++)
        {
            var id = foods.value[i].id
            if (id == currentFoodId)
                foods.value[i].details = subtitle
        }
    }

    function toogleMonth(month)
    {
        if (!edit.value)
            return

        if (fooddata.value.months == null)
            fooddata.value.months = []

        if (fooddata.value.months.includes(month))
            fooddata.value.months = fooddata.value.months.filter(e => {return e != month})

        else
            fooddata.value.months.push(month)
    }

    function updateSupplyArea(area)
    {
        if (!edit.value)
            return

        fooddata.value.supplyArea = area
    }

    function updateCost(cost)
    {
        if (!edit.value)
            return

        fooddata.value.cost = cost
    }

    function updateCo2eq(value)
    {
        if (!edit.value)
            return

        fooddata.value.environmentalImpact.co2eq.kgco2e_kg = value
    }

    function changeCo2eqSource(value)
    {
        if (!edit.value)
            return

        fooddata.value.environmentalImpact.co2eq.source = value
    }

    function updateNutrition(field, value)
    {
        if (!edit.value)
            return

        fooddata.value.nutrition[field].value = value
    }

    function updateNutritionSource(field, value)
    {
        if (!edit.value)
            return

            fooddata.value.nutrition[field].source = value
    }
</script>

<template>
    <div>
        <div class="Foods_List_cls">
            <p class="Foods_List_Title_cls">Aliments</p>
            <button class="Foods_Add_Button_cls" @click="addFoodEntry()">Ajouter une entrée</button>
            <ul>
                <li v-for="entry in foods" @click="loadFoodData(entry.id)">
                    <span class="Foods_List_Entry_Title_cls">{{ entry.title }}</span><button class="Foods_Remove_Button_cls" @click="deleteFood($event, entry.id)">🗑️</button>
                    <p class="Foods_List_Entry_Subtitle_cls">{{ entry.details }}</p>
                </li>
            </ul>
        </div>

        <div v-if="fooddata" class="FoodData_cls">
            <button class="Food_Edit_Button_cls" @click="toogleEditMode()">✏️</button>
            <Title :title="fooddata.title" :edit="edit" @changeTitle="(title) => updateTitle(title)"></Title>
            <Subtitle :subtitle="fooddata.details" :edit="edit" @changeSubtitle="(subtitle) => updateSubtitle(subtitle)"></Subtitle>
            <div class="FoodData_Spacer_cls"></div>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Disponibilité : </span> <Months :months="fooddata.months" :edit="edit" @toogleMonth="(month) => toogleMonth(month)"/></p>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Approvisionnement : </span> <SupplyArea :area="fooddata.supplyArea" :edit="edit" @changeSupplyArea="(area) => updateSupplyArea(area)"></SupplyArea></p>
            <p class="FoodData_Entry_cls"><span class="FoodData_Entry_Title">Prix : </span><Cost :cost="fooddata.cost" :edit="edit" @changeCost="(cost) => updateCost(cost)"></Cost></p>
            <div class="FoodData_Spacer_cls"></div>
            <EnvironmentalImpact :data="fooddata.environmentalImpact" :edit="edit" @changeCo2eq="(value) => updateCo2eq(value)" @changeCo2eqSource="(value) => changeCo2eqSource(value)" ></EnvironmentalImpact>
            <Nutrition :data="fooddata.nutrition" :edit="edit" @changeNutritionData="(field, value) => updateNutrition(field, value)" @changeNutritionDataSource="(field, value) => updateNutritionSource(field, value)"></Nutrition>
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
        overflow:           auto;
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

    li:hover
    {
        background-color: #d0dbdf;
    }

    .Foods_List_Entry_Title_cls
    {
        margin:         0px;
        font-weight:    bold;
        font-size:      1.1em;
        color:        #66b2ff;
        min-height:     15px;
    }

    .Foods_List_Entry_Subtitle_cls
    {
        margin:     0px;
        font-style: italic;
        min-height: 15px;
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

    .FoodData_Entry_Title
    {
        display:        inline-block;
        font-weight:    bold;
        min-width:      150px;
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

    .Foods_Add_Button_cls
    {
        margin-left: 10px;
    }

    .Foods_Remove_Button_cls
    {
        display: inline;
        position: absolute;
        right: 15px;
    }

    .Food_Edit_Button_cls
    {
        position:   absolute;
        top:        0px;
        right:      10px;
        height:     30px;
        width:      30px;
    }
</style>
