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
        var default_electricityCost = 17.4;
        var default_gasCost         = 11.2;
        var default_ovenEnergy      = 'electricity';
        var default_hobEnergy       = 'electricity';
        var default_kettleEnergy    = 'electricity';
        var default_co2Electricity  = 0.074;
        var default_co2Gas          = 0.443;

        var sessionData = new Object(
        {
            // User connection data.
            level:              ref(localStorage.sessionData_level || ''),                                  //< User level. Can be: 'user' (standard user) or 'admin' (administrator user) or '' (not connected user).
            username:           ref(localStorage.sessionData_username || ''),                               //< User name for connection.

            // Kitchen data.
            ovenEnergy:         ref(localStorage.sessionData_ovenEnergy || default_ovenEnergy),             //< Oven energy ('electricity' or 'gas').
            hobEnergy:          ref(localStorage.sessionData_hobEnergy || default_hobEnergy),               //< Hob energy.
            kettleEnergy:       ref(localStorage.sessionData_kettleEnergy || default_kettleEnergy),         //< Kettle energy.

            // Energy data.
            electricityCost:    ref(localStorage.sessionData_electricityCost || default_electricityCost),   //< Electricity cost in c€ per kWh.
            gasCost:            ref(localStorage.sessionData_gasCost || default_gasCost),                   //< Gas cost in c€ per kWh.

            // Environmental impact data.
            co2Electricity:     ref(localStorage.sessionData_co2Electricity || default_co2Electricity),     //< CO2 emissions for electricity (in kg per kWh).
            co2Gas:             ref(localStorage.sessionData_co2Gas || default_co2Gas)                      //< CO2 emissions for gas (in kg per kWh).
        });
        
        app.provide('sessionData', sessionData)

        // Set CO2 emissions.
        app.config.globalProperties.$setCo2Emissions = (electricity, gas) =>
        {
            sessionData.co2Electricity.value = electricity
            sessionData.co2Gas.value         = gas
        }

        // Reset kitchen and energy data.
        app.config.globalProperties.$resetKitchenAndEnergyData = () =>
        {
            sessionData.ovenEnergy.value    = default_ovenEnergy
            sessionData.hobEnergy.value     = default_hobEnergy
            sessionData.kettleEnergy.value  = default_kettleEnergy

            sessionData.electricityCost.value = default_electricityCost
            sessionData.gasCost.value         = default_gasCost
        }

        // Persist user data.
        watch(sessionData.level, (n) =>
        {
            localStorage.sessionData_level = n

            // If user is disconnected: reset data.
            if (n == '')
                app.config.globalProperties.$resetKitchenAndEnergyData()
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

        watch(sessionData.gasCost, (n) =>
        {
            localStorage.sessionData_gasCost = n
        })

        watch(sessionData.co2Electricity, (n) =>
        {
            localStorage.sessionData_co2Electricity = n
        })

        watch(sessionData.co2Gas, (n) =>
        {
            localStorage.sessionData_co2Gas = n
        })
    }
}
