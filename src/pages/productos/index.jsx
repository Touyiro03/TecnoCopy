import Alerta from "@/components/Alerta";
import Loader from "@/components/Loader";
import SubirProducto from "@/components/productos/SubirProducto";
import { getFormData } from "@/lib/utils/getFormData";
import { contenidoModal } from "@/lib/utils/styles";
import { Box, Button, Card, CardActions, CardContent, Chip, Grid, Input, MenuItem, Modal, Paper, Select, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { Image } from 'mui-image'
import React, { useEffect, useState } from "react";

const Productos = () => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [productos, setProductos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const handleAlert = (msj, severidad) => {
    setMessage(msj);
    setSeverity(severidad);
    setOpen(true);
  }
  const getProductos = async () => {
    setProductos(null);
    setCargando(true);
    const res = await fetch(process.env.NODE_ENV != 'development' ? 'https://tecno-copy.vercel.app/api/productos' : '/api/productos');
    const respuesta = await res.json();
    if (respuesta.status == 'success') {
      setProductos(respuesta.data);
    }
    setCargando(false);
  }
  useEffect(() => {
    getProductos();
  }, []);
  const refresh = () => {
    setOpenAdd(false);
    getProductos();
  }
  return (
    <Box sx={{ width: '100%', p: { xs: 0 }, m: { xs: 0 }, my: { xs: 1 }, mx: 'auto', backgroundColor: 'none' }}>
      <Head>
        <title> TecnoCopy - Productos</title>
      </Head>
      <Alerta open={open} setOpen={setOpen} severity={severity} message={message} />
      <Box sx={{ mx: 2 }}>
        <Button sx={{ mb: 2 }} variant='contained' onClick={() => setOpenAdd(true)}>Agregar producto</Button>
        {cargando &&
          <Loader />
          ||
          <Grid container spacing={3}>
            {productos && productos.map((producto) => {
              return (
                <Grid item xs={12} lg={4}>
                  <Card sx={{ boxShadow: 3 }}>
                    <Image src={`/productos/${producto.image}`} alt={producto.image} />
                    <CardContent sx={{ mx: 1 }}>
                      <Grid container spacing={1}>

                        <Grid item xs={6} sx={{ display: 'flex', width: '100' }}>
                          <Typography sx={{ alignItems: 'center' }}>
                            Modelo:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', width: '100' }}>
                          <Typography fullWidth sx={{ alignItems: 'center', textAlign: 'center' }}>
                            {producto.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', width: '100' }}>
                          <Typography sx={{ alignItems: 'center' }}>
                            Precio:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', width: '100' }}>
                          <Typography fullWidth sx={{ alignItems: 'center', textAlign: 'center' }}>
                            $ {new Intl.NumberFormat('es-MX').format(producto.price)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', width: '100' }}>
                          <Typography sx={{ alignItems: 'center' }}>
                            Unidades:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', width: '100' }}>
                          <Typography fullWidth sx={{ alignItems: 'center', textAlign: 'center' }}>
                            {producto.stock}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', width: '100' }}>
                          <Typography sx={{ alignItems: 'center' }}>
                            Tipo:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', width: '100' }}>
                          <Typography fullWidth sx={{ alignItems: 'center', textAlign: 'center' }}>
                            {
                              producto.type == 'rent'
                                ? <Chip color='success' label='Renta' />
                                : <Chip color='primary' label='Venta' />
                            }
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })
            }
          </Grid>
        }

        <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
          <SubirProducto handleAlert={handleAlert} refresh={refresh} />
        </Modal>
      </Box >
    </Box>
  )
};

export default Productos;
