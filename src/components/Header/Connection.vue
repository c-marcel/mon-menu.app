// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Connection/disconnection widget.
<script setup>
    import { ref, inject } from 'vue'
    import axios from 'axios'

    axios.defaults.withCredentials = true

    let userData = ref(inject('userData'))
    let username = ref('')
    let password = ref('')

    function connectUser()
    {
        axios.get('https://api.mon-menu.app/connect?username=' + username.value + '&password=' + password.value)
        .then((response) =>
        {
            if (response.status == 200)
            {
                userData.value.level = response.data['level']
            }
        }).catch(function(error)
        {
        });
    }

    function disconnectUser()
    {
        axios.get('https://api.mon-menu.app/disconnect')
        userData.value.level = 'user'
    }
</script>

<template>
    <div class="Connection_Cls">
        <p v-if="userData.level != 'admin'" style="text-align: center;">
            <table>
                <tr>
                    <td>Nom d'utilisateur :</td>
                    <td><input v-model="username" type=text /></td>
                </tr>
                <tr>
                    <td>Mot de passe :</td>
                    <td><input v-model="password" type=password /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><button @click="connectUser()">Connexion</button></td>
                </tr>
            </table>
        </p>
        <div v-if="userData.level == 'admin'" style="text-align: center;">
            <p>Bonjour admin !</p>
            <button @click="disconnectUser()">Déconnexion</button>
        </div>
    </div>
</template>

<style scoped>
    .Connection_Cls
    {
        background-color: transparent;
    }

    table
    {
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size:      0.9em;
    }

    input
    {
        border: solid 1px #c8b273;
        background-color: #9f5069;
        outline:            none;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        width:              100px;
    }
</style>
