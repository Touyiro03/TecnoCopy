import Alerta from "@/components/Alerta";
import Loader from "@/components/Loader";
import Tabla from "@/components/Tabla";
import AddEmpleado from "@/components/empleados/AddEmpleado";
import Empleado from "@/components/empleados/Empleado";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";

const empleados = () => {
  const [sesion, setSesion] = useState(null);
  const router = useRouter();
  const [empleados, setEmpleados] = useState([]);
  const [alert, setAlert] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [severidad, setSeveridad] = useState('error');
  const [cargando, setCargando] = useState(true);
  const [seleccion, setSeleccion] = useState(null);
  const [openEmpleado, setOpenEmpleado] = useState(false);
  const columnas = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Correo",
      flex: 1,
      cellClassName: "",
    },
    {
      field: "rfc",
      headerName: "RFC",
      width: 150,
      cellClassName: "",
    },
    {
      field: "ultima_hora_entrada", // Este dato seria traido del checador de entrada
      headerName: "Hora de entrada",
      flex: 1,
    }
  ];
  const handleAlert = (msj, severidad) => {
    setMensaje(msj);
    setSeveridad(severidad);
    setAlert(true);
  }
  const getEmpleados = async () => {
    const res = await fetch(process.env.NODE_ENV != 'development' ? "https://tecno-copy.vercel.app/api/empleados" : "/api/empleados");
    const resultado = await res.json();
    if (resultado.status == "success") {
      setEmpleados(resultado.data);
      setCargando(false);
    }
  };

  useEffect(() => {
    const inicio = async () => {
      setSesion(await getSession());
      getEmpleados();
    }
    inicio();
  }, []);
  useEffect(() => {
    if (sesion != null && sesion.user.role != 'admin' && sesion.user.role != 'gerente' && sesion.user.role != 'supervisor') {
      router.push('/');
    }
  }, [sesion])
  const refresh = () => {
    setCargando(true);
    getEmpleados();
    setOpenAdd(false);
    setOpenEmpleado(false);
  }

  const handleClick = (cell) => {
    if (cell.row._id && cell.row.name) {
      setSeleccion(cell.row);
      setOpenEmpleado(true);
    }
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
            Empleados
          </Typography>
          <Tabla columns={columnas} data={empleados} onCellClick={(cell) => handleClick(cell)}
            toolbar={
              <Button variant='outlined' onClick={() => setOpenAdd(true)} sx={{ width: { xs: '100%', lg: '15%' } }}>Agregar empleado</Button>
            }
          />
          <Modal open={openAdd} onClose={() => setOpenAdd(false)} sx={{ overflowY: 'scroll' }}>
            <AddEmpleado sesion={sesion} handleAlert={handleAlert} handleClose={refresh} setOpen={() => setOpenAdd(false)} />
          </Modal>
          <Modal open={openEmpleado} onClose={() => setOpenEmpleado(false)} sx={{ overflowY: 'scroll' }} >
            <Empleado empleado={seleccion} handleAlert={handleAlert} handleClose={refresh} setOpen={() => setOpenEmpleado(false)} />
          </Modal>
        </Paper>
        :
        <Loader />
      }
    </Box>
  );
};

export default empleados;
