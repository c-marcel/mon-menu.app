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

        // Convert kg to human readable format.
        app.config.globalProperties.$formatWeight = (value) =>
        {
            if (value >= 1.0)
                return String(value) + ' kg'

            if (value >= 0.001)
                return String(value * 1000.0) + ' g'

            return String(value * 1000000.0) + ' mg'
        }

        // Convert CO2 to human readable format.
        app.config.globalProperties.$formatCo2 = (value) =>
        {
            if (value >= 1.0)
                return app.config.globalProperties.$formatFloat(String(app.config.globalProperties.$roundFloat(value, 2))) + ' kg'

            return app.config.globalProperties.$formatFloat(String(app.config.globalProperties.$roundFloat(value * 1000.0, 0))) + ' g'
        }

        // Convert water liters to human readable format.
        app.config.globalProperties.$formatWater = (value) =>
        {
            let unit = 'litre'
            if (value >= 2.0)
                unit = 'litres'

            return app.config.globalProperties.$formatFloat(String(app.config.globalProperties.$roundFloat(value, 2))) + ' ' + unit
        }

        // Convert time in minuts to human readable format.
        app.config.globalProperties.$formatTime = (value) =>
        {
            if (value < 60)
                return String(value) + '\''

            return String(Math.floor(value / 60)) + 'h' + String(value % 60)
        }

        // Recipe type to string.
        app.config.globalProperties.$recipeTypeToString = (type) =>
        {
            let out = ''

            if (type & 0x01)
            {
                if (out != '')
                    out += ', '
                out += 'apéritif'
            }

            if (type & 0x02)
            {
                if (out != '')
                    out += ', '
                out += 'entrée'
            }

            if (type & 0x04)
            {
                if (out != '')
                    out += ', '
                out += 'plat'
            }

            if (type & 0x08)
            {
                if (out != '')
                    out += ', '
                out += 'dessert'
            }

            return out
        }
    }
}
