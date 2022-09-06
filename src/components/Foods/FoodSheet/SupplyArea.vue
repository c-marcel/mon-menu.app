// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Widget for displaying and editing supply area.
<script setup>
    import { ref } from 'vue'
    const props = defineProps(['edit', 'area'])

    defineEmits(['changeSupplyArea'])
</script>

<template>
    <span v-if="!edit" class="SupplyAreaText_cls">
        {{ area == 1 ? "local" : area == 2 ? "national" : area == 4 ? "continental" : area == 8 ? "mondial" : "non défini" }}
    </span>
    <select class="SupplyAreaSelect_cls" v-if="edit" :value="area" @change="$emit('changeSupplyArea', $event.target.value)">
        <option value="0"></option>
        <option value="1">local</option>
        <option value="2">national</option>
        <option value="4">continental</option>
        <option value="8">mondial</option>
    </select>
</template>

<style scoped>
    .SupplyAreaSelect_cls
    {
        border:             solid 1px #c8b273;
        width:              120px;
        background-color: #9f5069;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .SupplyAreaText_cls
        {
            font-size: 2em;
        }
        .SupplyAreaSelect_cls
        {
            border:             solid 2px #c8b273;
            width:              200px;
            font-size:          2em;
        }
    }
</style>
