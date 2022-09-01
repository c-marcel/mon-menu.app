<script setup>
    import CentralContainer from './components/CentralContainer.vue'
    import Header           from './components/Header/Header.vue'
</script>

<template>
    <Header />
    <CentralContainer class="CentralContainer_cls"/>
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
</style>
