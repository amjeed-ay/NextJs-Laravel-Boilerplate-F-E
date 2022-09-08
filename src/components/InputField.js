import React, { memo } from 'react'
import { TextField } from '@mui/material'
import { tailwindConfig } from '@/utils/Utils'
import { useField } from 'formik'

const sx = {
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

const InputField = ({
    size = 'small',
    variant = 'outlined',
    type = 'text',
    label,
    ...props
}) => {
    const [field, meta] = useField(props)

    return (
        <div className="mt-4">
            <TextField
                sx={sx}
                fullWidth
                inputProps={{
                    readOnly: props.readOnly,
                }}
                variant={variant}
                {...field}
                {...props}
                label={label}
                type={type}
                size={size}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
            />
        </div>
    )
}

export default memo(InputField)
