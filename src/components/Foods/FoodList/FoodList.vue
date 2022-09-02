<script setup>
    import { ref, watch } from 'vue'
    import axios from 'axios'

    import ErrorDialog from '../../ErrorDialog.vue'

    let foods    = ref([])
    let errorMsg = ref('')

    let emit = defineEmits(['listItemClicked', 'upToDateChanged'])
    let props = defineProps(['upToDate'])

    // TODO: remove to config panel.
    let config =
    {
        headers:
        {
            "auth-token": "1e91ccce-9a8d-45a8-8d72-0decd3549a12",
        }
    }

    loadFoods()

    // Watch props changes to update list.
    watch(props, (value) =>
    {
        if (!value.upToDate)
            loadFoods()
    })

    function loadFoods()
    {
        errorMsg.value = ''

        axios.get('https://api.mon-menu.app/getFoods', config)
        .then((response) =>
        {
            foods.value = response.data.foods
            emit('upToDateChanged')
        })
        .catch(function(error)
        {
            errorMsg.value = 'Impossible de récupérer la liste des aliments dans la base de données. Merci de contacter l\'administrateur du site.'
        });
    }
</script>

<template>
    <div class="FoodList_cls">
        <p class="FoodList_Title_cls">Aliments</p>

        <div v-if="errorMsg" class="ErrorMsgContainer_cls">
            <ErrorDialog :errorMsg="errorMsg" buttonTitle="Réessayer" @retryButtonClicked="loadFoods()"></ErrorDialog>
        </div>
        
        <ul v-if="!errorMsg">
            <li v-for="entry in foods" @click="$emit('listItemClicked', entry.id)">
                <p class="FoodList_Entry_Title_cls">{{ entry.title }}</p>
                <p class="FoodList_Entry_Subtitle_cls">{{ entry.details }}</p>
            </li>
        </ul>
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
        transform:          translate(0%, -50%);
        margin-left:        20px;
        margin-right:       20px;
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
</style>
