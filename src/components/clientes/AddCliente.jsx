import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { contenidoModal } from '@/lib/utils/styles'
import { getFormData } from '@/lib/utils/getFormData'
const AddCliente = ({ handleAlert, handleClose, setOpen }) => {
    const handleAdd = async (e) => {
        e.preventDefault();
        const cliente = getFormData(e.currentTarget);

        if (cliente.name == '' || cliente.email == '') {
            return handleAlert("Por favor, agregue los datos requeridos");
        }
        const res = await fetch(process.env.NODE_ENV != "development" ? `https://tecno-copy.vercel.app/api/clientes` : `/api/clientes`, { method: 'POST', body: JSON.stringify(cliente) });
        const respuesta = await res.json();
        handleAlert(respuesta.message, respuesta.status);
        handleClose();
    }
    return (
        <Card sx={{
            ...contenidoModal, width: { lg: '40%', xs: '80%' }, mx: 'auto', my: 5,
        }}
            component='form'
            onSubmit={handleAdd}
        >
            <CardHeader
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h5'>Agregar nuevo cliente</Typography>
                    </Box>
                }
            />
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item lg={12} xs={12}>
                        <TextField name='name' label='Nombre' fullWidth required />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <TextField name='email' label='Correo electrónico' fullWidth required />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField name='address1' label='Calle' fullWidth />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField name='address2' label='Colonia' fullWidth />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField name='address3' label='Ciudad y Estado' fullWidth />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField name='rfc' label='RFC' fullWidth />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Button onClick={() => setOpen()} variant="outlined" color="error" sx={{ mr: 2 }}>Cancelar</Button>
                <Button type='submit' variant='contained' color='success'>Guardar</Button>
            </CardActions>
        </Card >
    )
}

export default AddCliente
