import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { contenidoModal } from '@/lib/utils/styles'
import { getFormData } from '@/lib/utils/getFormData'
import { mail, pass } from '@/lib/utils/regex'
const AddEmpleado = ({ handleAlert, handleClose, setOpen, sesion }) => {
    console.log(sesion);
    const [puesto, setPuesto] = useState('empleado');
    const handleAdd = async (e) => {
        e.preventDefault();
        var data = getFormData(e.currentTarget);
        if (
            data.name == '' ||
            data.address1 == '' || data.address2 == '' ||
            data.address3 == '' || data.email == '' ||
            data.password == '' || data.password_conf == ''
        ) {
            return handleAlert("Por favor, agregue los datos requeridos");
        }
        if (data.password != data.password_conf) {
            return handleAlert("Las contraseñas no coinciden.", "error");
        }
        if (!data.email.match(mail)) {
            return handleAlert("Ingresa un correo electrónico válido.", "error");
        }
        if (!data.password.match(pass)) {
            return handleAlert("La contraseña debe tener entre 6 y 20 caracteres, al menos una minúscula, una minúscula y un símbolo", "error");
        }
        const res = await fetch(process.env.NODE_ENV != "development" ? `https://tecno-copy.vercel.app/api/empleados` : `/api/empleados`,
            {
                method: 'POST',
                body: JSON.stringify(data)
            });
        const respuesta = await res.json();
        handleAlert(respuesta.message, respuesta.status);
        if (respuesta.status == 'success') {
            return handleClose();
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
                    {(sesion.user.role == 'admin' || sesion.user.role == 'gerente') &&
                        <Grid item lg={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Puesto / Cargo</InputLabel>
                                <Select
                                    name="role"
                                    value={puesto}
                                    onChange={(e) => setPuesto(e.target.value)}
                                >
                                    <MenuItem value={'gerente'}>Gerente</MenuItem>
                                    <MenuItem value={'supervisor'}>Supervisor</MenuItem>
                                    <MenuItem value={'empleado'}>Empleado</MenuItem>
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
