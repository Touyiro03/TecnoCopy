import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react'

const Empleado = ({ empleado, refresh, handleAlert, setResultado }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [datos, setDatos] = useState(empleado);
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
                <CardContent>
                    <Grid container component='form' onSubmit={guardarCliente} spacing={2}>
                        <Grid item xs={3}>Nombre:</Grid>
                        <Grid item xs={9}>
                            <TextField name='name' defaultValue={datos.name ?? ''} />
                        </Grid>

                        <Grid item xs={3}>Domicilio:</Grid>
                        <Grid item xs={9}>
                            <TextField name='address' defaultValue={datos.address ?? ''} />
                        </Grid>

                        <Grid item xs={3}>Correo:</Grid>
                        <Grid item xs={9}>
                            <TextField name='email' defaultValue={datos.email ?? ''} />
                        </Grid>

                        <Grid item xs={3}>RFC:</Grid>
                        <Grid item xs={9}>
                            <TextField name='rfc' defaultValue={datos.rfc ?? ''} />
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

export default Empleado
