<script setup>
    import { ref } from 'vue'
    const props = defineProps(['data'])
</script>

<template>
    <div>
        <p class="Nutrition_cls">Informations nutritionnelles</p>
        <table>
            <tr><th>Donnée</th><th>Valeur</th><th>Source</th></tr>
            <tr v-if="data.energy != undefined"><td>Energie</td><td>{{ data.energy.value }} kcal/kg</td><td>{{ data.energy.source }}</td></tr>
            <tr v-if="data.proteins != undefined"><td>Protéines</td><td>{{ data.proteins.value }} kg/kg</td><td>{{ data.proteins.source }}</td></tr>
            <tr v-if="data.carbohydrates != undefined"><td>Glucides</td><td>{{ data.carbohydrates.value }} kg/kg</td><td>{{ data.carbohydrates.source }}</td></tr>
            <tr v-if="data.lipids != undefined"><td>Lipides</td><td>{{ data.lipids.value }} kg/kg</td><td>{{ data.lipids.source }}</td></tr>
            <tr v-if="data.sugars != undefined"><td>Sucres</td><td>{{ data.sugars.value }} kg/kg</td><td>{{ data.sugars.source }}</td></tr>
            <tr v-if="data.fibers != undefined"><td>Fibres</td><td>{{ data.fibers.value }} kg/kg</td><td>{{ data.fibers.source }}</td></tr>
            <tr v-if="data.omega3_ala != undefined"><td>Oméga 3 ALA</td><td>{{ data.omega3_ala.value }} kg/kg</td><td>{{ data.omega3_ala.source }}</td></tr>
            <tr v-if="data.omega3_epa != undefined"><td>Oméga 3 EPA</td><td>{{ data.omega3_epa.value }} kg/kg</td><td>{{ data.omega3_epa.source }}</td></tr>
            <tr v-if="data.omega3_dha != undefined"><td>Oméga 3 DHA</td><td>{{ data.omega3_dha.value }} kg/kg</td><td>{{ data.omega3_dha.source }}</td></tr>
            <tr v-if="data.omega6_la != undefined"><td>Oméga 6 LA</td><td>{{ data.omega6_la.value }} kg/kg</td><td>{{ data.omega6_la.source }}</td></tr>
            <tr v-if="data.omega6_ara != undefined"><td>Oméga 6 ARA</td><td>{{ data.omega6_ara.value }} kg/kg</td><td>{{ data.omega6_ara.source }}</td></tr>
            <tr v-if="data.omega9 != undefined"><td>Oméga 9</td><td>{{ data.omega9.value }} kg/kg</td><td>{{ data.omega9.source }}</td></tr>
            <tr v-if="data.salt != undefined"><td>Sel</td><td>{{ data.salt.value }} kg/kg</td><td>{{ data.salt.source }}</td></tr>
            <tr v-if="data.calcium != undefined"><td>Calcium</td><td>{{ data.calcium.value }} kg/kg</td><td>{{ data.calcium.source }}</td></tr>
            <tr v-if="data.copper != undefined"><td>Cuivre</td><td>{{ data.copper.value }} kg/kg</td><td>{{ data.copper.source }}</td></tr>
            <tr v-if="data.iron != undefined"><td>Fer</td><td>{{ data.iron.value }} kg/kg</td><td>{{ data.iron.source }}</td></tr>
            <tr v-if="data.iodine != undefined"><td>Iode</td><td>{{ data.iodine.value }} kg/kg</td><td>{{ data.iodine.source }}</td></tr>
            <tr v-if="data.magnesium != undefined"><td>Magnésium</td><td>{{ data.magnesium.value }} kg/kg</td><td>{{ data.magnesium.source }}</td></tr>
            <tr v-if="data.sodium != undefined"><td>Sodium</td><td>{{ data.sodium.value }} kg/kg</td><td>{{ data.sodium.source }}</td></tr>
            <tr v-if="data.zinc != undefined"><td>Zinc</td><td>{{ data.zinc.value }} kg/kg</td><td>{{ data.zinc.source }}</td></tr>
            <tr v-if="data.vitamin_c != undefined"><td>Vitamine C</td><td>{{ data.vitamin_c.value }} kg/kg</td><td>{{ data.vitamin_c.source }}</td></tr>
            <tr v-if="data.vitamin_d != undefined"><td>Vitamine D</td><td>{{ data.vitamin_d.value }} kg/kg</td><td>{{ data.vitamin_d.source }}</td></tr>
            
        </table>
    </div>
</template>

<style scoped>
    .Nutrition_cls
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
