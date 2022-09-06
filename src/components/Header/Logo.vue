// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// View of the application logo.
<script setup>
</script>

<template>
    <a href="/"><img id="AppLogo" src="/logo.png"/></a>
</template>

<style scoped>
    a
    {
        text-decoration: none;
    }

    #AppLogo
    {
        content:        url(/logo.png);
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        #AppLogo
        {
            content:    url(/logo_mobile.png);
            width:      80%;
        }
    }
</style>
