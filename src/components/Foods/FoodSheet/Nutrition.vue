// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Widget for displaying and editing nutrition data.
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

    // Use 2 digits after comma.
    function round(value)
    {
        return Math.round(value * 100.0) / 100.0;
    }

    // Use comma as decimal separator.
    function formatFloat(value)
    {
        return String(round(value)).replaceAll('.', ',')
    }
</script>

<template>
    <div>
        <p class="Nutrition_cls">Informations nutritionnelles :</p>
        <div class="NutritionContent_cls">
            <span class="Spacer_cls"></span>
            <div class="NutritionGrid_cls">
                <span v-for="entry in metadata">
                    <span class="NutritionGridEntry_cls" v-bind:class="{NutritionGridEntryEdit_cls: edit}" v-if="data[entry.key] != undefined">
                        <div class="NutritionGridEntryTitle_cls">{{entry.title}}<span v-if="!edit && data[entry.key].source" class="NutritionSourceIcon_cls" :title=data[entry.key].source>❔</span></div>
                        <div class="NutritionGridEntryText_cls">
                            <span v-if="!edit">{{ formatFloat(data[entry.key].value / entry.conversion) }}</span>
                            <span v-if="edit"><input type="number" step="0.01" :value="round(data[entry.key].value / entry.conversion)" @change="$emit('changeNutritionData', entry.key, $event.target.value * entry.conversion)" /></span>
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
        color:          #c8b273;
        font-weight:    bold;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .NutritionContent_cls
    {
        display: flex;
    }

    .Spacer_cls
    {
        width: 200px;
    }

    .NutritionGrid_cls
    {
        display:    flex;
        flex-wrap:  wrap;
        flex:       1;
    }

    .NutritionGridEntry_cls
    {
        display:            inline-block;
        width:              130px;
        height:             60px;
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
