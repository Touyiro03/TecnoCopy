import { getFormData } from "@/lib/utils/getFormData";
import { handleAlert } from "@/lib/utils/handleAlert";
import { contenidoModal } from "@/lib/utils/styles";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Input, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const SubirProducto = ({ handleAlert }) => {
    const [imagen, setImagen] = useState(null);
    const handleSubir = async (e) => {
        e.preventDefault();
        var form = getFormData(e.currentTarget);
        // validar datos:
        if (form.name == '' || form.descripcion == '' || form.price == '' || form.stock == '' || form.type == '') {
            return handleAlert('Todos los campos son requeridos', 'error');
        }
        if (form.image.name == '') {
            return handleAlert('Es necesario agregar una imagen', 'error');
        }
        if (!form.image.type.match(/image\/.*/, 'g')) {
            return handleAlert("Solo se aceptan archivos de tipo imagen.", 'error');
        }
        const formData = new FormData(e.currentTarget);
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('stock', form.stock);
        formData.append('type', form.type);
        formData.append('image', imagen);
        console.log(form);
        const res = await fetch(process.env.NODE_ENV != 'development' ? 'https://tecno-copy.vercel.app/api/productos/subir' : '/api/productos/subir',
            { method: 'POST', body: formData });
        const respuesta = await res.json();
        alert(respuesta.message);
    }
    const handleChange = (e) => {
        console.log(e);
        if (!e.target.files[0].type.match(/image\/.*/, 'g')) {
            e.target.value = '';
            return alert("Solo se aceptan archivos de tipo imagen.")
        }
        setImagen(e.target.files[0]);
    }
    return (
        <Card sx={{ width: '100%' }}>
            <form onSubmit={handleSubir} encType="multipart/form-data">
                <CardHeader title={
                    <Typography variant='h5' fullWidth textAlign='center'>Subir nuevo producto</Typography>
                } />
                <CardContent>
                    <Grid container spacing={2} sx={{}}>
                        <Grid item xs={12} lg={12}>
                            <TextField fullWidth name="name" label="Nombre del producto"></TextField>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <TextField fullWidth multiline minRows={5} name="description" label="Descripción del producto"></TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                fullWidth type='number' name="price" label="Precio del producto"></TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField fullWidth type='number' name="stock" label="Cantidad en existencia"></TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField select name="type" fullWidth label="Tipo de producto" defaultValue='sale'>
                                <MenuItem value='sale'>Venta</MenuItem>
                                <MenuItem value='rent'>Renta</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} lg={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                            <input required accept="image/*" type="file" name="image" onChange={handleChange} label="imagen" />

                        </Grid>
                    </Grid>
                    <CardActions sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
                        <Button mr={2} color="error">Cancelar</Button>
                        <Button type="submit" variant="contained" color="success">Guardar</Button>
                    </CardActions>
                </CardContent >
            </form>
        </Card >
    );
};

export default SubirProducto;
