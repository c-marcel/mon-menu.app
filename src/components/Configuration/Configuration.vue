<script setup>
    import { ref, inject } from 'vue'
    import axios from 'axios'

    let userData = ref(inject('userData'))
    let username = ref('')
    let password = ref('')

    function createHttpConfig()
    {
        let config =
        {
            headers:
            {
                "auth-token": userData.value.authentication.token
            }
        }

        return config
    }

    function connectAsAdmin()
    {
        axios.get('https://api.mon-menu.app/connect?username=' + username.value + '&password=' + password.value, createHttpConfig())
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
</style>