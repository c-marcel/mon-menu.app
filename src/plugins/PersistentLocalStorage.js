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
            // User connection data.
            level:              ref(localStorage.sessionData_level || 'user'),                  //< User level. Can be: 'user' (standard user) or 'admin' (administrator user).
            username:           ref(localStorage.sessionData_username || 'Anonyme'),            //< User name.

            // Kitchen data.
            ovenEnergy:         ref(localStorage.sessionData_ovenEnergy || 'electricity'),      //< Oven energy ('electricity' or 'gas').
            hobEnergy:          ref(localStorage.sessionData_hobEnergy || 'electricity'),       //< Hob energy.
            kettleEnergy:       ref(localStorage.sessionData_kettleEnergy || 'electricity'),    //< Kettle energy.

            // Energy data.
            electricityCost:    ref(localStorage.sessionData_electricityCost || 17.4),          //< Electricity cost in c€ per kWh.
            gasCost:            ref(localStorage.sessionData_gasCost || 11.2)                   //< Gas cost in c€ per kWh.
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

        watch(sessionData.ovenEnergy, (n) =>
        {
            localStorage.sessionData_ovenEnergy = n
        })

        watch(sessionData.hobEnergy, (n) =>
        {
            localStorage.sessionData_hobEnergy = n
        })

        watch(sessionData.kettleEnergy, (n) =>
        {
            localStorage.sessionData_kettleEnergy = n
        })

        watch(sessionData.electricityCost, (n) =>
        {
            localStorage.sessionData_electricityCost = n
        })

        watch(sessionData.gasCost, (n) =>
        {
            localStorage.sessionData_gasCost = n
        })
    }
}
