import mongo from "@/lib/mongo";
import multer from 'multer';
import path from 'path';
var nombre = '';
const upload = multer({
    storage: multer.diskStorage({
        destination: path.join(process.cwd(), 'public/productos'),
        filename: (_, file, callback) => {
            const extension = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            nombre = uniqueSuffix + extension;
            callback(null, `${uniqueSuffix}${extension}`);
        },
    }),
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error al subir la imagen.', status: 'error' });
            }
            const imagePath = req.file?.path;
            const db = await mongo.db();
            try {
                const productos = await db.collection('productos');
                const result = await productos.insertOne({ ...req.body, image: nombre });
                console.log(result);
                return res.status(200).json({ status: 'success', message: 'Producto guardado.', imagePath });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error al guardar el producto', status: 'error' });
            } finally {
                client.close();
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}
export const config = {
    api: {
        bodyParser: false
    }
}