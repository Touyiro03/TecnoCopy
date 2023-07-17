import Buscar from "@/components/Buscar";
import EditDelete from "@/components/EditDelete";
import Tabla from "@/components/Tabla";
import Cliente from "@/components/clientes/Cliente";
import { AccountCircle, ExpandMore, Search } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Card, CardContent, Grid, InputAdornment, Modal, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Alerta from "@/components/Alerta";
import { SyncLoader } from 'react-spinners';
import AddCliente from "@/components/clientes/AddCliente";
import Head from "next/head";
import { fechaTabla, formatoFecha } from "@/lib/utils/date";
const clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [resultado, setResultado] = useState('');
  const [alert, setAlert] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [severidad, setSeveridad] = useState('error');
  const [cargando, setCargando] = useState(false);
  const columnas = [
    {
      field: 'name', headerName: 'Nombre', width: 250, cellClassName: '', renderCell: (cell) => (
        <Box sx={{ display: 'flex' }}>
          <Typography width='80%' textAlign='center'>{cell.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'email', headerName: 'Correo', flex: 1, cellClassName: ''
    },
    {
      field: 'address', headerName: 'Dirección', flex: 1, cellClassName: ''
    },
    {
      field: 'rfc', headerName: 'RFC', width: 150, cellClassName: ''
    },
    {
      field: 'created_at', headerName: 'Creación', width: 150,
      valueFormatter: (cell) => {
        //   if (cell.value.split('').includes('/')) {
        //     return cell.value.split('/').reverse().join('-');
        //   } else {
        //     return cell.value;
        //   }
        return fechaTabla(cell.value);
      }
    }

  ]
  const getClientes = async () => {
    const res = await fetch(process.env.NODE_ENV != 'development' ? "https://tecno-copy.vercel.app/api/clientes" : "/api/clientes");
    const respuesta = await res.json();
    if (respuesta.status == 'success') {
      setClientes(respuesta.data);
      setCargando(false);
    }
  };
  const handleAlert = (msj, severidad) => {
    setMensaje(msj);
    setSeveridad(severidad);
    setAlert(true);
  }
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
  }, [resultado]);
  const handleClick = (cell) => {
    setResultado(cell.row);
  }
  const handleClose = () => {
    setOpen(false);
    setResultado('');
  }

  const refresh = async () => {
    setOpenAdd(false);
    setOpen(false);
    setCargando(true);
    await getClientes();

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
          <Cliente
            cliente={resultado}
            refresh={refresh}
            handleAlert={handleAlert}
            setResultado={setResultado}
          />
        </Box>
      </Modal>
    )
  }

  return (
    <Box>
      <Head>
        <title>TecnoCopy - Clientes</title>
      </Head>
      <Alerta message={mensaje} severity={severidad} open={alert} setOpen={setAlert} />
      {!cargando ?

        <Paper elevation={4} sx={{ p: 2, m: 2 }}>
          <Grid container sx={{}}>
            <Grid item lg={4}>
              <Typography variant="h5" width={"33%"}>Clientes</Typography>
            </Grid>
            <Grid item lg></Grid>
            {/* Barra de busqueda */}
            {/* <Grid lg={4} xs={12}>
            <Buscar data={clientes} onSelect={setResultado} />
          </Grid> */}
          </Grid>
          <Tabla columns={columnas} data={clientes} onCellClick={(cell) => handleClick(cell)}
            toolbar={
              <Button variant='outlined' onClick={() => setOpenAdd(true)}>Agregar cliente</Button>
            }
          />
          <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
            <AddCliente handleAlert={handleAlert} handleClose={refresh} setOpen={() => setOpenAdd(false)} />
          </Modal>
        </Paper>
        :
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: 5 }}>
          <SyncLoader loading={true} size={30} color="#32baff" aria-label="Loading Spinner" data-testid="loader" />
        </Box>
      }
      <ModalCliente />
    </Box>
  );
};

export default clientes;
