import mongo from "@/lib/mongo";
import { Message } from "@mui/icons-material";
const { ObjectId } = require("mongodb");

export default async function handleEmpleadosapi(req, res) {
  //const conn = await mongo;
  const db = await mongo.db();
  const users = await db.collection('users');
  switch (req.method) {
    case "GET":
      //obtener todos los registros
      try {
        let data;
        //const usuarios = db.collection("users").find({}).toArray();
        // return res
        // .status(200)
        // .json({
        //     status: "success",
        //     message: "Usuarios encontrados",
        //     data: usuarios,
        //   });
        data = await users.find({}).toArray();


        return res.status(200).json({ status: 'success', message: 'empleados encontrados', data: data });
      } catch (err) {
        return res.status(400).json({ status: "error", message: "Error: " + err.message });
      }
      break;
    case "POST":
      try {
        var data = JSON.parse(req.body);
        if (Object(data).hasOwn("address1")) {
          let address = `${data.address1} | ${data.address2} | ${data.address3}`;
          data.address = address;
        }
        var cliente = await users.insertOne({ ...data, created_at: new Date() });
        if (cliente.insertedCount > 0) {
          return res.json({ status: 'success', message: 'Empleado creado exitosamente.' });
        }
      } catch (err) {
        return res.status(400).json({ status: 'error', message: err });
      }
      break;
  }
}
