<script setup>
    import CentralContainer from './components/CentralContainer.vue'
    import Header           from './components/Header.vue'
</script>

<template>
    <Header />
    <CentralContainer class="CentralContainer_cls"/>
</template>

<style scoped>
    .CentralContainer_cls
    {
        position:   fixed;
        top:        125px;
        left:       0px;
        right:      0px;
        bottom:     0px;
    }
</style>
