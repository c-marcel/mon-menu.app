// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Main application view.
<script setup>
    import { ref, inject } from 'vue'

    import CentralContainer from './components/CentralContainer.vue'
    import RecipeEditSheet  from './components/Recipes/RecipeEditSheet.vue'
    import RecipeSheet      from './components/Recipes/RecipeSheet.vue'
    import Header           from './components/Header/Header.vue'

    let recipeData = ref(inject('recipeData'))

    // For mobile versions.
    let displayCentralContainer = ref(false)

    function hideCentralContainer()
    {
        displayCentralContainer.value = false
    }

    function showCentralContainer()
    {
        displayCentralContainer.value = true
    }
</script>

<template>
    <Header @menuItemClicked="showCentralContainer()" />
    <CentralContainer class="CentralContainer_cls" v-bind:class="{CentralContainerHidden_cls: !displayCentralContainer}" @hideCentralContainerRequested="hideCentralContainer()"/>
    <RecipeSheet class="RecipeSheet_Cls" :currentRecipeId="recipeData.currentRecipeId" :edit="recipeData.currentMode"></RecipeSheet>
    <RecipeEditSheet class="RecipeSheet_Cls" :currentRecipeId="recipeData.currentRecipeId" :edit="recipeData.currentMode"></RecipeEditSheet>
</template>

<style scoped>
    .CentralContainer_cls
    {
        position:           fixed;
        top:                120px;
        left:               0px;
        right:              0px;
        bottom:             0px;
        background-color: #9f5069;
    }

    .RecipeSheet_Cls
    {
        position:           fixed;
        top:                0px;
        bottom:             0px;
        left:               0px;
        right:              0px;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .CentralContainer_cls
        {
            top:            0px;
            bottom:         0px;
        }

        .CentralContainerHidden_cls
        {
            display:        none;
        }
    }
</style>
