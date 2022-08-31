<script setup>
    import { ref } from 'vue'
    const props = defineProps(['edit', 'title'])

    defineEmits(['changeTitle'])
</script>

<template>
    <p v-if="!edit" class="FoodData_Title_cls">{{ title }}</p>
    <input v-if="edit" class="FoodData_Title_cls FoodData_Title_Edit_cls" type="text" :value="title" @change="$emit('changeTitle', $event.target.value)" />
</template>

<style scoped>
    .FoodData_Title_cls
    {
        font-weight:    bold;
        font-size:      1.3em;
        color:        #66b2ff;
        margin:         0px;
        min-height:     30px;
        font-family:    Arial, Helvetica, sans-serif;
    }

    .FoodData_Title_Edit_cls
    {
        background-color:   transparent;
        border:             solid 1px #66b2ff;
        outline:            none;
        width:              80%;
    }
</style>
