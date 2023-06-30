import { Card, CardContent, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const clientes = () => {
  const [clientes, setClientes] = useState([]);

  const getClientes = async () => {
    const res = await fetch("/api/clientes");
    const respuesta = await res.json();
    setClientes(respuesta.data);
    console.log(respuesta.data);
  };
  // obtener clientes al montar la pagina
  useEffect(() => {
    getClientes();

  }, []);
  return (
    <Paper elevation={3} sx={{ p: 2 }}>

      {clientes.map((cliente) => (
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography>{cliente.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </Paper>
  );
};

export default clientes;
