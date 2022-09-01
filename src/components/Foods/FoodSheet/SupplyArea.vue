<script setup>
    import { ref } from 'vue'
    const props = defineProps(['edit', 'area'])

    defineEmits(['changeSupplyArea'])
</script>

<template>
    <span v-if="!edit">
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
</style>
