// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// View for a recipe.
<script setup>
    import RecipeSheet from './RecipeSheet.vue'

    function closeStaticRecipe()
    {
        window.location.href = '/'
    }
</script>

<template>
    <RecipeSheet :edit="false" :currentRecipeId="$route.params.id" :displayPermalink="false" @closeRecipeRequested="closeStaticRecipe()"/>
</template>

<style scoped>
</style>
