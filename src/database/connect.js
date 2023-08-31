// Importando Mongoose
const mongoose = require("mongoose");

const connectToDataBase = async () => {
  await mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@petshop.jwzjur6.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(console.log("Conexão efetuada com sucesso!"))
    .catch((error) => {
      console.log("Ocorreu um erro ao realizar a conexão!Erro: ", error);
    });
};

module.exports = connectToDataBase;
