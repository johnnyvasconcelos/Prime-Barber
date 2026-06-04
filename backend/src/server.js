import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.send("teste");
});

app.listen(PORT, () => {
  console.log(`Servidor PORTA: ${PORT}`);
});
