import { formatoFecha } from '@/lib/utils/date'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import EditDelete from '../EditDelete'
import { getFormData } from '@/lib/utils/getFormData'

const Empleado = ({ empleado, refresh, handleAlert, setResultado }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [datos, setDatos] = useState(empleado);
    const guardarEmpleado = async (e) => {
        e.preventDefault();
        const form = new getFormData(e.currentTarget);
        var datosNuevos = { id: empleado._id, ...form };
        // llamada a la api con los nuevos datos del empleado
        const res = await fetch(process.env.NODE_ENV != "development" ? `https://tecno-copy.vercel.app/api/empleados` : `/api/empleados`, { method: 'PUT', body: JSON.stringify(datosNuevos) });
        const resultado = await res.json();
        if (resultado.status === 'success') {
            // mostrar datos nuevos en el modal
            setDatos({ ...datosNuevos, address: `${datosNuevos.address1} | ${datosNuevos.address2} | ${datosNuevos.address3}` });
            //setResultado(datosNuevos);
            setOpenEdit(false);
        }
        handleAlert(resultado.message, resultado.status);
        refresh();
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        var datos = JSON.stringify({ id_empleado: empleado._id });
        const res = await fetch(process.env.NODE_ENV != "development" ? `https://tecno-copy.vercel.app/api/empleados?id=${empleado._id}` : `/api/empleados?id=${empleado._id}`, { method: 'DELETE', body: datos });
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
        <Card sx={{ mx: 'auto', width: { lg: '40%', xs: '90%' }, mt: 5 }}>
            <CardHeader title={
                <Tooltip sx={{ display: 'flex', justifyContent: 'center' }} title={`${datos.name}`} placement='top' arrow>
                    <Typography
                        noWrap
                        variant='h5'
                    >
                        {openEdit && !openDelete ? 'Editar detalles de' : !openEdit && openDelete ? 'Eliminar empleado:' : 'Detalles de'} {datos.name}
                    </Typography>
                </Tooltip>
            } />
            <Divider />

            {/* Vista de datos */}
            {!openEdit && !openDelete &&
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>Domicilio:</Grid>
                        <Grid item xs={9}><Typography fontWeight='bold' sx={{ textAlign: { xs: 'center', lg: 'start' } }}>
                            {datos.address.indexOf('|') ? datos.address.split(' |').join(' ').trim() : datos.address}
                        </Typography></Grid>
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
                            <Typography variant='subtitle2' fontStyle='italic'>Empleado creado el {formatoFecha(datos.created_at)}</Typography>
                        }
                    </Box>
                    <EditDelete openDelete={setOpenDelete} openEdit={setOpenEdit} />
                </CardContent>
            }
            {/* Edicion de empleado */}
            {
                openEdit &&
                <CardContent sx={{ width: '100%' }}>
                    <Grid container component='form' onSubmit={guardarEmpleado} spacing={2} sx={{ mr: 2, alignItems: 'center' }}>
                        <Grid item xs={3}>Calle:</Grid>
                        <Grid item lg={9} xs={9}>
                            <TextField
                                name='address1'
                                required
                                defaultValue={datos.address.split(' |')[0].trim()}
                                label='Calle'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>Colonia:</Grid>

                        <Grid item lg={9} xs={9}>
                            <TextField name='address2' required defaultValue={datos.address.split(' |')[1].trim()} label='Colonia' fullWidth />
                        </Grid>
                        <Grid item xs={3}>Ciudad y Estado:</Grid>
                        <Grid item lg={9} xs={9}>
                            <TextField name='address3' required defaultValue={datos.address.split(' |')[2].trim()} label='Ciudad y Estado' fullWidth />
                        </Grid>

                        <Grid item xs={3}>Correo:</Grid>
                        <Grid item xs={9}>
                            <TextField fullWidth required name='email' defaultValue={datos.email ?? ''} />
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
                <CardContent sx={{ mr: 3, ml: 3, my: 3 }}>
                    <Typography textAlign='center'>¿Está seguro(a) de que desea eliminar este empleado? </Typography>
                    <Typography textAlign='center'>Esta acción es permanente</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button color='success' onClick={() => setOpenDelete(false)} sx={{ mr: 2, }}>Cancelar</Button>
                        <Button color='error' variant='contained' onClick={handleDelete}>Eliminar</Button>
                    </Box>
                </CardContent>
            }
        </Card>
    )
}

export default Empleado