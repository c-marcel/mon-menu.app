// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// View for recipe groups tab content.
<script setup>
    import { ref, inject } from 'vue'
    import axios from 'axios'

    axios.defaults.withCredentials = true

    import RecipeGroupHeader from './RecipeGroupHeader/RecipeGroupHeader.vue'
    import RecipeGroupList   from './RecipeGroupList/RecipeGroupList.vue'
    import RecipeGroupSheet  from './RecipeGroupSheet/RecipeGroupSheet.vue'
    import BackButton        from '../BackButton.vue'

    let currentId    = ref(0)
    let edit         = ref(false)
    let listUpToDate = ref(true)
    let sessionData  = ref(inject('PersistentLocalStorage_sessionData'))
    let currentTitle = ref('')

    defineEmits(['hideCentralContainerRequested'])

    function deleteCurrentRecipeGroup()
    {
        if (currentId.value == 0)
            return

        edit.value = false

        // Delete entry from database.
        axios.delete('https://api.mon-menu.app/deleteRecipeGroup/' + currentId.value)
        .then((response) =>
        {
            if (response.status == 200)
            {
                currentId.value    = 0
                listUpToDate.value = false
            }
        })
    }

    function addNewRecipeGroup()
    {
        // Add entry into database.
        axios.post('https://api.mon-menu.app/createRecipeGroup', '')
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
    function hideCurrentRecipeGroupSheet()
    {
        currentId.value = 0
    }
</script>

<template>
    <div>
        <RecipeGroupList @listItemClicked="(id, title) => { currentId = id ; currentTitle = title ; edit = false }" :upToDate="listUpToDate" @upToDateChanged="(state) => {listUpToDate = state}"/>

        <div class="RecipeGroupsContainer_cls" v-bind:class="{RecipeGroupsContainerHidden_cls: !currentId}">
            <RecipeGroupHeader v-if="sessionData.level == 'admin'" :isEditButtonActive="currentId != 0" :isRemoveButtonActive="currentId != 0" :isAddButtonActive="true" @editRecipeGroupRequested="edit = !edit" @removeRecipeGroupRequested="deleteCurrentRecipeGroup()" @addRecipeGroupRequested="addNewRecipeGroup()" />
            <RecipeGroupSheet :currentGroupId="currentId" :title="currentTitle" :edit="edit" @listOutdated="(title) => {currentTitle = title ; listUpToDate = false}"/>
            <!-- Mobile version only. -->
            <BackButton @backRequested="hideCurrentRecipeGroupSheet"></BackButton>
            <!-- -->
        </div>
    </div>
</template>

<style scoped>
    .RecipeGroupsContainer_cls
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
        .RecipeGroupsContainer_cls
        {
            background-color:   #9f5069;
            top:                0px;
            left:               0px;
            bottom:             0px;
            right:              0px;
            transform:          translate(0, 0);
        }

        .RecipeGroupsContainerHidden_cls
        {
            display: none;
        }
    }
</style>
