<script setup>
    import { ref } from 'vue'
    const props = defineProps(['edit', 'subtitle'])

    defineEmits(['changeSubtitle'])
</script>

<template>
    <p v-if="!edit" class="FoodData_Subtitle_cls">{{ subtitle }}</p>
    <input v-if="edit" class="FoodData_Subtitle_cls FoodData_Subtitle_Edit_cls" type="text" :value="subtitle" @change="$emit('changeSubtitle', $event.target.value)"/>
</template>

<style scoped>
    .FoodData_Subtitle_cls
    {
        display:        block;
        margin:         0px;
        font-style:     italic;
        min-height:     15px;
        font-family:    Arial, Helvetica, sans-serif;
        font-size:      1em;
    }

    .FoodData_Subtitle_Edit_cls
    {
        background-color:   transparent;
        border:             solid 1px #66b2ff;
        outline:            none;
        width:              80%;
        margin-top:         5px;
    }
</style>
