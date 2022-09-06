// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Widget for displaying and editing subtitle.
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
        height:         15px;
        line-height:    15px;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size:      1em;
    }

    .FoodData_Subtitle_Edit_cls
    {
        background-color:   transparent;
        border:             solid 2px #834655;
        outline:            none;
        margin-top:         5px;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .FoodData_Subtitle_cls
        {
            height:         40px;
            line-height:    40px;
            font-size:      3em;
        }
    }
</style>
