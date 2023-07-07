import Buscar from "@/components/Buscar";
import EditDelete from "@/components/EditDelete";
import Tabla from "@/components/Tabla";
import { AccountCircle, ExpandMore, Search } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Card, CardContent, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [abierto, setAbierto] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [resultado, setResultado] = useState();
  const columnas = [
    {
      field: 'name', headerName: 'Nombre', width: 250, cellClassName: '', renderCell: (cell) => (
        <Box sx={{ display: 'flex' }}>
          <Typography width='80%' textAlign='center'>{cell.value}</Typography>

        </Box>
      )
    },
    {
      field: 'email', headerName: 'Correo', flex: 1, cellClassName: ''
    },
    {
      field: 'address', headerName: 'Dirección', flex: 1, cellClassName: ''
    },
    {
      field: 'rfc', headerName: 'RFC', width: 150, cellClassName: ''
    }

  ]
  const getClientes = async () => {
    const res = await fetch("/api/clientes");
    const respuesta = await res.json();
    if (respuesta.status == 'success') {
      setClientes(respuesta.data);
    }
  };

  useEffect(() => {
    getClientes();

  }, []);

  // al elegir un cliente en la busqueda
  useEffect(() => {
    if (resultado && resultado._id) {
      setResultado(resultado);
      console.log(resultado);
      setOpenEdit(true);
    }
  }, [resultado])

  return (
    <Paper elevation={20} sx={{ p: 2, m: 2 }}>
      <Grid container sx={{ pb: 3 }}>
        <Grid item lg={4}>
          <Typography variant="h4" width={"33%"}>Clientes</Typography>
        </Grid>
        <Grid item lg></Grid>
        {/* Barra de busqueda */}
        <Grid lg={4} xs={12}>
          <Buscar data={clientes} onSelect={setResultado} />
        </Grid>
      </Grid>
      <Tabla columns={columnas} data={clientes} />
    </Paper>
  );
};

export default clientes;
