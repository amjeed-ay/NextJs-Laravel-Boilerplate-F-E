import React, { memo } from 'react'
import { TextField } from '@mui/material'
import { tailwindConfig } from '@/utils/Utils'
import { useField } from 'formik'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import axios from '@/lib/axios'
import debounce from 'lodash.debounce'
import NumberFormat from 'react-number-format'

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

function NumberFormatCustom(props) {
    const { ...other } = props
    return <NumberFormat {...other} thousandSeparator />
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

export function ApiAutocompleteInput({
    size = 'small',
    variant = 'outlined',
    type = 'text',
    label,
    ...props
}) {
    const [field, meta, action] = useField(props)

    const [open, setOpen] = React.useState(false)
    const [options, setOptions] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const searchVehicle = async val => {
        if (val) {
            setLoading(true)
        }
        axios
            .get(`${props.route}=${val}`)
            .then(res => {
                setLoading(false)
                setOptions(res.data)
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error.response
            })
    }

    // Server Side Search  ...............

    const handleSearchVehicle = React.useMemo(() => {
        return debounce(searchVehicle, 300)
    }, [])

    React.useEffect(() => {
        return () => {
            handleSearchVehicle.cancel()
        }
    })
    //....................................

    return (
        <div className="mt-4">
            <Autocomplete
                id="asynchronous-demo"
                open={open}
                onOpen={() => {
                    setOpen(true)
                }}
                onClose={() => {
                    setOpen(false)
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={option => option.vehicle_number}
                options={options}
                loading={loading}
                onChange={(event, newInputValue) => {
                    action.setValue(newInputValue)
                }}
                onInputChange={(event, newInputValue) => {
                    handleSearchVehicle(newInputValue)
                }}
                //props
                fullWidth
                variant={variant}
                name={props.name}
                value={field.value?.id}
                type={type}
                size={size}
                //props

                renderInput={params => (
                    <TextField
                        {...params}
                        label={label}
                        sx={sx}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    )
}

export function InputFieldFormatted({
    size = 'small',
    variant = 'outlined',
    label,
    ...props
}) {
    const [field, meta] = useField(props)

    return (
        <div className="mt-4">
            <TextField
                // value={field.value}
                // onChange={handleChange}
                InputProps={{
                    inputComponent: NumberFormatCustom,
                }}
                sx={sx}
                fullWidth
                variant={variant}
                {...field}
                {...props}
                label={label}
                size={size}
                type="text"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
            />
        </div>
    )
}
