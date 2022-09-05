<script setup>
    import { ref } from 'vue'
    const props = defineProps(['edit', 'conversionEnabled', 'label', 'conversionFactor'])

    defineEmits(['enableConversion', 'labelChanged', 'factorChanged'])

    function formatFloat(value)
    {
        return String(value).replaceAll('.', ',')
    }
</script>

<template>
    <span v-if="!edit">{{ String(conversionEnabled) == "true" ? label + ' (facteur de conversion : ' + formatFloat(conversionFactor) + ')' : 'kg' }}</span>
    <span v-if="edit">
        <label>
            <input type="checkbox" class="ConversionCheckbox_cls" v-model="conversionEnabled" :value="conversionEnabled" @change="$emit('enableConversion', $event.target.value)" />
            unité d'affichage spécifique : 
        </label>
        <input type="text" class="ConversionSelect_cls" :enable="conversionEnabled" :value="label" @input="$emit('labelChanged', $event.target.value)"/>
        <span> Facteur de conversion : </span>
        <input type="number" class="ConversionSelect_cls" step="0.001" :value="conversionFactor" @input="$emit('factorChanged', $event.target.value)" />
        <span> unité(s) par kg.</span>
    </span>
</template>

<style scoped>
    .ConversionSelect_cls
    {
        border:             solid 1px #c8b273;
        width:              120px;
        background-color: #9f5069;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        outline:            none;
    }

    .ConversionCheckbox_cls
    {
        border:             solid 1px #c8b273;
        background-color: #9f5069;
    }
</style>
