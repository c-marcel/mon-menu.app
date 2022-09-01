<script setup>
    import { ref } from 'vue'
    import axios from 'axios'

    import FoodHeader from './FoodHeader/FoodHeader.vue'
    import FoodSheet  from './FoodSheet/FoodSheet.vue'
    import FoodList   from './FoodList/FoodList.vue'

    let currentId    = ref(0)
    let edit         = ref(false)
    let listUpToDate = ref(false)

    // TODO: remove to config panel.
    let config =
    {
        headers:
        {
            "auth-token": "1e91ccce-9a8d-45a8-8d72-0decd3549a12",
        }
    }

    function deleteCurrentFood()
    {
        if (currentId.value == 0)
            return

        // Delete entry from database.
        axios.delete('https://api.mon-menu.app/deleteFood/' + currentId.value, config)
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
        axios.post('https://api.mon-menu.app/createFood', '', config)
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
        <FoodHeader :active="true" :isEditButtonActive="currentId != 0" :isRemoveButtonActive="currentId != 0" :isAddButtonActive="true" @editFoodRequested="edit = !edit" @removeFoodRequested="deleteCurrentFood()" @addFoodRequested="addNewFood()" />
        <FoodSheet :currentFoodId="currentId" :edit="edit" @listOutdated="() => {listUpToDate = false}"/>
    </div>
</template>

<style scoped>
</style>
