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
    <span v-if="!edit">
        {{ formatCost(cost) }} €/kg
    </span>
    <span v-if="edit"><input type="number" step="0.01" :value="cost" class="Food_Cost_Edit_cls" @change="$emit('changeCost', $event.target.value)" /> €/kg</span>
</template>

<style scoped>
    .Food_Cost_Edit_cls
    {
        width: 70px;
    }
</style>
