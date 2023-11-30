const { connection } = require('./dataBase/connection');
require("dotenv").config();
const express = require('express');
const cors = require("cors");

connection();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const auth = require('./routes/auth');
app.use("/api/auth", auth);

const baseUrl = process.env.BASE_URL;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${baseUrl}`);
});
