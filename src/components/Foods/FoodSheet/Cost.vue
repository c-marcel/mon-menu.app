<script setup>
    import { ref } from 'vue'
    const props = defineProps(['edit', 'cost'])

    defineEmits(['changeCost'])

    function formatCost(cost)
    {
        return String(cost).replaceAll('.', ',')
    }
</script>

<template>
    <span v-if="!edit" class="Food_Cost_Value_cls">
        {{ formatCost(cost) }} €/kg
    </span>
    <span v-if="edit"><input type="number" step="0.01" :value="cost" class="Food_Cost_Edit_cls" @change="$emit('changeCost', $event.target.value)" /> €/kg</span>
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
</style>
