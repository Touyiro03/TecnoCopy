import React from 'react';
import { Alert as MuiAlert } from '@mui/material';

const Alert = ({ mensaje, abierto, severidad }) => {
    return (
        <MuiAlert severity={severidad} variant="filled" onClose={() => { }}>
            {mensaje}
        </MuiAlert>
    );
};

export default Alert;