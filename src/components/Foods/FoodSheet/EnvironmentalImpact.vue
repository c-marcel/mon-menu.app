<script setup>
    import { ref } from 'vue'
    const props = defineProps(['data', 'edit'])

    defineEmits(['changeCo2eq', 'changeCo2eqSource'])

    function formatFloat(cost)
    {
        return String(cost).replaceAll('.', ',')
    }
</script>

<template>
    <div>
        <p class="EnvironmentalImpactTitle_cls">Impact environnemental :</p>
        <div class="EnvironmentalImpact_CO2_cls">
            <span class="Spacer_cls"></span>
            <span class="EnvironmentalImpactText_cls">• Empreinte carbone : {{ formatFloat(data.co2eq.kgco2e_kg) }} kg CO2eq/kg</span> <span class="EnvironmentalImpactSourceIcon_cls" :title=data.co2eq.source>❔</span>
        </div>
        
        <span v-if="edit"><input type="number" step="0.01" :value="data.co2eq.kgco2e_kg" @change="$emit('changeCo2eq', $event.target.value)" /> kg CO2eq/kg</span>
        <input v-if="edit" type="text" class="EnvironmentalImpactEditSource_cls" :value="data.co2eq.source" @change="$emit('changeCo2eqSource', $event.target.value)" />
    </div>
</template>

<style scoped>
    .EnvironmentalImpactTitle_cls
    {
        color:          #c8b273;
        font-weight:    bold;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .EnvironmentalImpact_CO2_cls
    {
        display: flex;
    }

    .Spacer_cls
    {
        width: 200px;
    }

    .EnvironmentalImpactText_cls
    {
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .EnvironmentalImpactSourceIcon_cls
    {
        font-size:      0.8em;
        margin-left:    10px;
        user-select:    none;
    }

    .EnvironmentalImpactEditSource_cls
    {
        display: block;
        width: 90%;
    }
</style>
