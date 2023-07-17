import { formatoFecha } from '@/lib/utils/date'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import EditDelete from '../EditDelete'

const Cliente = ({ cliente, refresh, handleAlert, setResultado }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [datos, setDatos] = useState(cliente);
    const guardarCliente = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        var datosNuevos = { id: cliente._id };
        for (let key of form.keys()) {
            datosNuevos = { ...datosNuevos, [key]: form.get(key) }
        };

        // llamada a la api con los nuevos datos del cliente
        const res = await fetch(process.env.NODE_ENV != "development" ? `https://tecno-copy.vercel.app/api/clientes` : `/api/clientes`, { method: 'PUT', body: JSON.stringify(datosNuevos) });
        const resultado = await res.json();
        if (resultado.status === 'success') {
            // mostrar datos nuevos en el modal
            setDatos(datosNuevos);
            setResultado(datosNuevos);
            setOpenEdit(false);
        }
        handleAlert(resultado.message, resultado.status);
        refresh();
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        var datos = JSON.stringify({ id_cliente: cliente._id });
        const res = await fetch(process.env.NODE_ENV != "development" ? `https://tecno-copy.vercel.app/api/clientes?id=${cliente._id}` : `/api/clientes?id=${cliente._id}`, { method: 'DELETE', body: datos });
        const resultado = await res.json();
        if (resultado.status == 'success') {
            setOpenDelete(false);
            console.log(resultado.data);
        }
        handleAlert(resultado.message, resultado.status);
        setOpenDelete(false);
        refresh();
    }
    return (
        <Card>
            <CardHeader title={
                <Tooltip sx={{ display: 'flex', justifyContent: 'center' }} title={`${datos.name}`} placement='top' arrow>
                    <Typography
                        noWrap
                        variant='h5'
                    >
                        {openEdit && !openDelete ? 'Editar detalles de' : !openEdit && openDelete ? 'Eliminar cliente:' : 'Detalles de'} {datos.name}
                    </Typography>
                </Tooltip>
            } />
            <Divider />

            {/* Vista de datos */}
            {!openEdit && !openDelete &&
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>Domicilio:</Grid>
                        <Grid item xs={9}><Typography fontWeight='bold' sx={{ textAlign: { xs: 'center', lg: 'start' } }}>{datos.address}</Typography></Grid>
                        <Grid item xs={3}>Correo:</Grid>
                        <Grid item xs={9}><Typography fontWeight='bold' sx={{ textAlign: { xs: 'center', lg: 'start' } }}>{datos.email}</Typography></Grid>
                        <Grid item xs={3}>RFC:</Grid>
                        {datos.rfc &&
                            <Grid item xs={9}><Typography fontWeight='bold' sx={{ textAlign: { xs: 'center', lg: 'start' } }}>{datos.rfc}</Typography></Grid>
                            ||
                            <Grid item xs={9}><Typography fontWeight='bold' sx={{ textAlign: { xs: 'center', lg: 'start' } }}>N/A                        </Typography></Grid>
                        }
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        {datos.created_at &&
                            <Typography variant='subtitle2' fontStyle='italic'>Cliente creado el {formatoFecha(datos.created_at)}</Typography>
                        }
                    </Box>
                    <EditDelete openDelete={setOpenDelete} openEdit={setOpenEdit} />
                </CardContent>
            }
            {/* Edicion de cliente */}
            {
                openEdit &&
                <CardContent sx={{ width: '100%' }}>
                    <Grid container component='form' onSubmit={guardarCliente} spacing={2} sx={{ mr: 2, alignItems: 'center' }}>
                        <Grid item xs={3}>Nombre:</Grid>
                        <Grid item xs={9}>
                            <TextField fullWidth name='name' defaultValue={datos.name ?? ''} />
                        </Grid>

                        <Grid item xs={3}>Domicilio:</Grid>
                        <Grid item xs={9}>
                            <TextField fullWidth name='address' defaultValue={datos.address ?? ''} />
                        </Grid>

                        <Grid item xs={3}>Correo:</Grid>
                        <Grid item xs={9}>
                            <TextField fullWidth name='email' defaultValue={datos.email ?? ''} />
                        </Grid>

                        <Grid item xs={3}>RFC:</Grid>
                        <Grid item xs={9}>
                            <TextField fullWidth name='rfc' defaultValue={datos.rfc ?? ''} />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                            <Button onClick={() => { setOpenEdit(false) }} color='error' sx={{ mr: 2 }} >
                                Cancelar
                            </Button>
                            <Button type='submit' variant='contained' color='success'>
                                Guardar
                            </Button>

                        </Grid>
                    </Grid>
                </CardContent>
            }
            {
                openDelete &&
                <CardContent>
                    <Typography>¿Está seguro(a) de que desea eliminar este cliente? Esta acción es permanente</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button color='success' onClick={() => setOpenDelete(false)}>Cancelar</Button>
                        <Button color='error' variant='contained' onClick={handleDelete}>Eliminar</Button>
                    </Box>
                </CardContent>
            }
        </Card>
    )
}

export default Cliente