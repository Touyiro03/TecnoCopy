import mongo from "@/lib/mongo";
const { ObjectId } = require('mongodb');

export default async function dashboard(req, res) {
    //const conn = await mongo;
    const db = await mongo.db();
    const clientes = await db.collection('clientes');
}