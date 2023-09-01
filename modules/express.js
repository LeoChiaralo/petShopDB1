//Importando Express
const express = require("express");

//Importando Models
const UserModel = require("../src/models/user-model");

// Importando BodyParser
const bodyParser = require("body-parser");

// Importando Nodemailer
const nodemailer = require("nodemailer");

// Importando Yup
const yup = require("yup");

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static(__dirname + "/../public"));

app.post("/users", async (req, res) => {
  const schema = yup.object().shape({
    nome: yup
      .string("Preencha o campo nome!")
      .required("Preencha o campo nome!"),
    telefone: yup
      .string("Preencha o campo telefone!")
      .required("Preencha o campo telefone!"),
    email: yup
      .string("Preencha o campo e-mail")
      .required("Preencha o campo e-mail!")
      .email("Preencha o campo com um e-mail válido!"),
    texto: yup
      .string("Preencha o campo de texto!")
      .required("Preencha o campo de texto!")
      .min(10, "O campo precisar ter no mínimo 10 caracteres!"),
  });

  const novoUser = {
    nome: req.body.name,
    telefone: req.body.tel,
    email: req.body.email,
    texto: req.body.areaTexto,
  };

  try {
    await schema.validate(novoUser);

    const user = UserModel.create(novoUser);

    const transport = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "leonardochiaralo@hotmail.com",
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    transport.sendMail({
      from: "PETisco <leonardochiaralo@hotmail.com>",
      to: req.body.email,
      subject: "Confirmação de form",
      text: "Olá, PETlover! Formulário enviado com sucesso. Agradecemos pela sua atenção!!",
    });

    res.render("confirm");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 8080;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}!`));
