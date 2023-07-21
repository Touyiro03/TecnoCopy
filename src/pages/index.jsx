import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
export default function Home() {
  const [datos, setDatos] = useState(null);
  useEffect(() => {
    const inicio = async () => {
      const res = await fetch(process.env.NODE_ENV != 'development' ? 'https://tecno-copy.vercel.app/api/productos/subir' : '/api/productos/subir', { method: 'GET' })
      const resultado = await res.json();
      if (resultado.status === 'success') {
        setDatos(resultado.data);
      }
    }
    inicio();
  }, [])

  return (
    <Grid
      container
      spacing={3}
      sx={{ p: 3 }}
    >
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Clientes" />
          <CardContent>
            <Typography variant='h6'>Últimos clientes agregados</Typography>
            {datos &&
              <Box>
                <TableContainer>
                  <Table sx={{ minWidth: 350 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Nombre</strong></TableCell>
                        <TableCell align="right"><strong>Correo</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datos.clientes.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            }
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Empleados" />
          <CardContent>🕗 Pendiente</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Ventas" />
          <CardContent>🕗 Pendiente</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Productos" />
          <CardContent>🕗 Pendiente</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Servicios" />
          <CardContent>🕗 Pendiente</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Rentas" />
          <CardContent>🕗 Pendiente</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
