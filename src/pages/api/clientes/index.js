import mongo from "@/lib/mongo";

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
  }
}
