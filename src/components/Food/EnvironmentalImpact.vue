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
        <p class="EnvironmentalImpactTitle_cls">Impact environnemental</p>
        <table>
            <tr>
                <th>Donnée</th>
                <th>Valeur</th>
                <th>Source</th>
            </tr>
            <tr>
                <td>Empreinte carbone</td>
                <td>
                    <span v-if="!edit">{{ formatFloat(data.co2eq.kgco2e_kg) }} kg CO2eq/kg</span>
                    <span v-if="edit"><input type="number" step="0.01" :value="data.co2eq.kgco2e_kg" @change="$emit('changeCo2eq', $event.target.value)" /> kg CO2eq/kg</span>
                </td>
                <td>
                    <span v-if="!edit">{{ data.co2eq.source }}</span>
                    <input v-if="edit" type="text" class="EnvironmentalImpactEditSource_cls" :value="data.co2eq.source" @change="$emit('changeCo2eqSource', $event.target.value)" />
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
    .EnvironmentalImpactTitle_cls
    {
        color:        #66b2ff;
        font-weight:    bold;
    }

    table
    {
        text-align:         center;
        margin:             0px auto;
        border:             solid 1px #66b2ff;
        border-collapse:    collapse;
    }

    th
    {
        color:   #66b2ff;
        min-width: 200px;
        border:    solid 1px #66b2ff;
    }

    td
    {
        color: gray;
        border:  solid 1px #66b2ff;
    }

    .EnvironmentalImpactEditSource_cls
    {
        display: block;
        width: 90%;
    }
</style>
