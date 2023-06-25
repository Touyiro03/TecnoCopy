import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <Box

        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'primary',
                pt: 5,
                mt: 5
            }}>
                <Typography variant="h1" style={{ color: 'black', textShadow: 'black' }}>
                    ¡Vacío!
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'primary',
                pt: 5,
            }}>
                <Typography variant="" style={{ color: 'black', textShadow: 'black' }}>
                    No se ha encontrado la página que buscas, <Link href="/">haz click aquí para regresar al inicio</Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default NotFound