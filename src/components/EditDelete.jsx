import { Create, Delete } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const EditDelete = ({ openEdit, openDelete }) => {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Tooltip title='Editar' placement='bottom' arrow>
                <IconButton
                    size='large'
                    sx={{ bgcolor: '#F7DC6F', mr: 3, '&:hover': { bgcolor: '#FCF3AF' }, my: 1 }}
                    onClick={() => openEdit(true)}>
                    <Create sx={{ color: '#7D6608' }} />
                </IconButton>
            </Tooltip>
            <Tooltip title='Eliminar' placement='bottom' arrow>
                <IconButton
                    size='large'
                    sx={{ bgcolor: '#CD6155', mr: 2, '&:hover': { bgcolor: '#E6B0AA' }, my: 1 }}
                    onClick={()=> openDelete(true)}
                    >
                    <Delete sx={{ color: '#641E16' }} />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default EditDelete