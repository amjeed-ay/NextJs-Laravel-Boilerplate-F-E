import { tailwindConfig } from '@/utils/Utils'
import LoadingButton from '@mui/lab/LoadingButton'

const Button = ({
    type = 'submit',
    processing,
    variant = 'contained',
    children,
    trigger,
    ...props
}) => {
    return (
        <LoadingButton
            {...props}
            type={type}
            ref={trigger}
            disabled={processing}
            className="rounded-sm font-medium "
            sx={{
                textTransform: 'none',
                borderRadius: 0,
                backgroundColor:
                    tailwindConfig().theme.colors.theme[1] + '!important',
                '&:hover': {
                    backgroundColor: tailwindConfig().theme.colors.theme[11],
                },
            }}
            color="success"
            variant={variant}
            loading={processing}
            disableElevation
            disableRipple>
            {children}
        </LoadingButton>
    )
}

export default Button
