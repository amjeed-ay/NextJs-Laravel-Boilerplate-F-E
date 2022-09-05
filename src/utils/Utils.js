import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfigFile from '../../tailwind.config'

export const tailwindConfig = () => {
    // Tailwind config
    return resolveConfig(tailwindConfigFile)
}

export const sxInput = {
    '& label.Mui-focused': {
        color: tailwindConfig().theme.colors.theme[1],
    },

    '& .MuiOutlinedInput-root': {
        borderRadius: 0,
        '&.Mui-focused fieldset': {
            borderColor: tailwindConfig().theme.colors.theme[1],
        },
    },
}

export const convertObjToUrlParams = obj => {
    var paramString = ''
    for (let key in obj) {
        if (obj[key] !== null && obj[key] !== undefined) {
            paramString += '&'
            if (key === 'page') {
                paramString += obj[key]
            } else {
                paramString += key + '=' + obj[key]
            }
        }
    }
    return paramString
}

export const objToUrlParamsExcludePage = obj => {
    var paramString = ''
    for (let key in obj) {
        if (obj[key] !== null && obj[key] !== undefined) {
            if (key != 'page' && key != 'per_page') {
                paramString += '&'
                paramString += key + '=' + obj[key]
            }
        }
    }
    return paramString
}
