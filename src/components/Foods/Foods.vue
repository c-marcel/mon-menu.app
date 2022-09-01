<script setup>
    import { ref } from 'vue'

    import FoodHeader from './FoodHeader/FoodHeader.vue'
    import FoodSheet  from './FoodSheet/FoodSheet.vue'
    import FoodList   from './FoodList/FoodList.vue'

    let currentId    = ref(0)
    let edit         = ref(false)
    let listUpToDate = ref(false)
</script>

<template>
    <div>
        <FoodList @listItemClicked="(id) => { currentId = id }" :upToDate="listUpToDate" @upToDateChanged="(state) => {listUpToDate = state}"/>
        <FoodHeader @editFoodRequested="edit = !edit"/>
        <FoodSheet :currentFoodId="currentId" :edit="edit" @listOutdated="() => {listUpToDate = false}"/>
    </div>
</template>

<style scoped>
</style>
