<script setup>
    import { ref } from 'vue'

    const title = ref('mon-menu.app')
</script>

<template>
    <h1><a href="/">{{ title }}</a></h1>
</template>

<style scoped>
    h1
    {
        display:        inline-block;
        border:         1px black dashed;
        padding:        10px;
        margin:         0px;
        border-radius:  5px;
        color:        blue;
        text-align:     center;
    }

    a
    {
        text-decoration: none;
    }
</style>
