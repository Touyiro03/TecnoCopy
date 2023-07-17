import Tabla from "@/components/Tabla";
import Cliente from "@/components/clientes/Cliente";
import { Box, Button, Grid, Modal, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Alerta from "@/components/Alerta";
import AddCliente from "@/components/clientes/AddCliente";
import Head from "next/head";
import { fechaTabla, formatoFecha } from "@/lib/utils/date";
import Loader from "@/components/Loader";
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
      field: 'address', headerName: 'Dirección', flex: 1, valueFormatter: (cell) => {
        if (cell.value.indexOf('|')) {
          return cell.value.split(' |').join(' ').trim();
        }
      }
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
  useEffect(() => {
    getClientes();
  }, []);

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
        <Box sx={{ ...style, width: { lg: '40%', xs: '90%' } }}>
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
          <Typography variant="h5" width={"33%"}>
            Clientes
          </Typography>
          <Tabla columns={columnas} data={clientes} onCellClick={(cell) => handleClick(cell)}
            toolbar={
              <Button variant='outlined' onClick={() => setOpenAdd(true)} sx={{ width: { xs: '100%', lg: '15%' } }}>Agregar cliente</Button>
            }
          />
          <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
            <AddCliente handleAlert={handleAlert} handleClose={refresh} setOpen={() => setOpenAdd(false)} />
          </Modal>
        </Paper>
        :
        <Loader />
      }
      <ModalCliente />
    </Box>
  );
};

export default clientes;
