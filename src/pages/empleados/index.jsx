import Tabla from "@/components/Tabla";
import React, { useState } from "react";
import { useEffect } from "react";

const empleados = () => {
  const [empleados, setEmpleados] = useState([]);
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

  const getEmpleados = async () => {
    const res = await fetch("/api/empleados");
    const resultado = await res.json();
    if (resultado.status == "success") {
      alert(resultado.message);
      setData(resultado.data);
    } else {
      alert(resultado.message);
    }
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  
    return (
      <div>
        <Tabla columns={columnas} data={empleados} onCellClick={(cell) => handleClick(cell)} />
      </div>
    );
};

export default empleados;
