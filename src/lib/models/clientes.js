// clientes.js
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: String,
  address: String,
  rfc: String,
  email: String,
});

var Clientes;
try {
  Clientes = mongoose.model("Clientes", clientSchema);
} catch (e) {
  Clientes = mongoose.model("Clientes");
}

export { Clientes };