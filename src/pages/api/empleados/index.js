import mongo from "@/lib/mongo";
import { Message } from "@mui/icons-material";
const { ObjectId } = require("mongodb");

export default async function empleados(req, res) {
  const conn = await mongo;
  const db = await conn.db();
  switch (req.method) {
    case "GET":
      //obtener todos los registros
      try{

          const usuarios = db.collection("users").find({}).toArray();
          return res
          .status(200)
          .json({
              status: "success",
              message: "Usuarios encontrados",
              data: usuarios,
            });
        }catch(err){
            return res.status(400).json({status: "error", message: "Error: " + err.message});
        }
  }
}
