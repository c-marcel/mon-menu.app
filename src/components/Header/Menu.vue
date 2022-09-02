<script setup>
    import { ref } from 'vue'

    const entries = ref([
    {
        "page": "foods",
        "title": "Aliments"
    },
    {
        "page": "recipes",
        "title": "Recettes"
    },
    {
        "page": "config",
        "title": "Configuration"
    }])
</script>

<template>
    <div class="Menu_cls">
        <span v-for="entry in entries">
            <router-link :to="entry.page" class="MenuEntry_cls">{{ entry.title }}</router-link>
        </span>
    </div>
</template>

<style scoped>
    .Menu_cls
    {
        display:        inline-flex;
        margin-left:    50px;
        flex-direction: row;
        gap:            20px;
    }

    a
    {
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        color:            #c8b273;
        font-size:          1.3em;
        text-decoration:    none;
        padding:            3px;
    }

    a:hover
    {
        border-bottom: solid 3px #9f5069;
    }

    .MenuEntry_cls
    {
        user-select: none;
    }
</style>