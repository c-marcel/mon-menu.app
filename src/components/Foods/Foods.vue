// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// View for foods tab content.
// Display list of foods, admin buttons and food sheet.
<script setup>
    import { ref, inject } from 'vue'
    import axios from 'axios'

    axios.defaults.withCredentials = true

    import FoodHeader from './FoodHeader/FoodHeader.vue'
    import BackButton from '../BackButton.vue'
    import FoodSheet  from './FoodSheet/FoodSheet.vue'
    import FoodList   from './FoodList/FoodList.vue'

    let currentId    = ref(0)
    let edit         = ref(false)
    let listUpToDate = ref(true)
    let sessionData  = ref(inject('sessionData'))

    defineEmits(['hideCentralContainerRequested'])

    function deleteCurrentFood()
    {
        if (currentId.value == 0)
            return

        edit.value = false

        // Delete entry from database.
        axios.delete('https://api.mon-menu.app/deleteFood/' + currentId.value)
        .then((response) =>
        {
            if (response.status == 200)
            {
                currentId.value    = 0
                listUpToDate.value = false
            }
        })
    }

    function addNewFood()
    {
        // Add entry into database.
        axios.post('https://api.mon-menu.app/createFood', '')
        .then((response) =>
        {
            if (response.status == 200)
            {
                currentId.value    = response.data.id
                listUpToDate.value = false
            }
        })
    }

    // Mobile version only.
    function hideCurrentFoodSheet()
    {
        currentId.value = 0
    }
</script>

<template>
    <div>
        <FoodList @listItemClicked="(id) => { currentId = id ; edit = false }" :upToDate="listUpToDate" @upToDateChanged="(state) => {listUpToDate = state}"/>
        <!-- Mobile version only. -->
            <BackButton @backRequested="$emit('hideCentralContainerRequested')"></BackButton>
        <!-- -->
        <div class="FoodsContainer_cls" v-bind:class="{FoodsContainerHidden_cls: !currentId}">
            <FoodHeader v-if="sessionData.level == 'admin'" :isEditButtonActive="currentId != 0" :isRemoveButtonActive="currentId != 0" :isAddButtonActive="true" @editFoodRequested="edit = !edit" @removeFoodRequested="deleteCurrentFood()" @addFoodRequested="addNewFood()" />
            <FoodSheet :currentFoodId="currentId" :edit="edit" @listOutdated="() => {listUpToDate = false}"/>
            <!-- Mobile version only. -->
                <BackButton @backRequested="hideCurrentFoodSheet"></BackButton>
            <!-- -->
        </div>
    </div>
</template>

<style scoped>
    .FoodsContainer_cls
    {
        display:            flex;
        position:           fixed;
        flex-direction:     column;
        gap:                10px;
        top:                130px;
        left:               25%;
        bottom:             10px;
        right:              34px;
        transform:          translate(24px, 0%);
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .FoodsContainer_cls
        {
            background-color:   #9f5069;
            top:                0px;
            left:               0px;
            bottom:             0px;
            right:              0px;
            transform:          translate(0, 0);
        }

        .FoodsContainerHidden_cls
        {
            display: none;
        }
    }
</style>
