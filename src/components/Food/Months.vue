<script setup>
    import { ref, computed } from 'vue'
    let props = defineProps(['months', 'edit'])

    defineEmits(['toogleMonth'])

    const month_01 = computed(() => { if(!props.months) return false 
        else return props.months.includes(1) })
    const month_02 = computed(() => { if(!props.months) return false 
        else return props.months.includes(2) })
    const month_03 = computed(() => { if(!props.months) return false 
        else return props.months.includes(3) })
    const month_04 = computed(() => { if(!props.months) return false 
        else return props.months.includes(4) })
    const month_05 = computed(() => { if(!props.months) return false 
        else return props.months.includes(5) })
    const month_06 = computed(() => { if(!props.months) return false 
        else return props.months.includes(6) })
    const month_07 = computed(() => { if(!props.months) return false 
        else return props.months.includes(7) })
    const month_08 = computed(() => { if(!props.months) return false 
        else return props.months.includes(8) })
    const month_09 = computed(() => { if(!props.months) return false 
        else return props.months.includes(9) })
    const month_10 = computed(() => { if(!props.months) return false 
        else return props.months.includes(10) })
    const month_11 = computed(() => { if(!props.months) return false 
        else return props.months.includes(11) })
    const month_12 = computed(() => { if(!props.months) return false 
        else return props.months.includes(12) })
</script>

<template>
    <span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_01}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 1)">J</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_02}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 2)">F</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_03}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 3)">M</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_04}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 4)">A</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_05}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 5)">M</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_06}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 6)">J</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_07}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 7)">J</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_08}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 8)">A</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_09}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 9)">S</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_10}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 10)">O</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_11}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 11)">N</span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_12}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 12)">D</span>
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
        user-select:        none;
    }

    .Months_Month_Active_cls
    {
        background-color: #66b2ff;
    }

    .Month_Editable_cls
    {
        cursor: pointer;
    }
</style>
