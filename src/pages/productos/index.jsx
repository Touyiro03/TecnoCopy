import Alerta from "@/components/Alerta";
import SubirProducto from "@/components/productos/SubirProducto";
import { getFormData } from "@/lib/utils/getFormData";
import { contenidoModal } from "@/lib/utils/styles";
import { Box, Button, Card, CardActions, CardContent, Grid, Input, MenuItem, Paper, Select, TextField } from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";

const Productos = () => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const handleAlert = (msj, severidad) => {
    setMessage(msj);
    setSeverity(severidad);
    setOpen(true);
  }
  return (
    <Box>
      <Head>
        <title> TecnoCopy - Productos</title>
      </Head>
      <Alerta open={open} setOpen={setOpen} severity={severity} message={message} />
      <Box elevation={0} sx={{ width: '100%', p: 2, m: 2, backgroundColor: 'none' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SubirProducto handleAlert={handleAlert} />
          </Grid>
        </Grid>
      </Box >
    </Box>
  )
};

export default Productos;
