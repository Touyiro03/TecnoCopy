import { formatoFecha } from '@/lib/utils/date'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import EditDelete from '../EditDelete'

const Cliente = ({ cliente }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const guardarCliente = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        var datosNuevos = {};
        for (let key of form.keys()) {
            datosNuevos = { ...datosNuevos, [key]: form.get(key) }
        };
        // llamada a la api con los nuevos datos del cliente
    }
    return (
        <Card>
            <CardHeader title={
                <Tooltip sx={{ display: 'flex', justifyContent: 'center' }} title={`${cliente.name}`} placement='top' arrow>
                    <Typography noWrap variant='h5'>{openEdit && !openDelete ? 'Editar detalles de' : !openEdit && openDelete ? 'Eliminar cliente:' : 'Detalles de'} {cliente.name}</Typography>
                </Tooltip>
            } />
            <Divider />

            {/* Vista de cliente */}
            {!openEdit && !openDelete &&
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>Domicilio:</Grid>
                        <Grid item xs={9}><Typography fontWeight='bold'>{cliente.address}</Typography></Grid>
                        <Grid item xs={3}>Correo:</Grid>
                        <Grid item xs={9}><Typography fontWeight='bold'>{cliente.email}</Typography></Grid>
                        <Grid item xs={3}>RFC:</Grid>
                        {cliente.rfc &&
                            <Grid item xs={9}><Typography fontWeight='bold'>{cliente.rfc}</Typography></Grid>
                            ||
                            <Grid item xs={9}><Typography fontWeight='bold'>N/A                        </Typography></Grid>
                        }
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        {cliente.created_at &&
                            <Typography variant='subtitle2' fontStyle='italic'>Cliente creado el {formatoFecha(cliente.created_at)}</Typography>
                        }
                    </Box>
                    <EditDelete openDelete={setOpenDelete} openEdit={setOpenEdit} />
                </CardContent>
            }
            {/* Edicion de cliente */}
            {
                openEdit &&
                <CardContent>
                    <Grid container component='form' onSubmit={guardarCliente} spacing={2}>
                        <Grid item xs={3}>Nombre:</Grid>
                        <Grid item xs={9}>
                            <TextField name='name' defaultValue={cliente.name ?? ''} />
                        </Grid>

                        <Grid item xs={3}>Domicilio:</Grid>
                        <Grid item xs={9}>
                            <TextField name='address' defaultValue={cliente.address ?? ''} />
                        </Grid>

                        <Grid item xs={3}>Correo:</Grid>
                        <Grid item xs={9}>
                            <TextField name='email' defaultValue={cliente.email ?? ''} />
                        </Grid>

                        <Grid item xs={3}>RFC:</Grid>
                        <Grid item xs={9}>
                            <TextField name='rfc' defaultValue={cliente.rfc ?? ''} />
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
        </Card>
    )
}

export default Cliente