import conn from '@/lib/mongo';
import hashPass from '@/lib/hashPass';

export default async function handler(req, res) {
    // if (req.method !== 'POST') {
    //     res.status(405).json({ message: 'Method Not Allowed' });
    //     return;
    // }
    // const { nombre, email, contraseña } = req.body;
    // // Validar los campos requeridos (nombre, email, contraseña)
    // if (!nombre || !email || !contraseña) {
    //     res.status(400).json({ message: 'Faltan campos requeridos' });
    //     return;
    // }
    // Conectarse a la base de datos
    const mongo = await conn;
    const db = mongo.db();
    var name = 'admin';
    var email = 'admin@example.com';
    var password = await hashPass('admin');
    // Insertar el usuario en la colección "usuarios"
    const result = await db.collection('users').insertOne({
        name,
        email,
        password
    });

    res.status(201).json({ message: result });

}
