import mongo from "@/lib/mongo";
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
export default async function perfil(req, res) {
    //const conn = await mongo;
    const sesion = await getServerSession(req, res, authOptions);
    const db = await mongo.db();
    const users = await db.collection('users');
    switch (req.method) {
        case 'GET':
            try {
                const user = await users.findOne({ name: sesion.user.name });
                return res.json({ status: 'success', data: user });
            } catch (err) {
                return res.json({ status: 'error', message: err.message });
            }
            break;
    }
}