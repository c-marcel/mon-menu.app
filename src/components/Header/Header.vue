<script setup>
    import Logo from './Logo.vue'
    import Menu from './Menu.vue'

    defineEmits(['menuItemClicked'])
</script>

<template>
    <div class="Header_cls">
        <Logo class="Logo_cls"></Logo>
        <Menu @itemClicked="$emit('menuItemClicked')"></Menu>
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
    }
</style>
