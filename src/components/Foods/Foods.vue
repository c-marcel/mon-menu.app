<script setup>
    import { ref } from 'vue'

    import FoodHeader from './FoodHeader/FoodHeader.vue'
    import FoodSheet  from './FoodSheet/FoodSheet.vue'
    import FoodList   from './FoodList/FoodList.vue'

    let currentId = ref(0)
</script>

<template>
    <div>
        <FoodList @listItemClicked="(id) => { currentId = id }"/>
        <FoodHeader />
        <FoodSheet :currentFoodId="currentId" />
    </div>
</template>

<style scoped>
</style>
