// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

// Configuration view.
// Under development. Only used for admin connection.
<script setup>
    import BackButton from './../BackButton.vue'

    import { ref, inject } from 'vue'
    import axios from 'axios'

    let userData = ref(inject('userData'))
    let username = ref('')
    let password = ref('')

    defineEmits(['hideCentralContainerRequested'])

    function connectAsAdmin()
    {
        axios.get('https://api.mon-menu.app/connect?username=' + username.value + '&password=' + password.value)
        .then((response) =>
        {
            if (response.status == 200)
            {
                userData.value.level                = response.data['level']
                userData.value.authentication.token = response.data['token']
            }
        }).catch(function(error)
        {
        });
    }

    function disconnectAsAdmin()
    {
        userData.value.level                = 'user'
        userData.value.authentication.token = ""
    }
</script>

<template>
    <div>
        <div class="Dialog_cls">
            <h1>Onglet Configuration</h1>
            <p>Cet onglet est en cours de développement.</p>
            <p class="AdminAccessTitle_cls">🛡️ Accès administrateur</p>
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
                        <td><button @click="connectAsAdmin()">Connexion</button></td>
                    </tr>
                </table>
            </p>
            <p v-if="userData.level == 'admin'" style="text-align: center;">
                <button @click="disconnectAsAdmin()">Déconnexion</button>
            </p>
        </div>
        <!-- Mobile version only. -->
        <BackButton @backRequested="$emit('hideCentralContainerRequested')"></BackButton>
    </div>
</template>

<style scoped>
    .Dialog_cls
    {
        display:        inline-block;
        position:       absolute;
        padding:        20px;
        border-radius:  5px;
        border:         solid 2px #c8b273;
        top:            50%;
        left:           50%;
        transform:      translate(-50%, -50%);
    }

    h1
    {
        color:        #c8b273;
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size:      1.5em;
        text-align:     center;
    }

    p
    {
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size:      1em;
    }

    .AdminAccessTitle_cls
    {
        text-align: center;
        font-weight: bold;
    }

    table
    {
        font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size:      0.9em;
    }

    @media (max-width: 1280px) and (orientation: portrait)
    {
        .Dialog_cls
        {
            padding:        15px;
            width:          80%;
        }
        h1
        {
            color:        #c8b273;
            font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            font-size:      4em;
            text-align:     center;
        }

        p
        {
            font-family:    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            font-size:      3.5em;
            text-align:     center;
        }

        table
        {
            width:      100%;
            text-align: left;
        }

        input
        {
            height:     60px;
            width:      320px;
            font-size:  1em;
        }

        button
        {
            font-size:  1em;
            margin-top: 20px;
            padding:    5px;
        }
    }
</style>