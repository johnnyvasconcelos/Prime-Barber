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

app.listen(PORT, () => {
  console.log(`Servidor PORTA: ${PORT}`);
});
