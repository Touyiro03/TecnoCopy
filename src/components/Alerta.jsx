import { Alert, Snackbar } from '@mui/material';
import React from 'react'

const Alerta = ({ open, severity, message, setOpen }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            message={message}
            key={'bottomright'}
            autoHideDuration={3000}
        >
            <Alert severity={severity}>{message}</Alert>
        </Snackbar>
    )
}

export default Alerta
