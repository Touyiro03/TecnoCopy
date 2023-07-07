import Buscar from "@/components/Buscar";
import EditDelete from "@/components/EditDelete";
import Tabla from "@/components/Tabla";
import Cliente from "@/components/clientes/Cliente";
import { AccountCircle, ExpandMore, Search } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Card, CardContent, Grid, InputAdornment, Modal, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [open, setOpen] = useState(false);
  const [resultado, setResultado] = useState('');
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
  // Obtener listado de clientes al abrir
  useEffect(() => {
    getClientes();

  }, []);

  // al elegir un cliente en la busqueda
  useEffect(() => {
    if (resultado && resultado._id) {
      setResultado(resultado);
      console.log(resultado);
      if (resultado != '') {
        setOpen(true); // abrir modal de vista de cliente
      }
    }
  }, [resultado])
  const handleClose = () => {
    setOpen(false);
    setResultado('');
  }
  const ModalCliente = () => {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'auto',
    };
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Cliente cliente={resultado}/>
        </Box>
      </Modal>
    )
  }

  return (
    <Box>
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
      <ModalCliente />
    </Box>
  );
};

export default clientes;
