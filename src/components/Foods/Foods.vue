<script setup>
    import { ref, inject } from 'vue'
    import axios from 'axios'

    import FoodHeader from './FoodHeader/FoodHeader.vue'
    import FoodSheet  from './FoodSheet/FoodSheet.vue'
    import FoodList   from './FoodList/FoodList.vue'

    let currentId    = ref(0)
    let edit         = ref(false)
    let listUpToDate = ref(false)
    let userData     = ref(inject('userData'))

    function createHttpConfig()
    {
        let config =
        {
            headers:
            {
                "auth-token": userData.value.authentication.token
            }
        }

        return config
    }

    function deleteCurrentFood()
    {
        if (currentId.value == 0)
            return

        // Delete entry from database.
        axios.delete('https://api.mon-menu.app/deleteFood/' + currentId.value, createHttpConfig())
        .then((response) =>
        {
            if (response.status == 200)
            {
                currentId.value    = 0
                listUpToDate.value = false
            }
        })
    }

    function addNewFood()
    {
        // Add entry into database.
        axios.post('https://api.mon-menu.app/createFood', '', createHttpConfig())
        .then((response) =>
        {
            if (response.status == 200)
            {
                currentId.value    = response.data.id
                listUpToDate.value = false
            }
        })
    }
</script>

<template>
    <div>
        <FoodList @listItemClicked="(id) => { currentId = id }" :upToDate="listUpToDate" @upToDateChanged="(state) => {listUpToDate = state}"/>
        <div class="FoodsContainer_cls">
            <FoodHeader v-if="userData.level == 'admin'" :isEditButtonActive="currentId != 0" :isRemoveButtonActive="currentId != 0" :isAddButtonActive="true" @editFoodRequested="edit = !edit" @removeFoodRequested="deleteCurrentFood()" @addFoodRequested="addNewFood()" />
            <FoodSheet :currentFoodId="currentId" :edit="edit" @listOutdated="() => {listUpToDate = false}"/>
        </div>
    </div>
</template>

<style scoped>
    .FoodsContainer_cls
    {
        display:            flex;
        position:           fixed;
        flex-direction:     column;
        gap:                10px;
        top:                130px;
        left:               25%;
        bottom:             10px;
        right:              34px;
        transform:          translate(24px, 0%);
    }
</style>
