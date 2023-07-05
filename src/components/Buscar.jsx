import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Search } from '@mui/icons-material';
import { Autocomplete } from '@mui/material';

const SearchBar = ({ data, onSelect }) => {

    const handleSelect = (option) => {
        console.log(option);
        onSelect(option.target.value);
    }
    return (
        <Autocomplete
            freeSolo
            options={data.map((option) => option.name)}
            onChange={(obj, val) => handleSelect(obj, val)}
            filterOptions={(x) => x}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Buscar"
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        endAdornment: <Search />
                    }}
                />
            )}
        />

    );
};

export default SearchBar;
