import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { contenidoModal } from '@/lib/utils/styles'
import { getFormData } from '@/lib/utils/getFormData'
const AddEmpleado = ({ handleAlert, handleClose, setOpen, sesion }) => {
    console.log(sesion);
    const [puesto, setPuesto] = useState('empleado');
    const handleAdd = async (e) => {
        e.preventDefault();
        var data = getFormData(e.currentTarget);
        if (cliente.name == '' || cliente.address == '' || cliente.email == '') {
            return handleAlert("Por favor, agregue los datos requeridos");
        }
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
                        <Typography variant='h5'>Agregar nuevo empleado</Typography>
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
                        <TextField name='password' label='Contraseña' fullWidth type='password' required />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField name='password_conf' label='Confirmar contraseña' fullWidth type='password' required />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField name='address1' label='Calle' fullWidth required />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField name='address2' label='Colonia' fullWidth required />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField name='address3' label='Ciudad y Estado' fullWidth required />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField name='rfc' label='RFC' fullWidth />
                    </Grid>
                    {sesion.user.role == 'admin' &&
                        <Grid item lg={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    name="role"
                                    value={puesto}
                                    label="Puesto / Cargo"
                                    onChange={() => setPuesto(e.target.value)}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        ||
                        <Grid item lg={6} xs={12}>
                            <Input type='hidden' value={puesto} name='role'></Input>
                        </Grid>
                    }
                </Grid>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Button onClick={() => setOpen()} variant="outlined" color="error" sx={{ mr: 2 }}>Cancelar</Button>
                <Button type='submit' variant='contained' color='success'>Guardar</Button>
            </CardActions>
        </Card >
    )
}

export default AddEmpleado
