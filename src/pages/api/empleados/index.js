import hashPass from "@/lib/hashPass";
import mongo from "@/lib/mongo";
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
        data = await users.find({}).sort({ created_at: -1 }).toArray();
        return res.status(200).json({ status: 'success', message: 'empleados encontrados', data: data });
      } catch (err) {
        return res.status(400).json({ status: "error", message: "Error: " + err.message });
      }
      break;
    case "POST":
      try {
        var data = JSON.parse(req.body);
        var exists = await users.find({ name: data.name }).toArray();
        if (exists.length > 0) {
          return res.json({ status: 'error', message: 'Ya existe un usuario con este nombre' });
        }
        exists = await users.find({ email: data.email }).toArray();
        if (exists.length > 0) {
          return res.json({ status: 'error', message: 'Ya existe un usuario con este correo' });
        }
        let address = `${data.address1} | ${data.address2} | ${data.address3}`;
        data.address = address;
        delete data.address1;
        delete data.address2;
        delete data.address3;
        data.password = await hashPass(data.password);
        var empleado = await users.insertOne({ ...data, created_at: new Date() });
        if (empleado.insertedCount > 0) {
          return res.json({ status: 'success', message: 'Empleado creado exitosamente.' });
        }
      } catch (err) {
        return res.status(400).json({ status: 'error', message: err });
      }
      break;
    case "PUT":
      try {
        var data = JSON.parse(req.body);
        var id = ObjectId(data.id);
        let address = `${data.address1} | ${data.address2} | ${data.address3}`;
        data.address = address;
        let cliente = await users.updateOne(
          {
            _id: id
          },
          {
            $set: {
              name: data.name,
              address: data.address,
              rfc: data.rfc,
              email: data.email,
              updated_at: new Date()
            }
          },
          {
            upsert: true
          }
        );
        if (cliente.modifiedCount === 1 || cliente.matchedCount === 1) {
          return res.status(200).json({ status: 'success', message: 'Cliente actualizado correctamente' });
        } else {
          return res.status(400).json({ status: 'error', message: 'Error al acutalizar los datos del cliente' });
        }

      } catch (err) {
        return res.status(400).json({ status: 'error', message: err.message });
      }
      break;
  }
}
