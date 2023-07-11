import Tabla from "@/components/Tabla";
import React, { useState } from "react";
import { useEffect } from "react";

const empleados = () => {
  const columnas = [
    {
      field: "user",
      headerName: "Nombre",
      width: 250,
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
  ];
  const [data, setData] = useState([]);

  const getUsuarios = async () => {
    const res = await fetch("/api/empleados");
    const resultado = await res.json();
    if (resultado.status === "success") {
      alert(resultado.message);
      setData(resultado.data);
    } else {
      alert(resultado.message);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  
    return (
      <div>
        <Tabla columns={columnas} data={data} />
      </div>
    );
};

export default empleados;
