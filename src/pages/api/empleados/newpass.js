import conn from '@/lib/mongo';
import hashPass from '@/lib/hashPass';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import compareHash from '@/lib/compareHash';
export default async function handler(req, res) {
    const sesion = await getServerSession(req, res, authOptions);
    const mongo = await conn;
    const db = mongo.db();
    switch (req.method) {
        case 'PUT':
            try {
                var data = JSON.parse(req.body);
                if (data.password === data.password_conf) {
                    let user = await db.collection('users').findOne({ _id: sesion.user._id });
                    let eq = await compareHash(data.prev_pass, user.password);
                    const newpass = await hashPass(data.password);
                    if (eq) {
                        let change = await db.collection('users').updateOne({ _id: sesion.user._id }, { $set: { password: newpass } });
                        if (change.modifiedCount > 0 || change.upsertedCount > 0) {
                            return res.json({ status: 'success', message: 'Contraseña actualizada correctamente' });
                        }
                    }

                } else {
                    return res.json({ status: 'error', message: 'Las contraseñas no coinciden.' })
                }
            } catch (err) {
                return res.json({ status: 'error', message: err.message });
            }
            break;
    }
}