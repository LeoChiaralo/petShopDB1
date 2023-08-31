// Importando Express
const express = require("express");

// Importante Dotenv
const dotenv = require("dotenv");

// Importando config do Mongoose
const connectToDataBase = require("./src/database/connect");

//Importando UserModel
const UserModel = require("./src/models/user-model");
const bodyParser = require("body-parser");

// Config Dotenv
dotenv.config();

// Chamando o Database
connectToDataBase();

// App
const app = express();

app.use(express.json());

// Configurando o BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas
app.post("/cadastrar", async (req, res) => {
  const novoUser = {
    nome: req.body.name,
    sobrenome: req.body.lastname,
    email: req.body.email,
    texto: req.body.areaTexto,
  };

  try {
    const User = await UserModel.create(novoUser);

    console.log("Formulário enviado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Porta do Servidor
const port = 8080;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}!`));
