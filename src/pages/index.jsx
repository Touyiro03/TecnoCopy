import React, { useEffect, useState } from "react"
import { Box, Button, TextField } from "@mui/material"
import Nomrbequequiera from "@/components/ModalPersonalizado";
export default function Home() {
  const handleClick = () => {
    alert("Alert");
  }

  const [edad, setEdad] = useState();

  useEffect(() => {
    console.log(edad);
  }, [edad]);

  return (
    <Box sx={{ bgcolor: 'white', height: '100vh' }}>
      Chilaquiles con crema
      <Button variant="outlined" onClick={handleClick}>Outlined</Button>
      <Nomrbequequiera></Nomrbequequiera>
      <TextField label="Edad" onChange={(e) => { setEdad(e.target.value) }}>

      </TextField>
    </Box>
  )
}
