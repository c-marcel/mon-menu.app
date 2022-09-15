// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// List displaying all available foods into database.
<script setup>
    import { ref, watch, inject, computed, onMounted } from 'vue'
    import axios from 'axios'

    axios.defaults.withCredentials = true

    import ErrorDialog from '../../ErrorDialog.vue'

    let foods    = ref([])
    let errorMsg = ref('')
    let filter   = ref('')

    let emit = defineEmits(['listItemClicked', 'upToDateChanged'])
    let props = defineProps(['upToDate'])

    // Sorted and filtered list.
    const sf_foods = computed(() =>
    {
        let sorted = foods.value.sort((item1, item2) =>
        {
            return (item1.title > item2.title)
        });

        let filtered = sorted.filter(item =>
        {
            let title = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            let f     = filter.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return (title.includes(f))
        });
        
        return filtered;
    })

    // Watch props changes to update list.
    watch(props, (value) =>
    {
        if (!value.upToDate)
            loadFoods()
    })

    function loadFoods()
    {
        errorMsg.value = ''

        axios.get('https://api.mon-menu.app/getFoods')
        .then((response) =>
        {
            foods.value = response.data.foods
            
            // If list is already up-to-date: doesn't emit signal.
            if (!props.upToDate)
                emit('upToDateChanged')
        })
        .catch(function(error)
        {
            errorMsg.value = 'Impossible de récupérer la liste des aliments dans la base de données. Merci de contacter l\'administrateur du site.'
        });
    }

    // Load data when component has been mounted.
    onMounted(() =>
    {
        loadFoods()
    })
</script>

<template>
    <div class="FoodList_cls">
        <p class="FoodList_Title_cls">Aliments</p>

        <div v-if="errorMsg" class="ErrorMsgContainer_cls">
            <ErrorDialog :errorMsg="errorMsg" buttonTitle="Réessayer" @retryButtonClicked="loadFoods()"></ErrorDialog>
        </div>

        <ul v-if="!errorMsg">
            <li v-for="entry in sf_foods" :key="entry.id" @click="$emit('listItemClicked', entry.id)">
                <p class="FoodList_Entry_Title_cls">{{ entry.title }}</p>
                <p class="FoodList_Entry_Subtitle_cls">{{ entry.details }}</p>
            </li>
        </ul>
        <div class="Filter_cls">
            <span class="FilterTitle_cls">Filtre :</span>
            <input class="FilterText_cls" type="text" v-model="filter" />
        </div>
    </div>
</template>

<style scoped>
    .FoodList_cls
    {
        display:            flex;
        flex-direction:     column;
        position:           absolute;
        background-color:   transparent;
        width:              25%;
        margin:             0px;
        top:                10px;
        left:               10px;
        bottom:             10px;
        border:             solid 2px #c8b273;
    }

    .FoodList_Title_cls
    {
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size:          1.3em;
        color:              #c8b273;
        font-weight:        bold;
        text-align:         center;
        background-color: #834655;
        margin:             0px;
        height:             60px;
        line-height:        60px;
        user-select:        none;
    }

    .ErrorMsgContainer_cls
    {
        flex-grow:          4;
        position:           absolute;
        top:                50%;
        left:               50%;
        transform:          translate(-50%, -50%);
        width:              80%;
    }

    ul
    {
        list-style: none;
        margin:     10px;
        padding:    0px;
        flex-grow:  4;
        overflow:   auto;
    }

    li
    {
        height: 50px;
        margin-top: 10px;
        cursor:     pointer;
    }

    li:hover
    {
        background-color: #834655;
    }

    .FoodList_Entry_Title_cls
    {
        margin:         0px;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-weight:    bold;
        font-size:      1.1em;
        color:        #c8b273;
        vertical-align: middle;
        height:         30px;
        line-height:    30px;
        padding-left:   5px;
        padding-right:  5px;
        user-select:    none;
    }

    .FoodList_Entry_Subtitle_cls
    {
        margin:             0px;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-style:         italic;
        height:             20px;
        line-height:        20px;
        vertical-align:     middle;
        padding-left:       5px;
        padding-right:      5px;
        user-select:        none;
    }

    .Filter_cls
    {
        display:            flex;
        background-color: #834655;
        height:             40px;
    }

    .FilterTitle_cls
    {
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        color:            #c8b273;
        height:             40px;
        line-height:        40px;
        margin-left:        20px;
        margin-right:       20px;
    }

    .FilterText_cls
    {
        flex-grow:          1;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        border:             solid 1px #c8b273;
        background-color: #9f5069;
        height:             20px;
        margin-top:         9px;
        margin-right:       10px;
        outline:            none;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .FoodList_cls
        {
            position:   fixed;
            top:        0px;
            bottom:     150px;
            left:       0px;
            right:      0px;
            width:      auto;
        }

        .FoodList_Title_cls
        {
            font-size:          5em;
            height:             150px;
            line-height:        150px;
        }

        ul
        {
            margin:     10px;
            padding:    0px;
        }

        li
        {
            height:     150px;
            margin-top: 25px;
        }

        .FoodList_Entry_Title_cls
        {
            font-size:      4em;
            height:         100px;
            line-height:    100px;
            padding-left:   15px;
            padding-right:  15px;
        }

        .FoodList_Entry_Subtitle_cls
        {
            margin:             0px;
            font-size:          2.5em;
            height:             50px;
            line-height:        50px;
            padding-left:       15px;
            padding-right:      15px;
            user-select:        none;
        }

        .Filter_cls
        {
            height:             100px;
        }

        .FilterTitle_cls
        {
            font-size:          3em;
            height:             100px;
            line-height:        100px;
            margin-left:        40px;
            margin-right:       40px;
        }

        .FilterText_cls
        {
            border:             solid 1px #c8b273;
            height:             50px;
            margin-top:         15px;
            margin-right:       20px;
            font-size:          2.5em;
        }
    }
</style>
