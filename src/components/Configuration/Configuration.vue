// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Configuration view.
// Under development. Only used for admin connection.
<script setup>
    import BackButton from './../BackButton.vue'

    defineEmits(['hideCentralContainerRequested'])
</script>

<template>
    <div>
        <div class="Dialog_cls">
            <h1>Onglet Configuration</h1>
            <p>Cet onglet est en cours de développement.</p>
        </div>
        <!-- Mobile version only. -->
        <BackButton @backRequested="$emit('hideCentralContainerRequested')"></BackButton>
    </div>
</template>

<style scoped>
    .Dialog_cls
    {
        display:        inline-block;
        position:       absolute;
        padding:        20px;
        border-radius:  5px;
        border:         solid 2px #c8b273;
        top:            50%;
        left:           50%;
        transform:      translate(-50%, -50%);
    }

    h1
    {
        color:        #c8b273;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size:      1.5em;
        text-align:     center;
    }

    p
    {
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size:      1em;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .Dialog_cls
        {
            padding:        15px;
            width:          80%;
        }

        h1
        {
            color:        #c8b273;
            font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            font-size:      4em;
            text-align:     center;
        }

        p
        {
            font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            font-size:      3.5em;
            text-align:     center;
        }
    }
</style>