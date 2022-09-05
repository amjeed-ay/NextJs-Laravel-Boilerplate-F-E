import React from 'react'
import { tailwindConfig } from '@/utils/Utils'
import { useField } from 'formik'

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText,
} from '@mui/material'

function SelectField({ options, label, ...props }) {
    const [field, meta] = useField(props)

    const error = meta.touched && Boolean(meta.error)
    const touched = meta.touched && meta.error
    return (
        <div className="mt-4 w-full">
            <FormControl
                fullWidth
                size="small"
                sx={{
                    borderRadius: 0,
                    '& label.Mui-focused': {
                        color: tailwindConfig().theme.colors.theme[1],
                    },

                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: tailwindConfig().theme.colors.theme[1],
                        },
                    },
                }}
                error={error}>
                <InputLabel id="demo-select-small">{label}</InputLabel>
                <Select
                    sx={{
                        borderRadius: 0,
                    }}
                    disableRipple
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label={label}
                    fullWidth
                    {...field}
                    {...props}
                    error={error}>
                    {options?.map(opt => (
                        <MenuItem
                            disableRipple
                            disabled={opt.disabled}
                            key={opt.value}
                            value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>
                {touched && <FormHelperText>{meta.error}</FormHelperText>}
            </FormControl>
        </div>
    )
}

export default SelectField
