import mongo from "@/lib/mongo";
const { ObjectId } = require('mongodb');

export default async function dashboard(req, res) {
    //const conn = await mongo;
    const db = await mongo.db();
    const clientes = await db.collection('clientes');
    switch (req.method) {
        case 'GET':
            try {
                const nuevos_clientes = await clientes.find({}).sort({ created_at: -1 }).limit(5).toArray();
                return res.json({ status: 'success', data: { clientes: [...nuevos_clientes] } });

            } catch (err) {
                return res.json({ status: 'error', message: err.message });
            }
            break;
    }
}