<script setup>
    import { ref } from 'vue'
    const props = defineProps(['data'])
</script>

<template>
    <div>
        <p class="EnvironmentalImpactTitle_cls">Impact environnemental</p>
        <table>
            <tr><th>Donnée</th><th>Valeur</th><th>Source</th></tr>
            <tr><td>Empreinte carbone</td><td>{{ data.co2eq.kgco2e_kg }} kg CO2eq/kg</td><td>{{ data.co2eq.source }}</td></tr>
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
</style>
