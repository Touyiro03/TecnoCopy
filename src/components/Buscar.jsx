import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = () => {

    return (
        <TextField
            label="Buscar clientes"
            fullWidth
            margin="normal"
            variant="outlined"
        />
    );
};

export default SearchBar;
