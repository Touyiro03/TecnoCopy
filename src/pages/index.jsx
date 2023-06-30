import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
export default function Home() {
  return (
    <Grid 
      container
      spacing={3}
      sx={{ p: 3 }}
    >
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Clientes" />
          <CardContent>🕗 Pendiente</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Empleados" />
          <CardContent>🕗 Pendiente</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Ventas" />
          <CardContent>🕗 Pendiente</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Productos" />
          <CardContent>🕗 Pendiente</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Servicios" />
          <CardContent>🕗 Pendiente</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
          <CardHeader title="Rentas" />
          <CardContent>🕗 Pendiente</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
