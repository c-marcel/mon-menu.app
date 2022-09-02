<script setup>
    import { ref } from 'vue'
   
    const props = defineProps(['isAddButtonActive', 'isRemoveButtonActive', 'isEditButtonActive'])

    defineEmits(['addFoodRequested', 'removeFoodRequested', 'editFoodRequested'])
</script>

<template>
    <div class="FoodsHeader_cls">
        <button :disabled="!isAddButtonActive" title="Ajouter un nouvel aliment" @click="$emit('addFoodRequested')">➕</button>
        <button :disabled="!isRemoveButtonActive" title="Supprimer l'aliment" @click="$emit('removeFoodRequested')">➖</button>
        <button :disabled="!isEditButtonActive" title="Editer/sauvegarder l'aliment actuel" @click="$emit('editFoodRequested')">🖊️</button>
    </div>
</template>

<style scoped>
    .FoodsHeader_cls
    {
        height:             40px;
        background-color: #834655;
        vertical-align:     middle;
        line-height:        40px;
    }

    button
    {
        height:         30px;
        width:          30px;
        border:         solid 1px #c8b273;
        border-radius:  5px;
        margin-left:    5px;
    }
</style>
