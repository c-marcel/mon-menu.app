// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

"use strict";

import { ref, watch } from 'vue'

// This plugin provides a persistent local storage for user data.
export default
{
    install: (app, options) =>
    {
        var sessionData = new Object(
        {
            level:      ref(localStorage.sessionData_level || 'user'),          //< User level. Can be: 'user' (standard user) or 'admin' (administrator user).
            username:   ref(localStorage.sessionData_username || 'Anonyme')     //< User name.
        });
        
        app.provide('sessionData', sessionData)
        
        // Persist user data.
        watch(sessionData.level, (n) =>
        {
            localStorage.sessionData_level = n
        })
        
        watch(sessionData.username, (n) =>
        {
            localStorage.sessionData_username = n
        })
    }
}
