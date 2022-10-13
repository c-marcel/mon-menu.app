// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Configuration view.
// Under development. Only used for admin connection.
<script setup>
    import { ref, inject } from 'vue'
    import axios from 'axios'
    
    import BackButton from './../BackButton.vue'

    axios.defaults.withCredentials = true

    let sessionData                 = ref(inject('sessionData'))
    let recipeComputationInProgress = ref(false)
    let recipeComputationReport     = ref('')

    defineEmits(['hideCentralContainerRequested'])

    function changeElectricityCost(value)
    {
        sessionData.value.electricityCost = value
    }

    function changeGasCost(value)
    {
        sessionData.value.gasCost = value
    }

    function changeOvenEnergy(value)
    {
        sessionData.value.ovenEnergy = value
    }

    function changeHobEnergy(value)
    {
        sessionData.value.hobEnergy = value
    }

    function changeKettleEnergy(value)
    {
        sessionData.value.kettleEnergy = value
    }

    function computeRecipeData()
    {
        recipeComputationInProgress.value = true
        recipeComputationReport.value     = ''

        axios.post('https://api.mon-menu.app/computeRecipeLinkedFields', '')
        .then((response) =>
        {
            recipeComputationInProgress.value = false

            if (response.status == 200)
            {
                recipeComputationReport.value = String(response.data.updatedRecipes.length) + ' recette(s) mises à jour en ' + String(response.data.timeOfProcessing) + ' ms.'
                setTimeout(() => { recipeComputationReport.value = '' }, 2000)
            }
        })
        .catch(function(error)
        {
            recipeComputationInProgress.value = false
        });
    }
</script>

<template>
    <div class="ConfigurationBg_Cls">
        <span class="ConfigurationTitle_Cls">Paramètres de la cuisine</span>
        <span class="ConfigurationEntry_Cls">
            <table>
                <tr>
                    <td>énergie du four :</td>
                    <td>
                        <select v-model="sessionData.ovenEnergy" @change="changeOvenEnergy($event.target.value)">
                            <option value="electricity">électrique</option>
                            <option value="gas">gaz</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>énergie des plaques de cuisson :</td>
                    <td>
                        <select v-model="sessionData.hobEnergy" @change="changeHobEnergy($event.target.value)">
                            <option value="electricity">électrique</option>
                            <option value="gas">gaz</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>énergie de la bouilloire :</td>
                    <td>
                        <select v-model="sessionData.kettleEnergy" @change="changeKettleEnergy($event.target.value)">
                            <option value="electricity">électrique</option>
                            <option value="gas">gaz</option>
                        </select>
                    </td>
                </tr>
            </table>
        </span>
        <span class="ConfigurationTitle_Cls">Paramètres des énergies</span>
        <span class="ConfigurationEntry_Cls">
            <table>
                <tr>
                    <td>coût du kWh électrique : </td>
                    <td>
                        <input type=number step=0.1 min=0.0 max=1000.0 :value=sessionData.electricityCost @change="changeElectricityCost($event.target.value)" /> c€ TTC
                    </td>
                </tr>
                <tr>
                    <td>coût du kWh gaz : </td>
                    <td>
                        <input type=number step=0.1 min=0.0 max=1000.0 :value=sessionData.gasCost @change="changeGasCost($event.target.value)" /> c€ TTC
                    </td>
                </tr>
            </table>
        </span>
        <span v-if="sessionData.level == 'admin'" class="ConfigurationTitle_Cls">Outils d'administration</span>
        <span v-if="sessionData.level == 'admin'" class="ConfigurationEntry_Cls">
            <span>Recalculer les recettes :</span>
            <button @click="computeRecipeData()">{{ !recipeComputationInProgress ? 'Démarrer' : 'Calcul en cours ...' }}</button>
            <span style="margin-left: 10px; font-size: 0.8em; font-style: italic; color: #c8b273">{{ recipeComputationReport }}</span>
        </span>
        <!-- Mobile version only. -->
        <BackButton @backRequested="$emit('hideCentralContainerRequested')"></BackButton>
    </div>
</template>

<style scoped>
    .ConfigurationBg_Cls
    {
        margin:             10px;
        border:             dashed 1px #c8b273;
        display:            flex;
        flex-direction:     column;
        padding:            10px;
        gap:                5px;
    }

    .ConfigurationTitle_Cls
    {
        color:              #c8b273;
        font-size:          1.2em;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .ConfigurationEntry_Cls
    {
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        margin-left:        40px;
    }

    input
    {
        width:              80px;
        border:             solid 1px #c8b273;
        background-color:   #9f5069;
        outline:            none;
    }

    button
    {
        height:         30px;
        border:         solid 1px #c8b273;
        border-radius:  5px;
        margin-left:    5px;
    }
</style>