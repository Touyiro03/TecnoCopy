import hashPass from "@/lib/hashPass";
import mongo from "@/lib/mongo";
const { ObjectId } = require("mongodb");

const handleEmpleados = async (req, res) => {
    switch (req.method) {
        case "GET":
            try {
                const productos = await mongo.db().collection("productos").find({}).toArray();
                return res.json({ status: 'success', data: productos });
            } catch (error) {
                return res.json({ status: 'error', message: error.message });
            }
            break;
    }
}
export default handleEmpleados;