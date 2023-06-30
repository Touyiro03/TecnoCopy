import mongo from "@/lib/mongo";

export default async function handleClientesApi(req, res) {
  const conn = await mongo;
  const db = await conn.db();
  switch (req.method) {
    case "GET":
      try {
        const clientes = await db.collection("clientes").find({}).toArray();
        console.log(clientes);
        return res.status(200).json({ status: 'success', message: 'clientes encontrados', data: clientes });

      } catch (err) {
        return res.send(err);
      }
  }
}
