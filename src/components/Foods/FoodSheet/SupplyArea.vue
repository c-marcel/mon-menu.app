<script setup>
    import { ref } from 'vue'
    const props = defineProps(['edit', 'area'])

    defineEmits(['changeSupplyArea'])
</script>

<template>
    <span v-if="!edit">
        {{ area == 1 ? "local" : area == 2 ? "national" : area == 4 ? "continental" : area == 8 ? "mondial" : "non défini" }}
    </span>
    <select v-if="edit" :value="area" @change="$emit('changeSupplyArea', $event.target.value)">
        <option value="0"></option>
        <option value="1">local</option>
        <option value="2">national</option>
        <option value="4">continental</option>
        <option value="8">mondial</option>
    </select>
</template>

<style scoped>
</style>
