// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Recipe group sheet for displaying recipe group data.
// Edit mode available for admin access.
<script setup>
    import { ref, watch } from 'vue'

    import RecipeGroupTitle from './RecipeGroupTitle.vue'
    import RecipeList       from './RecipeList.vue'

    let props = defineProps(['currentGroupId', 'edit', 'title'])
</script>

<template>
    <div class="RecipeGroupSheet_cls">
        <div class="RecipeGroup_cls">
            <RecipeGroupTitle :title="title" :edit="edit" />
            <RecipeList :currentGroupId="currentGroupId" />
        </div>
    </div>
</template>

<style scoped>
    .RecipeGroupSheet_cls
    {
        flex-grow:  1;
        border:     dashed 1px #c8b273;
        overflow:   auto;
    }

    .RecipeGroup_cls
    {
        display:        flex;
        flex-direction: column;
        padding:        5px;
    }
</style>
