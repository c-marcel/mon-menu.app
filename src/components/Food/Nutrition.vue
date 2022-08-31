<script setup>
    import { ref } from 'vue'
    const props = defineProps(['data', 'edit'])

    defineEmits(['changeNutritionData', 'changeNutritionDataSource'])

    const metadata = ref([
        { "key": "energy", "title": "Energie", "units": "kcal/100 g", "conversion": 10.0 },
        { "key": "proteins", "title": "Protéines", "units": "g/100 g", "conversion": 0.01 },
        { "key": "carbohydrates", "title": "Glucides", "units": "g/100 g", "conversion": 0.01 },
        { "key": "lipids", "title": "Lipides", "units": "g/100 g", "conversion": 0.01 },
        { "key": "sugars", "title": "Sucres", "units": "g/100 g", "conversion": 0.01 },
        { "key": "fibers", "title": "Fibres", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega3_ala", "title": "Oméga 3 ALA", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega3_epa", "title": "Oméga 3 EPA", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega3_dha", "title": "Oméga 3 DHA", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega6_la", "title": "Oméga 6 LA", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega6_ara", "title": "Oméga 6 ARA", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega9", "title": "Oméga 9", "units": "g/100 g", "conversion": 0.01 },
        { "key": "salt", "title": "Sel", "units": "g/100 g", "conversion": 0.01 },
        { "key": "calcium", "title": "Calcium", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "copper", "title": "Cuivre", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "iron", "title": "Fer", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "iodine", "title": "Iode", "units": "µg/100 g", "conversion": 0.00000001 },
        { "key": "magnesium", "title": "Magnésium", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "sodium", "title": "Sodium", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "zinc", "title": "Zinc", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "vitamin_c", "title": "Vitamine C", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "vitamin_d", "title": "Vitamine D", "units": "µg/100 g", "conversion": 0.00000001 },
    ])

    function round(value)
    {
        return Math.round(value * 100.0) / 100.0;
    }

    function formatFloat(value)
    {
        return String(round(value)).replaceAll('.', ',')
    }
</script>

<template>
    <div>
        <p class="Nutrition_cls">Informations nutritionnelles</p>
        <table>
            <tr><th>Donnée</th><th>Valeur</th><th>Source</th></tr>
            <tr v-for="entry in metadata">
                <td>{{entry.title}}</td>
                <td>
                    <span v-if="!edit && data[entry.key] != undefined">{{ formatFloat(data[entry.key].value / entry.conversion) + ' ' + entry.units }} </span>
                    <span v-if="edit && data[entry.key] != undefined"><input type="number" step="0.01" :value="round(data[entry.key].value / entry.conversion)" @change="$emit('changeNutritionData', entry.key, $event.target.value * entry.conversion)" /> {{ entry.units }}</span>
                </td>
                <td>
                    <span v-if="!edit && data[entry.key] != undefined">{{ data[entry.key].source }}</span>
                    <input v-if="edit && data[entry.key] != undefined" type="text" class="NutritionField_cls" :value="data[entry.key].source" @change="$emit('changeNutritionDataSource', entry.key, $event.target.value)" />
                </td>
            </tr>
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
        color:      gray;
        border:     solid 1px #66b2ff;
        max-width:  300px;
    }

    .NutritionField_cls
    {
        width: 90%;
    }
</style>
