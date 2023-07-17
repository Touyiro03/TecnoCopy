import { SyncLoader } from 'react-spinners';
import React from 'react'
import { Box } from '@mui/material';

const Loader = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: 5 }}>
            <SyncLoader loading={true} size={30} color="#32baff" aria-label="Loading Spinner" data-testid="loader" />
        </Box>
    )
}

export default Loader

