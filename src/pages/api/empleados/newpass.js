import conn from '@/lib/mongo';
import hashPass from '@/lib/hashPass';

export default async function handler(req, res) {
    const mongo = await conn;
    const db = mongo.db();
    switch (req.method) {
        case 'PUT':
            try {
                var data = JSON.parse(req.body);

            } catch (err) {
                return res.json({ status: 'error', message: err.message });
            }
            break;
    }
}