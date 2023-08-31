//Importando Express
const express = require("express");

//Importando Models
const UserModel = require("../src/models/user-model");

// Importando BodyParser
const bodyParser = require("body-parser");

// Importando Nodemailer
const nodemailer = require("nodemailer");

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

    const transport = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "petisco@hotmail.com",
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    transport.sendMail({
      from: "PETisco <petisco@hotmail.com>",
      to: req.body.email,
      subject: "Confirmação de form",
      text: "Olá, Petlover! Formulário enviado com sucesso. Agradecemos pela sua atenção!!",
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 8080;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}!`));
