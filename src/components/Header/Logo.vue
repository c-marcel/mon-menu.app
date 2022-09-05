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
