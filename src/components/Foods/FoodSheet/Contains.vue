// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Widget for displaying food 'contains' field.
<script setup>
    import { ref, computed } from 'vue'
    const props = defineProps(['edit', 'contains'])

    let emit = defineEmits(['changeContains'])
</script>

<template>
    <span v-if="!edit" class="Food_Contains_Value_cls">
        {{ $containsToString(contains) }}
    </span>
    <span v-if="edit" class="Food_Contains_Value_cls">
        <input type="checkbox" id="contains_meat" :checked="contains.includes('meat')" @input="$emit('changeContains', 'meat', $event.target.checked)"><label for="contains_meat">viande</label>
        <input type="checkbox" id="contains_fish" :checked="contains.includes('fish')" @input="$emit('changeContains', 'fish', $event.target.checked)"><label for="contains_fish">poisson</label>
        <input type="checkbox" id="contains_dairy" :checked="contains.includes('dairy')" @input="$emit('changeContains', 'dairy', $event.target.checked)"><label for="contains_dairy">produits laitiers</label>
        <input type="checkbox" id="contains_eggs" :checked="contains.includes('eggs')" @input="$emit('changeContains', 'eggs', $event.target.checked)"><label for="contains_eggs">oeufs</label>
        <input type="checkbox" id="contains_oap" :checked="contains.includes('oap')" @input="$emit('changeContains', 'oap', $event.target.checked)"><label for="contains_oap">autres produits animaux</label>
        <input type="checkbox" id="contains_gluten" :checked="contains.includes('gluten')" @input="$emit('changeContains', 'gluten', $event.target.checked)"><label for="contains_gluten">gluten</label>
        <input type="checkbox" id="contains_shellfish" :checked="contains.includes('shellfish')" @input="$emit('changeContains', 'shellfish', $event.target.checked)"><label for="contains_shellfish">crustacés</label>
        <input type="checkbox" id="contains_peanuts" :checked="contains.includes('peanuts')" @input="$emit('changeContains', 'peanuts', $event.target.checked)"><label for="contains_peanuts">arachides</label>
        <input type="checkbox" id="contains_soy" :checked="contains.includes('soy')" @input="$emit('changeContains', 'soy', $event.target.checked)"><label for="contains_soy">soja</label>
        <input type="checkbox" id="contains_nuts" :checked="contains.includes('nuts')" @input="$emit('changeContains', 'nuts', $event.target.checked)"><label for="contains_nuts">fruits à coques</label>
        <input type="checkbox" id="contains_celery" :checked="contains.includes('celery')" @input="$emit('changeContains', 'celery', $event.target.checked)"><label for="contains_celery">céleri</label>
        <input type="checkbox" id="contains_mustard" :checked="contains.includes('mustard')" @input="$emit('changeContains', 'mustard', $event.target.checked)"><label for="contains_mustard">moutarde</label>
        <input type="checkbox" id="contains_sesame" :checked="contains.includes('sesame')" @input="$emit('changeContains', 'sesame', $event.target.checked)"><label for="contains_sesame">graines de sésame</label>
        <input type="checkbox" id="contains_SOx" :checked="contains.includes('SOx')" @input="$emit('changeContains', 'SOx', $event.target.checked)"><label for="contains_SOx">sulfites</label>
        <input type="checkbox" id="contains_lupin" :checked="contains.includes('lupin')" @input="$emit('changeContains', 'lupin', $event.target.checked)"><label for="contains_lupin">lupin</label>
        <input type="checkbox" id="contains_molluscs" :checked="contains.includes('molluscs')" @input="$emit('changeContains', 'molluscs', $event.target.checked)"><label for="contains_molluscs">mollusques</label>
        <input type="checkbox" id="contains_alcohol" :checked="contains.includes('alcohol')" @input="$emit('changeContains', 'alcohol', $event.target.checked)"><label for="contains_alcohol">alcool</label>
        <input type="checkbox" id="contains_pork" :checked="contains.includes('pork')" @input="$emit('changeContains', 'pork', $event.target.checked)"><label for="contains_pork">porc</label>
    </span>
</template>

<style scoped>
    .Food_Contains_Value_cls
    {
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
    .Food_Cost_Edit_cls
    {
        width: 70px;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    input
    {
        border:             solid 1px #c8b273;
        background-color:   #9f5069;
        outline:            none;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .Food_Contains_Value_cls
        {
            font-size: 2em;
        }

        .Food_Cost_Edit_cls
        {
            font-size: 1em;
        }
    }
</style>
