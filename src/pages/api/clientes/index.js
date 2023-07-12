import mongo from "@/lib/mongo";
const { ObjectId } = require('mongodb');

export default async function handleClientesApi(req, res) {
  const conn = await mongo;
  const db = await conn.db();
  const clientes = await db.collection('clientes');
  switch (req.method) {
    case "GET":
      try {
        let data;
        // if (req.query.search) {
        //   clientes = await db.collection("clientes").find({ "$or": [{ "name": /req.query.search/ }, { "email": /req.query.search/ }] }).toArray();
        // } else {
        data = await db.collection("clientes").find({}).toArray();
        // }
        conn.close();
        return res.status(200).json({ status: 'success', message: 'clientes encontrados', data: data });

      } catch (err) {
        conn.
          close();
        return res.status(400).json({ status: 'error', message: err });
      } finally {
        // Increase the retry time value to 30 seconds.
        await conn.on('error', (err) => {
          if (err.message.includes('Topology was destroyed')) {
            console.log('Topology was destroyed, retrying...');
            setTimeout(() => {
              conn.reconnect();
            }, 30000);
          }
        });
      }
      break;
    case "POST":
      break;
    case "PUT":
      const data = JSON.parse(req.body);
      const id = ObjectId(data.id);
      try {
        let cliente = await clientes.updateOne(
          {
            _id: id
          },
          {
            $set: {
              name: data.name,
              address: data.address,
              rfc: data.rfc,
              email: data.email
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
      } finally {
        await conn.close();
      }
      break;
  }
}