// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Button for mobile views (page navigation).
<script setup>
    defineEmits(['backRequested'])
</script>

<template>
    <div class="BackButton_cls" @click="$emit('backRequested')">
    Retour
    </div>
</template>

<style scoped>
    .BackButton_cls
    {
        display: none;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .BackButton_cls
        {
            position:           fixed;
            display:            block;
            left:               0px;
            right:              0px;
            bottom:             0px;
            height:             150px;
            background-color: #834655;
            font-size:          6em;
            text-align:         center;
            vertical-align:     middle;
            line-height:        150px;
            color:              #c8b273;
            font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            cursor:             pointer;
        }
    }
</style>
