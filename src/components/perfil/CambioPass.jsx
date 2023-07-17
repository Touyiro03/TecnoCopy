import { Alert, Button, Card, CardContent, CardHeader, Snackbar, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Alerta from '../Alerta';
import { getFormData } from '@/lib/utils/getFormData';


const CambioPass = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { data: session } = useSession();
    const [severity, setSeverity] = useState('error');
    const [password, setPassword] = useState('');
    const [prev_password, setPrevPassword] = useState('');
    const [conf_password, setConfPassword] = useState('');
    const handleCambio = async (e) => {
        e.preventDefault();
        var vent = window.location;
        const credentials = getFormData(e.currentTarget);
        if (credentials.password_conf != credentials.password) {
            setSeverity("error");
            setOpen(true);
            setMessage("Las contraseñas no coinciden");
            return;
        }
        const url = `${vent.host}${vent.pathname}`;
        const res = await fetch(`/api/empleados/newpass`, {
            method: 'PUT',
            accept: 'application/json',
            body: JSON.stringify({ ...credentials, user: session.user })
        });
        const response = await res.json();
        if (response.status != 'success') {
            setSeverity("error");
            setOpen(true);
            setMessage(response.message);
        }
        if (response.status == 'success') {
            setSeverity("success");
            setOpen(true);
            setMessage(response.message);
            setConfPassword('');
            setPassword('');
            setPrevPassword('');
        }
    }

    return (
        <Box>
            <Alerta open={open} setOpen={setOpen} severity={severity} message={message} />
            <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                    <Typography variant='h5'>
                        Cambiar Contraseña
                    </Typography>
                    <Box component="form" onSubmit={handleCambio} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="prev_pass"
                            value={prev_password}
                            label="Contraseña actual"
                            name="prev_pass"
                            autoComplete="prev_pass"
                            autoFocus
                            type="password"
                            onChange={(e) => setPrevPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            value={password}
                            required
                            fullWidth
                            name="password"
                            label="Nueva Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            value={conf_password}
                            margin="normal"
                            required
                            fullWidth
                            name="password_conf"
                            label="Confirmar Contraseña"
                            type="password"
                            id="password_conf"
                            autoComplete="current-password"
                            onChange={(e) => setConfPassword(e.target.value)}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CambioPass