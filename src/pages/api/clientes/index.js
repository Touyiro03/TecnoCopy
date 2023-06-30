import mongo from "@/lib/mongo";

export default async function handleClientesApi(req, res) {
  const conn = await mongo;
  const db = mongo.db();
  switch (req.method) {
    case "GET":
      try {
        const clientes = await db.collection("clientes").findMany({});
        return res.status(200).json({status: 'success', message: 'clientes encontrados', data: clientes});
      } catch (err) {
        return res.send(err);
      }
  }
}
