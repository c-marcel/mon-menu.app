// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Widget for displaying and editing nutrition data.
<script setup>
    import { ref } from 'vue'
    const props = defineProps(['data', 'edit'])

    defineEmits(['changeNutritionData', 'changeNutritionDataSource', 'databaseSelectionRequested'])

    const metadata = ref([
        { "key": "energy_kj", "title": "Energie", "units": "kJ/100 g", "conversion": 10.0 },
        { "key": "energy", "title": "Energie", "units": "kcal/100 g", "conversion": 10.0 },
        { "key": "water", "title": "Eau", "units": "g/100 g", "conversion": 0.01 },
        { "key": "salt", "title": "Sel", "units": "g/100 g", "conversion": 0.01 },
        { "key": "sodium", "title": "Sodium", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "magnesium", "title": "Magnésium", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "phosphorus", "title": "Phosphore", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "potassium", "title": "Potassium", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "calcium", "title": "Calcium", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "manganese", "title": "Manganèse", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "iron", "title": "Fer", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "copper", "title": "Cuivre", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "zinc", "title": "Zinc", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "selenium", "title": "Sélénium", "units": "µg/100 g", "conversion": 0.00000001 },
        { "key": "iodine", "title": "Iode", "units": "µg/100 g", "conversion": 0.00000001 },
        { "key": "proteins", "title": "Protéines", "units": "g/100 g", "conversion": 0.01 },
        { "key": "carbohydrates", "title": "Glucides", "units": "g/100 g", "conversion": 0.01 },
        { "key": "sugars", "title": "Sucres", "units": "g/100 g", "conversion": 0.01 },
        { "key": "fructose", "title": "Fructose", "units": "g/100 g", "conversion": 0.01 },
        { "key": "galactose", "title": "Galactose", "units": "g/100 g", "conversion": 0.01 },
        { "key": "lactose", "title": "Lactose", "units": "g/100 g", "conversion": 0.01 },
        { "key": "glucose", "title": "Glucose", "units": "g/100 g", "conversion": 0.01 },
        { "key": "maltose", "title": "Maltose", "units": "g/100 g", "conversion": 0.01 },
        { "key": "sucrose", "title": "Saccharose", "units": "g/100 g", "conversion": 0.01 },
        { "key": "starch", "title": "Amidon", "units": "g/100 g", "conversion": 0.01 },
        { "key": "polyols", "title": "Polyols", "units": "g/100 g", "conversion": 0.01 },
        { "key": "fibers", "title": "Fibres", "units": "g/100 g", "conversion": 0.01 },
        { "key": "lipids", "title": "Lipides", "units": "g/100 g", "conversion": 0.01 },
        { "key": "satured_fa", "title": "AG saturés", "units": "g/100 g", "conversion": 0.01 },
        { "key": "monounsaturated_fa", "title": "AG monoinsaturés", "units": "g/100 g", "conversion": 0.01 },
        { "key": "polyunsaturated_fa", "title": "AG polyinsaturés", "units": "g/100 g", "conversion": 0.01 },
        { "key": "butyric_fa", "title": "AG butyrique", "units": "g/100 g", "conversion": 0.01 },
        { "key": "caproic_fa", "title": "AG caproïque", "units": "g/100 g", "conversion": 0.01 },
        { "key": "caprylic_fa", "title": "AG caprylique", "units": "g/100 g", "conversion": 0.01 },
        { "key": "whimsical_fa", "title": "AG caprique", "units": "g/100 g", "conversion": 0.01 },
        { "key": "lauric_fa", "title": "AG laurique", "units": "g/100 g", "conversion": 0.01 },
        { "key": "myristic_fa", "title": "AG myristique", "units": "g/100 g", "conversion": 0.01 },
        { "key": "palmitic_fa", "title": "AG palmitique", "units": "g/100 g", "conversion": 0.01 },
        { "key": "stearic_fa", "title": "AG stéarique", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega9", "title": "AG (n-9), oléique", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega6_la", "title": "AG (n-6), linoléique", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega3_ala", "title": "AG (n-3), alpha-lin.", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega6_ara", "title": "AG (n-6), arachid.", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega3_epa", "title": "AG (n-3) EPA", "units": "g/100 g", "conversion": 0.01 },
        { "key": "omega3_dha", "title": "AG (n-3) DHA", "units": "g/100 g", "conversion": 0.01 },
        { "key": "retinol", "title": "Rétinol", "units": "µg/100 g", "conversion": 0.00000001 },
        { "key": "betacarotene", "title": "Béta-carotène", "units": "µg/100 g", "conversion": 0.00000001 },
        { "key": "vitamin_d", "title": "Vitamine D", "units": "µg/100 g", "conversion": 0.00000001 },
        { "key": "vitamin_e", "title": "Vitamine E", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "vitamin_k1", "title": "Vitamine K1", "units": "µg/100 g", "conversion": 0.00000001 },
        { "key": "vitamin_k2", "title": "Vitamine K2", "units": "µg/100 g", "conversion": 0.00000001 },
        { "key": "vitamin_c", "title": "Vitamine C", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "vitamin_b1", "title": "Vitamine B1", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "vitamin_b2", "title": "Vitamine B2", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "vitamin_b3", "title": "Vitamine B3", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "vitamin_b5", "title": "Vitamine B5", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "vitamin_b6", "title": "Vitamine B6", "units": "mg/100 g", "conversion": 0.00001 },
        { "key": "vitamin_b12", "title": "Vitamine B12", "units": "µg/100 g", "conversion": 0.00000001 },
        { "key": "vitamin_b9", "title": "Vitamine B9", "units": "µg/100 g", "conversion": 0.00000001 },
        { "key": "alcohol", "title": "Alcool", "units": "g/100 g", "conversion": 0.01 },
        { "key": "organic_acids", "title": "Acides organiques", "units": "g/100 g", "conversion": 0.01 },
        { "key": "cholesterol", "title": "Cholestérol", "units": "mg/100 g", "conversion": 0.00001 },
    ])
</script>

<template>
    <div>
        <p class="Nutrition_cls">
            Informations nutritionnelles :
            <span v-if="edit" class="NutritionLink_cls" @click="$emit('databaseSelectionRequested')">Base Ciqual/CALNUT</span>
        </p>
        <div class="NutritionContent_cls">
            <span class="Spacer_cls"></span>
            <div class="NutritionGrid_cls">
                <span v-for="(entry, key) in metadata" :key="key">
                    <span class="NutritionGridEntry_cls" v-bind:class="{NutritionGridEntryEdit_cls: edit}" v-if="data[entry.key] != undefined">
                        <div class="NutritionGridEntryTitle_cls">{{entry.title}}<span v-if="!edit && data[entry.key].source" class="NutritionSourceIcon_cls" :title=data[entry.key].source>❔</span></div>
                        <div class="NutritionGridEntryText_cls">
                            <span v-if="!edit">{{ $formatFloat($roundFloat(data[entry.key].value / entry.conversion, 2)) }}</span>
                            <span v-if="edit"><input type="number" step="0.01" :value="$formatFloat($roundFloat(data[entry.key].value / entry.conversion, 2))" @change="$emit('changeNutritionData', entry.key, $event.target.value * entry.conversion)" /></span>
                            <span class="NutritionUnit_cls">{{ ' ' + entry.units }}</span>
                        </div>
                        <div style="text-align: center;">
                            <input v-if="edit" class="NutritionSourceText_cls" type="text" :value="data[entry.key].source" @change="$emit('changeNutritionDataSource', entry.key, $event.target.value)" />
                        </div>
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .Nutrition_cls
    {
        color:              #c8b273;
        font-weight:        bold;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .NutritionContent_cls
    {
        display:            flex;
    }

    .Spacer_cls
    {
        width:              200px;
    }

    .NutritionGrid_cls
    {
        display:            flex;
        flex-wrap:          wrap;
        flex:               1;
    }

    .NutritionLink_cls
    {
        font-weight:        normal;
    }

    .NutritionLink_cls:hover
    {
        text-decoration:    underline;
        cursor:             pointer;
    }

    .NutritionGridEntry_cls
    {
        display:            inline-block;
        width:              150px;
        height:             80px;
        margin-left:        5px;
        margin-top:         5px;
        background-color: #834655;
    }

    .NutritionGridEntryEdit_cls
    {
        width:  160px;
        height: 90px;
    }

    .NutritionSourceIcon_cls
    {
        font-size:      0.8em;
        margin-left:    5px;
        user-select:    none;
    }

    .NutritionGridEntryTitle_cls
    {
        color:          #c8b273;
        font-size:      0.8em;
        font-weight:    bold;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        text-align:     center;
        height:         30px;
        line-height:    30px;
        vertical-align: middle;
    }

    .NutritionGridEntryText_cls
    {
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        text-align:     center;
        height:         30px;
        line-height:    30px;
        vertical-align: middle;
    }

    input
    {
        border: solid 1px #c8b273;
        background-color: #9f5069;
        outline:            none;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        width:              70px;
    }

    .NutritionUnit_cls
    {
        font-size: 0.8em;
    }

    .NutritionSourceText_cls
    {
        width: 90%;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .Nutrition_cls
        {
            font-size: 2em;
        }

        .Spacer_cls
        {
            width: 0px;
        }

        .NutritionGridEntry_cls
        {
            width:              250px;
            height:             150px;
            margin-left:        10px;
            margin-top:         10px;
        }

        .NutritionGridEntryEdit_cls
        {
            width:  250px;
            height: 200px;
        }

        .NutritionSourceIcon_cls
        {
            display: none;
        }

        .NutritionGridEntryTitle_cls
        {
            height:         80px;
            line-height:    80px;
            font-size:      2em;
        }

        .NutritionGridEntryText_cls
        {
            height:         60px;
            line-height:    60px;
            font-size:      1.8em;
        }

        input
        {
            border:             solid 2px #c8b273;
            font-size:          1em;
        }
    }
</style>
