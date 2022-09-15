// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Application main menu containing router links for navigation.
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

    defineEmits(['itemClicked'])
</script>

<template>
    <div class="Menu_cls">
        <span v-for="(entry, key) in entries" :key="key">
            <router-link :to="entry.page" class="MenuEntry_cls" @click="$emit('itemClicked')">{{ entry.title }}</router-link>
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

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .Menu_cls
        {
            display:            flex;
            flex-direction:     column;
            background-color: #9f5069;
            width:              100%;
            margin-left:        0px;
            gap:                20px;
            flex-grow:          1;
            text-align:         center;
            padding-top:        50px;
        }

        a
        {
            display:            block;
            width:              90%;
            margin-left:        5%;
            margin-top:         50px;
            font-size:          6em;
            text-decoration:    none;
            background-color: #834655;
        }
    }
</style>