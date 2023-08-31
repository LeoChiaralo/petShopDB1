//Importando Express
const express = require("express");

//Importando Models
const UserModel = require("../src/models/user-model");

// Importando BodyParser
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/home", (req, res) => {
  res.status(200).send("<h1>hello world</h1>");
});

app.post("/users", async (req, res) => {
  const novoUser = {
    nome: req.body.name,
    sobrenome: req.body.lastname,
    email: req.body.email,
    texto: req.body.areaTexto,
  };

  try {
    const user = UserModel.create(novoUser);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 8080;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}!`));
