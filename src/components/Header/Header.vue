// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Application header containing logo and main menu.
<script setup>
    import Connection from './Connection.vue'
    import Logo from './Logo.vue'
    import Menu from './Menu.vue'

    defineEmits(['menuItemClicked'])
</script>

<template>
    <div class="Header_cls">
        <Logo class="Logo_cls" />
        <Menu @itemClicked="$emit('menuItemClicked')" />
        <Connection class="Connection_Cls" />
    </div>
</template>

<style scoped>
    .Header_cls
    {
        position:           fixed;
        top:                0px;
        left:               0px;
        right:              0px;
        height:             120px;
        background-color: #834655;
    }

    .Logo_cls
    {
        margin-left:        30px;
    }

    .Connection_Cls
    {
        position:           fixed;
        display:            flex;
        flex-direction:     column;
        
        top:                0px;
        bottom:             120px;
        right:              10px;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
       .Header_cls
        {
            position:           fixed;
            display:            flex;
            flex-direction:     column;
            top:                0px;
            left:               0px;
            right:              0px;
            bottom:             0px;
            height:             auto;
        }

        .Logo_cls
        {
            display:            block;
            margin-left:        0px;
            text-align:         center;
            padding-bottom:     20px;
        }

        .Connection_Cls
        {
            display:            none;
        }
    }
</style>
