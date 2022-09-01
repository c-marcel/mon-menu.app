<script setup>
    import Logo from './Logo.vue'
    import Menu from './Menu.vue'
</script>

<template>
    <div class="Header_cls">
        <Logo class="Logo_cls"></Logo>
        <Menu></Menu>
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
</style>
