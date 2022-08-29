<script setup>
    import { ref, computed } from 'vue'
    const props = defineProps(['months'])

    const month_01 = computed(() => { return props.months.includes(1) })
    const month_02 = computed(() => { return props.months.includes(2) })
    const month_03 = computed(() => { return props.months.includes(3) })
    const month_04 = computed(() => { return props.months.includes(4) })
    const month_05 = computed(() => { return props.months.includes(5) })
    const month_06 = computed(() => { return props.months.includes(6) })
    const month_07 = computed(() => { return props.months.includes(7) })
    const month_08 = computed(() => { return props.months.includes(8) })
    const month_09 = computed(() => { return props.months.includes(9) })
    const month_10 = computed(() => { return props.months.includes(10) })
    const month_11 = computed(() => { return props.months.includes(11) })
    const month_12 = computed(() => { return props.months.includes(12) })
</script>

<template>
    <span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_01}">J</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_02}">F</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_03}">M</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_04}">A</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_05}">M</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_06}">J</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_07}">J</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_08}">A</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_09}">S</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_10}">O</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_11}">N</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_12}">D</span>
    </span>
</template>

<style scoped>
    .Months_Month_cls
    {
        display:            inline-block;
        background-color: white;
        width:              15px;
        height:             width;
        font-size:          0.8em;
        text-align:         center;
        border:             solid 1px blue;
        margin-left:        5px;
    }

    .Months_Month_Active_cls
    {
        background-color: #66b2ff;
    }
</style>
