import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import {Grid } from '@mui/material'
import React from 'react'



const Tabla = ({ columns, data, onCellClick }) => {
    const CustomToolbar = () => {
        return (
            // <GridToolbar showQuickFilter={true} quickFilterProps={{ debounceMs: 500, placeholder: "Buscar" }}/>
            <GridToolbarContainer>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center" width='100%'>
                    <Grid item xs lg sx={{ py: 1 }}>
                    </Grid>

                    {/* Mostrar el buscador (componente) fuera del datagrid */}

                    <Grid justifyContent="flex-end" item>
                        <GridToolbarQuickFilter variant="standard" placeholder="Buscar" />
                    </Grid>
                </Grid>
            </GridToolbarContainer>
        )
    }

    return (
        <div>
            <DataGrid
                onCellClick={onCellClick}
                columns={columns}
                rows={data}
                autoHeight
                sx={{
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none'
                    },
                    '& .click:hover': {
                        cursor: 'pointer'
                    },
                    borderRadius: 3
                }}
                rowHeight={30}
                getRowId={(row) => row.name + row.address}
                slots={{
                    toolbar: CustomToolbar
                }}
            />
        </div>
    )
}

export default Tabla
