import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Search } from '@mui/icons-material';
import { Autocomplete } from '@mui/material';

const SearchBar = ({ data, onSelect }) => {
    const [inputValue, setInputValue] = useState('');
    const handleSelect = (e, v) => {
        setInputValue('');
        onSelect(v);
    };
    return (
        <Autocomplete
            freeSolo
            options={data}
            getOptionLabel={(option) => (option.name ?? '')}
            onChange={(obj, val) => {
                handleSelect(obj, val);
            }}
            inputValue={inputValue}
            onInputChange={(e, val) => setInputValue(val)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Buscar"
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        endAdornment: <Search />,
                    }}
                />
            )}
            renderOption={(props, opcion) => {
                return <li {...props} onClick={() => {
                    onSelect(opcion);
                    setInputValue(opcion.name);
                }}>{opcion.name}</li>;
            }}
        />
    );
};

export default SearchBar;
