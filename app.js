// Importando Dotenv
const dotenv = require("dotenv");

// Importando Database
const connectToDatabase = require("./src/database/connect");

dotenv.config();

connectToDatabase();

// Importando express.js
require("./modules/express");

require("./modules/body-parser");
