// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Widget for displaying and editing cost.
<script setup>
    import { ref } from 'vue'
    const props = defineProps(['edit', 'cost'])

    defineEmits(['changeCost'])

    // Use comma as decimal separator.
    function formatCost(cost)
    {
        return String(cost).replaceAll('.', ',')
    }
</script>

<template>
    <span v-if="!edit" class="Food_Cost_Value_cls">
        {{ formatCost(cost) }} €/kg
    </span>
    <span v-if="edit" class="Food_Cost_Value_cls"><input type="number" step="0.01" :value="cost" class="Food_Cost_Edit_cls" @change="$emit('changeCost', $event.target.value)" /> €/kg</span>
</template>

<style scoped>
    .Food_Cost_Value_cls
    {
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
    .Food_Cost_Edit_cls
    {
        width: 70px;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    input
    {
        border: solid 1px #c8b273;
        background-color: #9f5069;
        outline:            none;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .Food_Cost_Value_cls
        {
            font-size: 2em;
        }

        .Food_Cost_Edit_cls
        {
            font-size: 1em;
        }
    }
</style>
