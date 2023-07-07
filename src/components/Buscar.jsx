import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Search } from '@mui/icons-material';
import { Autocomplete } from '@mui/material';

const SearchBar = ({ data, onSelect }) => {

    const handleSelect = (e, v) => {
        //console.log(e, v);
        onSelect(v);
    }
    return (
        <Autocomplete
            freeSolo
            options={data}
            getOptionLabel={(option) => (option.name ?? "")}
            onChange={(obj, val) => handleSelect(obj, val)}
            // filterOptions={(x) => x}
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
            renderOption={(props, opcion) => {
                //console.log(opcion, props)
                return (
                    <li {...props}>{opcion.name}</li>
                )
            }}
        />

    );
};

export default SearchBar;
