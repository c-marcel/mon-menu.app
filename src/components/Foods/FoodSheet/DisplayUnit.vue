// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Widget for displaying and editing unit used for food display.
<script setup>
    import { ref } from 'vue'
    const props = defineProps(['edit', 'conversionEnabled', 'label', 'conversionFactor'])

    defineEmits(['enableConversion', 'labelChanged', 'factorChanged'])

    // Use comma as decimal separator.
    function formatFloat(value)
    {
        return String(value).replaceAll('.', ',')
    }
</script>

<template>
    <span v-if="!edit" class="DisplayUnitText_cls">{{ String(conversionEnabled) == "true" ? label + ' (facteur de conversion : ' + formatFloat(conversionFactor) + ')' : 'kg' }}</span>
    <span v-if="edit">
        <label class="DisplayUnitText_cls">
            <input type="checkbox" class="ConversionCheckbox_cls" :checked="conversionEnabled" :value="conversionEnabled" @change="$emit('enableConversion', $event.target.checked)" />
            unité d'affichage spécifique : 
        </label>
        <input type="text" class="ConversionSelect_cls" :enable="conversionEnabled" :value="label" @input="$emit('labelChanged', $event.target.value)"/>
        <span class="DisplayUnitText_cls"> Facteur de conversion : </span>
        <input type="number" class="ConversionSelect_cls" step="0.001" :value="conversionFactor" @input="$emit('factorChanged', $event.target.value)" />
        <span class="DisplayUnitText_cls"> unité(s) par kg.</span>
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

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .DisplayUnitText_cls
        {
            font-size: 2em;
        }

        .ConversionSelect_cls
        {
            border:             solid 2px #c8b273;
            width:              120px;
            font-size:          2em;
        }

        .ConversionCheckbox_cls
        {
            border:             solid 2px #c8b273;
            background-color: #9f5069;
            height:             30px;
            width:              30px;
        }
    }
</style>
