// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Recipe groups tab content header containing admin buttons
// for editing operations.
<script setup>
    import { ref } from 'vue'
   
    const props = defineProps(['isAddButtonActive', 'isRemoveButtonActive', 'isEditButtonActive'])

    defineEmits(['addRecipeGroupRequested', 'removeRecipeGroupRequested', 'editRecipeGroupRequested'])
</script>

<template>
    <div class="RecipeGroupsHeader_cls">
        <button :disabled="!isAddButtonActive" title="Ajouter une nouvelle recette" @click="$emit('addRecipeGroupRequested')">➕</button>
        <button :disabled="!isRemoveButtonActive" title="Supprimer la recette" @click="$emit('removeRecipeGroupRequested')">➖</button>
        <button :disabled="!isEditButtonActive" title="Editer/sauvegarder la recette actuelle" @click="$emit('editRecipeGroupRequested')">🖊️</button>
    </div>
</template>

<style scoped>
    .RecipeGroupsHeader_cls
    {
        height:             40px;
        background-color: #834655;
        vertical-align:     middle;
        line-height:        40px;
    }

    button
    {
        height:         30px;
        width:          30px;
        border:         solid 1px #c8b273;
        border-radius:  5px;
        margin-left:    5px;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .RecipeGroupsHeader_cls
        {
            height:             140px;
            line-height:        140px;
        }

        button
        {
            height:         90px;
            width:          90px;
            border:         solid 5px #c8b273;
            border-radius:  5px;
            margin-left:    15px;
            font-size:      2em;
        }
    }
</style>
