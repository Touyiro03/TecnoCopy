import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CardContent, Paper, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const CustomDataGrid = ({ columns, data, onCellClick, toolbar }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, my: 1 }} >
                {toolbar}
                <TextField
                    value={searchText}
                    label="Buscar"
                    InputProps={{
                        type: 'search',
                        endAdornment: <Search />,
                    }}
                    onChange={handleSearch}
                    sx={{ alignSelf: 'end' }}
                />
            </Box>
            <Paper sx={{ p: 1, pt: 1 }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    columns={columns}
                    rows={filteredData}
                    autoHeight
                    onCellClick={onCellClick}
                />
            </Paper>
        </div >
    );
};

export default CustomDataGrid;


// import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
// import { Grid } from '@mui/material'
// import React from 'react'



// const Tabla = ({ columns, data, onCellClick }) => {
//     const CustomToolbar = () => {
//         return (
//             <GridToolbarContainer>
//                 <Grid container spacing={2} justifyContent="space-between" alignItems="center" width='100%'>
//                     <Grid item xs lg sx={{ py: 1 }}>
//                     </Grid>
//                     <Grid justifyContent="flex-end" item /*sx={{ width: '30%' }}*/>
//                         {/* <Buscar onSelect={(e) => router.push('/clientes/vista/' + e.id)} /> */}
//                         <GridToolbarQuickFilter variant="outlined" placeholder="Buscar" />
//                     </Grid>
//                 </Grid>
//             </GridToolbarContainer>
//         )
//     }

//     return (
//         <div>
//             <DataGrid
//                 getRowId={(row) => row._id}
//                 columns={columns}
//                 rows={data}
//                 autoHeight
//                 onCellClick={(cell) => handleClickCell(cell)}
//                 sx={{
//                     '.MuiDataGrid-cell:focus': {
//                         outline: 'none'
//                     },
//                     '& .click:hover': {
//                         cursor: 'pointer'
//                     },
//                     borderRadius: 3
//                 }}
//                 rowHeight={30}
//                 slots={{
//                     toolbar: CustomToolbar, // Botones superiores
//                     //footer: CustomFooter
//                 }}
//             />
//         </div>
//     )
// }

// export default Tabla
