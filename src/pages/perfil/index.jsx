import CambioPass from '@/components/perfil/CambioPass'
import { Card, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

const index = () => {
    const [datos, setDatos] = useState(null);
    const handleEdit = async (e) => {
        e.preventDefault();
        // api para editar empleado
    }
    // llamar a api para obtener datos del empleado

    return (
        <Grid container spacing={3} sx={{ m: 3 }}>
            <Grid item xs={12} lg={6}>
                <CambioPass />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Card>
                    <CardHeader title={
                        <Typography variant='h5'>Editar perfil</Typography>
                    } />

                    <CardContent>
                        <Grid container component='form' onSubmit={handleEdit} spacing={2} sx={{ mr: 2, alignItems: 'center' }}>
                            <Grid item xs={3}>Nombre:</Grid>
                            <Grid item xs={9}>
                                <TextField required fullWidth name='name' defaultValue={datos.name ?? ''} />
                            </Grid>
                            <Grid item xs={3}>Correo:</Grid>
                            <Grid item xs={9}>
                                <TextField required fullWidth name='email' defaultValue={datos.email ?? ''} />
                            </Grid>
                            <Grid item xs={3}>Calle:</Grid>
                            <Grid item xs={9}>
                                <TextField required fullWidth name='address1' defaultValue={datos.address.split('|')[0].trim() ?? ''} />
                            </Grid>
                            <Grid item xs={3}>Colonia:</Grid>
                            <Grid item xs={9}>
                                <TextField required fullWidth name='address2' defaultValue={datos.address.split('|')[1].trim() ?? ''} />
                            </Grid>
                            <Grid item xs={3}>Ciudad y estado:</Grid>
                            <Grid item xs={9}>
                                <TextField required fullWidth name='address3' defaultValue={datos.address.split('|')[2].trim() ?? ''} />
                            </Grid>
                            <Grid item xs={3}>RFC:</Grid>
                            <Grid item xs={9}>
                                <TextField fullWidth name='rfc' defaultValue={datos.rfc ?? ''} />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                <Button type='submit' variant='contained' color='success'>
                                    Guardar
                                </Button>

                            </Grid>
                        </Grid>
                    </CardContent>

                </Card>
            </Grid>
        </Grid >
    )
}

export default index
