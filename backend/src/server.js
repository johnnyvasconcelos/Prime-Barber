import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DB from "./database/db.js";
dotenv.config();

const app = express();
app.use(cors());
// app.use(express.json());
const PORT = process.env.PORT || 3500;

app.get("/", async (req, res) => {
  try {
    const [dados] = await DB.query("SELECT * FROM agendamentos");
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/clientes", async (req, res) => {
  try {
    const [dados] = await DB.query("SELECT * FROM agendamentos");
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/clientes/cliente", async (req, res) => {
  try {
    const { nome_servico, cliente, profissional } = req.query;

    const [cortes] = await DB.query("SELECT preco FROM cortes WHERE nome = ?", [
      nome_servico,
    ]);

    if (cortes.length === 0) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }

    const preco = cortes[0].preco;

    const [resultado] = await DB.query(
      "INSERT INTO agendamentos (nome_servico, faturamento, cliente, profissional) VALUES (?, ?, ?, ?)",
      [nome_servico, preco, cliente, profissional],
    );
    res.json(resultado);
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
    const [dados] = await DB.query(
      "INSERT INTO cortes (nome, preco) VALUES (?, ?)",
      [req.query.nome, req.query.preco],
    );
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/servicos/deletar", async (req, res) => {
  try {
    const [dados] = await DB.query("DELETE FROM cortes WHERE id = ?", [
      req.query.id,
    ]);
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/servicos/editar", async (req, res) => {
  try {
    const [dados] = await DB.query(
      "UPDATE cortes SET nome = ?, preco = ? WHERE id = ?",
      [req.query.nome, req.query.preco, req.query.id],
    );
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/barbearia", async (req, res) => {
  try {
    const [dados] = await DB.query("SELECT * FROM barbearia");
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/bancos", async (req, res) => {
  try {
    const [dados] = await DB.query("SELECT * FROM bancos");
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/paypal", async (req, res) => {
  try {
    const [dados] = await DB.query("SELECT * FROM paypal");
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor PORTA: ${PORT}`);
});
