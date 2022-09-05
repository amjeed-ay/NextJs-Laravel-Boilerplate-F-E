const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
module.exports = {
    content: ['./src/**/*.js', './src/**/*.jsx'],
    darkMode: 'media',
    theme: {
        extend: {
            minHeight: {
                'normal-full': '75vh',
            },

            colors: {
                theme: {
                    1: colors.indigo[500],
                    2: '#F1F5F8',
                },
            },

            fontFamily: {
                roboto: ['Roboto'],
            },
        },
    },
}
