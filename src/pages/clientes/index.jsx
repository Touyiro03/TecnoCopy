import Buscar from "@/components/Buscar";
import EditDelete from "@/components/EditDelete";
import Tabla from "@/components/Tabla";
import { AccountCircle, ExpandMore, Search } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Card, CardContent, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [abierto, setAbierto] = useState(0);
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
    else {
      alert(respuesta);
    }
    //console.log(respuesta.data);
  };
  // obtener clientes al montar la pagina
  useEffect(() => {
    getClientes();

  }, []);
  const handleChange = (panel, contacto) => (event, exp) => {
    setAbierto(exp ? panel : false);
  };

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

      {/*
      <Grid container rowSpacing={1} columnSpacing={2}>
        {
          clientes.map((cliente) => (
            <Grid item xs={12} lg={4}>
              <Card sx={{ boxShadow: 3, borderRadius: 3, '&:hover': { bgcolor: '#f5f5f5' } }}>
                <Accordion expanded={abierto === cliente._id} onChange={handleChange(cliente._id, cliente)}>
                  <AccordionSummary expandIcon={<ExpandMore />} sx={{ width: '100%' }}>
                    <AccountCircle />
                    <Typography>{cliente.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {cliente.email &&
                      <Box sx={{ display: 'flex', my: 1 }} xs={12}>
                        <Typography sx={{ mr: 2, fontWeight: 500, width: '25%' }}>Correo: </Typography>
                        <Typography>{cliente.email ?? '—'}</Typography>
                      </Box>
                    }
                    <EditDelete openEdit={setOpenEdit} openDelete={setOpenDelete} />
                  </AccordionDetails>
                </Accordion>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      */}
    </Paper>
  );
};

export default clientes;
