import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { IconButton } from '@mui/material'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(1),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}))

const BootstrapDialogTitle = props => {
    const { children, onClose } = props

    return (
        <div className="flex   rounded-t-md bg-gray-100 flex-row py-1.5 px-5">
            {children}
            {onClose ? (
                <IconButton
                    className=" p-1 "
                    onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        onClose()
                    }}>
                    <svg
                        className="w-6 h-6 text-gray-500 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </IconButton>
            ) : null}
        </div>
    )
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
}

const Modal = ({ show, width = 'xs', handleClose, title, children }) => {
    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={show}
                fullWidth
                maxWidth={width}
                PaperProps={{
                    sx: { position: 'fixed', top: 50, m: 0 },
                }}>
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}>
                    <span className="mr-auto flex items-center font-medium text-gray-600 text-md">
                        {title}
                    </span>
                </BootstrapDialogTitle>
                <DialogContent dividers>{children}</DialogContent>
            </BootstrapDialog>
        </div>
    )
}

export default React.memo(Modal)
