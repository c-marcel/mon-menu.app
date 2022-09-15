// Copyright Clément MARCEL (NWANDA) 2022. All Rights Reserved.
// This file is licensed under the GNU Affero GPL v3.
// License text available at https://www.gnu.org/licenses/agpl-3.0.txt

"use strict";

// This plugin provides useful functions:
//  * $formatFloat(): use comma as decimal separator.
//  * $roundFloat(): set max number of digits after decimal separator.
export default
{
    install: (app, options) =>
    {
        // Use comma as decimal separator.
        // 'cost' input float.
        app.config.globalProperties.$formatFloat = (cost) =>
        {
            return String(cost).replaceAll('.', ',')
        }

        // Use 2 digits after comma.
        // 'value' input float.
        // 'n' number of digits after decimal separator.
        app.config.globalProperties.$roundFloat = (value, n) =>
        {
            let f = Math.pow(10.0, n);
            return Math.round(value * f) / f;
        }
    }
}
