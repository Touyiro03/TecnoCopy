import mongo from "@/lib/mongo";
const { ObjectId } = require('mongodb');

export default async function handleClientesApi(req, res) {
  //const conn = await mongo;
  const db = await mongo.db();
  const clientes = await db.collection('clientes');
  switch (req.method) {
    case "GET":
      try {
        let data;
        // if (req.query.search) {
        //   clientes = await db.collection("clientes").find({ "$or": [{ "name": /req.query.search/ }, { "email": /req.query.search/ }] }).toArray();
        // } else {
        data = await clientes.find({}).toArray();
        // }
        //conn.close();
        return res.status(200).json({ status: 'success', message: 'clientes encontrados', data: data });

      } catch (err) {
        //conn.close();
        return res.status(400).json({ status: 'error', message: err });
      }
      break;
    case "POST":
      break;
    case "PUT":
      var data = JSON.parse(req.body);
      var id = ObjectId(data.id);
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
      }
      break;
    case 'DELETE':
      var data = JSON.parse(req.body);
      try{
        let deleted = await clientes.delete({_id: data.id_cliente});
        return res.status(200).json({status: 'success', message: 'Cliente eliminado.', data: deleted});
      }catch(err){
        return res.status(400).json({ status: 'error', message: err.message });
      }
  }
}