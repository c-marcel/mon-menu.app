// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

"use strict";

import { ref, watch } from 'vue'

// This plugin provides a current states of the application.
export default
{
    install: (app, options) =>
    {
        var currentStates = new Object(
        {
            currentRecipeId:    "",     //< Current displayed recipe id. Empty string to hide recipe div.
            currentMode:        "",     //< Current mode: '' for normal mode or 'edit' for edit mode.
            outdatedRecipe:     ""      //< Current edited recipe (when saved).
        });
            
        app.provide('currentStates', currentStates)
    }
}
