import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const Tabla = ({ columns, data, onCellClick }) => {
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
            />
        </div>
    )
}

export default Tabla
