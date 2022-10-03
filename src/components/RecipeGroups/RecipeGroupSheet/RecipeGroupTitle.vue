// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Widget for displaying and editing title.
<script setup>
    import { ref } from 'vue'
    const props = defineProps(['edit', 'title'])

    defineEmits(['changeTitle'])
</script>

<template>
    <p v-if="!edit" class="RecipeGroup_Title_cls">{{ title }}</p>
    <input v-if="edit" class="RecipeGroup_Title_cls RecipeGroup_Title_Edit_cls" type="text" :value="title" @change="$emit('changeTitle', $event.target.value)" />
</template>

<style scoped>
    .RecipeGroup_Title_cls
    {
        font-weight:    bold;
        text-align:     center;
        font-size:      1.3em;
        color:          #c8b273;
        margin:         0px;
        margin-top:     10px;
        height:         30px;
        line-height:    30px;
        vertical-align: middle;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .RecipeGroup_Title_Edit_cls
    {
        background-color:   transparent;
        border:             solid 2px #834655;
        outline:            none;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .RecipeGroup_Title_cls
        {
            font-size:      4em;
            height:         70px;
            line-height:    70px;
        }
    }
</style>
