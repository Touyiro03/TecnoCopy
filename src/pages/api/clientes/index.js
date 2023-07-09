import mongo from "@/lib/mongo";
const { ObjectId } = require('mongodb');

export default async function handleClientesApi(req, res) {
  const conn = await mongo;
  const db = await conn.db();
  switch (req.method) {
    case "GET":
      try {
        let clientes;
        // if (req.query.search) {
        //   clientes = await db.collection("clientes").find({ "$or": [{ "name": /req.query.search/ }, { "email": /req.query.search/ }] }).toArray();
        // } else {
        clientes = await db.collection("clientes").find({}).toArray();
        // }
        conn.close();
        return res.status(200).json({ status: 'success', message: 'clientes encontrados', data: clientes });

      } catch (err) {
        conn.
          close();
        return res.status(400).json({ status: 'error', message: err });
      }
      break;
    case "POST":
      break;
    case "PUT":
      const data = JSON.parse(req.body);
      const id = data.id;
      try {
        let cliente = await db.collection("clientes").updateOne(
          {
            _id: ObjectId(id)
          }, {
          $set: {

            name: data.name,
            address: data.address,
            rfc: data.rfc,
            email: data.email
          }
        });
        if (cliente.modifiedCount === 1) {
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
