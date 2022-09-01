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
            <span class="EnvironmentalImpactText_cls">• Empreinte carbone : 
                <span v-if="!edit">{{ formatFloat(data.co2eq.kgco2e_kg) }}</span>
                <span v-if="edit"><input class="EnvironmentalImpactInputFloat_cls" type="number" step="0.01" :value="data.co2eq.kgco2e_kg" @change="$emit('changeCo2eq', $event.target.value)" /></span>
                kg CO2eq/kg
            </span>
            <span v-if="!edit" class="EnvironmentalImpactSourceIcon_cls" :title=data.co2eq.source>❔</span>
            <span v-if="edit">. Source : <input class="EnvironmentalImpactInputText_cls" type="text" :value="data.co2eq.source" @change="$emit('changeCo2eqSource', $event.target.value)" /></span>
        </div>
        
        <!--
        -->
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

    input
    {
        border: solid 1px #c8b273;
        background-color: #9f5069;
        outline:            none;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .EnvironmentalImpactInputFloat_cls
    {
        width: 70px;
    }

    .EnvironmentalImpactInputText_cls
    {
        width: 200px;
    }
</style>
