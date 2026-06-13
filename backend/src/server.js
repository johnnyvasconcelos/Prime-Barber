import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DB from "./database/db.js";
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3500;

app.get("/", async (req, res) => {
  try {
    const [dados] = await DB.query("SELECT * FROM agendamentos");
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/servicos", async (req, res) => {
  try {
    const [dados] = await DB.query("SELECT * FROM cortes");
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/servicos/item", async (req, res) => {
  try {
    const [dados] = await DB.query("INSERT INTO cortes VALUES (?)");
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor PORTA: ${PORT}`);
});
