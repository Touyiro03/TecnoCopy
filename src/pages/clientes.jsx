import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const clientes = () => {
  const [clientes, setClientes] = useState({});

  const getClientes = async () => {
    const res = await fetch("/api/clientes");
    const respuesta = await res.json();
    setClientes(respuesta.data);
  };
  // obtener clientes al montar la pagina
  useEffect(() => {
    getClientes();
  }, []);
  return (
    <div>
      {clientes.map((cliente) => (
        <Typography>{cliente.name}</Typography>
      ))}
    </div>
  );
};

export default clientes;
