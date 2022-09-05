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
        color:          #c8b273;
        margin:         0px;
        height:         30px;
        line-height:    30px;
        vertical-align: middle;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .FoodData_Title_Edit_cls
    {
        background-color:   transparent;
        border:             solid 2px #834655;
        outline:            none;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .FoodData_Title_cls
        {
            font-size:      4em;
            height:         70px;
            line-height:    70px;
        }
    }
</style>
