import mongo from "@/lib/mongo";
const { ObjectId } = require("mongodb");
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    destination: './public/productos/', // Directorio donde se guardarán las imágenes
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${uuidv4()}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }
    const db = await mongo.db();
    const productos = await db.collection('productos');
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error('Error al subir la imagen:', err);
            return res.status(500).json({ message: 'Error al subir la imagen' });
        }
        const { name, description, price, type, stock } = req.body;
        const image = req.file.path.replace('public', '');
        try {
            const producto = {
                name,
                description,
                price: parseFloat(price),
                type,
                stock: parseInt(stock),
                image,
            };
            productos.insertOne(producto);

            return res.status(200).json({
                message: 'Producto guardado con éxito',
                ...producto,
            });
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            return res.status(500).json({ message: 'Error al guardar el producto' });
        }


    });
}
export const config = {
    api: {
        bodyParser: false
    }
}