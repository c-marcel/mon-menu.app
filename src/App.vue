<script setup>
import Logo             from './components/Logo.vue'
import Menu             from './components/Menu.vue'
import CentralContainer from './components/CentralContainer.vue';
</script>

<template>
    <Logo             class="App_Logo_cls"  />
    <Menu             class="App_Menu_cls"  />
    <CentralContainer class="App_CentralContainer_cls"  />
</template>

<style scoped>
    .App_Logo_cls
    {
        position:       fixed;
        top:            20px;
        left:           20px;
        width:          250px;
    }

    .App_Menu_cls
    {
        position:       fixed;
        top:            120px;
        left:           20px;
        width:          270px;
    }

    .App_CentralContainer_cls
    {
        position:       fixed;
        top:            0px;
        left:           310px;
        right:          0px;
        bottom:         0px;
    }
</style>
