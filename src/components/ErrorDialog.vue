// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Error dialog box containing a message and a button.
<script setup>
    let props = defineProps(['errorMsg', 'buttonTitle'])

    defineEmits(['retryButtonClicked'])
</script>

<template>
    <div class="ErrorMsg_cls">
        <div class="ErrorIcon_cls">⚠️</div>
        <p class="ErrorMsgText_cls">{{ errorMsg }}</p>
        <p><a class="ErrorMsgButton_cls" @click="$emit('retryButtonClicked')">{{ buttonTitle }}</a></p>
    </div>
</template>

<style scoped>
    .ErrorMsg_cls
    {
        background-color: #834655;
        border:             solid 2px #c8b273;
        text-align:         center;
        padding:            10px;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        color:            black;
    }

    .ErrorIcon_cls
    {
        font-size:      1.5em;
        user-select:    none;
    }

    .ErrorMsgButton_cls
    {
        cursor:             pointer;
        text-decoration:    underline;
        color:            #c8b273;
        user-select:        none;
    }

    .ErrorMsgText_cls
    {
        user-select: none;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .ErrorIcon_cls
        {
            font-size:      4em;
        }

        .ErrorMsgText_cls
        {
            font-size:      1.5em;
        }

        .ErrorMsgButton_cls
        {
            font-size:      1.5em;
        }
    }
</style>
