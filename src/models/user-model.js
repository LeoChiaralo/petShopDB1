// Importando Mongoose
const mongoose = require("mongoose");

// Criando um Schema
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
});

// Declarando Model
const UserModel = mongoose.model("User", userSchema);

// Exportando Módulo
module.exports = UserModel;
