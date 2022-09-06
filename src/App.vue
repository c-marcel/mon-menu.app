// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Main application view.
<script setup>
    import { ref } from 'vue'

    import CentralContainer from './components/CentralContainer.vue'
    import Header           from './components/Header/Header.vue'

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
