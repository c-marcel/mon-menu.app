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
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_01}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 1)"><p class="Months_Month_Text_cls">J</p></span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_02}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 2)"><p class="Months_Month_Text_cls">F</p></span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_03}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 3)"><p class="Months_Month_Text_cls">M</p></span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_04}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 4)"><p class="Months_Month_Text_cls">A</p></span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_05}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 5)"><p class="Months_Month_Text_cls">M</p></span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_06}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 6)"><p class="Months_Month_Text_cls">J</p></span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_07}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 7)"><p class="Months_Month_Text_cls">J</p></span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_08}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 8)"><p class="Months_Month_Text_cls">A</p></span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_09}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 9)"><p class="Months_Month_Text_cls">S</p></span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_10}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 10)"><p class="Months_Month_Text_cls">O</p></span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_11}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 11)"><p class="Months_Month_Text_cls">N</p></span>
        <span class="Months_Month_cls" v-bind:class="{Months_Month_Active_cls : month_12}, {Month_Editable_cls : edit}" @click="edit && $emit('toogleMonth', 12)"><p class="Months_Month_Text_cls">D</p></span>
    </span>
</template>

<style scoped>
    .Months_Month_cls
    {
        display:            inline-block;
        background-color:   transparent;
        vertical-align:     bottom;
        font-size:          0.8em;
        text-align:         center;
        border:             solid 1px #834655;
        margin-right:       5px;
        user-select:        none;
        color:              #834655;
    }

    .Months_Month_Text_cls
    {
        display:        inline-block;
        font-weight:    bold;
        margin:         0px;
        padding:        0px;
        height:         20px;
        width:          20px;
        line-height:    20px;
        vertical-align: middle;
    }

    .Months_Month_Active_cls
    {
        background-color: #c8b273;
    }

    .Month_Editable_cls
    {
        cursor: pointer;
    }
</style>
