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

            let minuts = String(value % 60)
            if (minuts.length == 1)
                minuts = '0' + minuts

            if (minuts == '00')
                minuts = ''

            return String(Math.floor(value / 60)) + 'h' + minuts
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

        // Convert ingredient quantity and unit option to human readable.
        app.config.globalProperties.$formatIngredientQuantity = (quantity, units) =>
        {
            // No units: use kg as default.
            if (units == null)
                return app.config.globalProperties.$formatFloat(app.config.globalProperties.$formatWeight(quantity))

            // Bad units.
            if (!units.hasOwnProperty('conversion')
                  || typeof units.conversion != "string"
                  || !units.hasOwnProperty('label')
                  || !Array.isArray(units.label)
                  || units.label.length < 1)
                return app.config.globalProperties.$formatFloat(app.config.globalProperties.$formatWeight(quantity))

            console.log("ok")
            
            let v = quantity * units.conversion
            let u = units.label[0]

            // Lesser than 2: singular.
            if (v < 2.0)
                return String(v) + ' ' + u

            // Else: use plural.
            u = units.label[0] + 's'
            if (units.label.length == 2)
                u = units.label[1]

            return String(v) + ' ' + u
        }

        // Convert ingredient remaining quantity and unit option to human readable.
        app.config.globalProperties.$formatRemainingQuantity = (quantity, units) =>
        {
            if (quantity ==  null)
                return ''

            if (quantity <= 0.0)
                return ''

            return ' (' + app.config.globalProperties.$formatIngredientQuantity(quantity, units) + ' après usage)'
        }
    }
}
