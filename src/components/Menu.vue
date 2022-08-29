<script setup>
    import { ref } from 'vue'

    const entries = ref([
    {
        "page": "foods",
        "title": "Aliments"
    },
    {
        "page": "about",
        "title": "A propos"
    }])
</script>

<template>
    <ul>
        <li v-for="entry in entries">
            <router-link :to="entry.page"><p>{{ entry.title }}</p></router-link>
        </li>
    </ul>
</template>

<style scoped>
    ul
    {
        list-style: none;
        margin:     0px;
        padding:    0px;
    }

    li
    {
        margin-top:     5px;
        margin-bottom:  5px;
    }

    a
    {
        display:            inline-block;
        background-color: #66b2ff;
        
        color:            blue;
        font-size:          1.5em;
        width:              100%;
        margin:             0px;
        padding:            0px;
        text-decoration:    none;
        text-align:         center;
    }

    a:hover
    {
        background-color: #3399ff;
    }

    p
    {
        margin:         0px;
        vertical-align: middle;
        height:         50px;
        line-height:    50px;
    }
</style>