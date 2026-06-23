import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DB from "./database/db.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
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

app.get("/cl", async (req, res) => {
  try {
    const [dados] = await DB.query("SELECT * FROM clientes");
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

app.put("/clientes/status", async (req, res) => {
  try {
    const { id, atendido } = req.query;
    const novoStatus = Number(atendido);

    const [agendamento] = await DB.query(
      "SELECT atendido, faturamento FROM agendamentos WHERE id = ?",
      [id],
    );

    if (agendamento.length > 0) {
      const statusAtual = agendamento[0].atendido;
      const valor = agendamento[0].faturamento;

      if (statusAtual === 0 && novoStatus === 1) {
        await DB.query("UPDATE barbearia SET saldo = saldo + ?", [valor]);
        await DB.query("INSERT INTO historico (entrada, saida) VALUES (?, 0)", [
          valor,
        ]);
      } else if (statusAtual === 1 && novoStatus === 0) {
        await DB.query("UPDATE barbearia SET saldo = saldo - ?", [valor]);
        await DB.query("INSERT INTO historico (entrada, saida) VALUES (0, ?)", [
          valor,
        ]);
      }
    }

    const [dados] = await DB.query(
      "UPDATE agendamentos SET atendido = ? WHERE id = ?",
      [novoStatus, id],
    );
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

app.get("/paypal/item", async (req, res) => {
  try {
    const [dados] = await DB.query(
      "INSERT INTO paypal (id, email) VALUES (1, ?) ON DUPLICATE KEY UPDATE email = ?",
      [req.query.email, req.query.email],
    );
    res.json(dados);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/banco/item", async (req, res) => {
  try {
    const [dados] = await DB.query(
      "INSERT INTO bancos (id, nome, conta, agencia) VALUES (1, ?, ?, ?) ON DUPLICATE KEY UPDATE nome = ?, conta = ?, agencia = ?",
      [
        req.query.nome,
        req.query.conta,
        req.query.agencia,
        req.query.nome,
        req.query.conta,
        req.query.agencia,
      ],
    );
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/bancos/deletar", async (req, res) => {
  try {
    const [dados] = await DB.query("DELETE FROM bancos WHERE id = 1", [
      req.query.id,
    ]);
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/paypal/deletar", async (req, res) => {
  try {
    const [dados] = await DB.query("DELETE FROM paypal WHERE id = 1", [
      req.query.id,
    ]);
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/dinheiro", async (req, res) => {
  try {
    const [dados] = await DB.query("SELECT saldo FROM barbearia");
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/dinheiro/adicionar", async (req, res) => {
  try {
    const quantidade = Number(req.body.quantidade);

    if (isNaN(quantidade)) {
      return res.status(400).json({ error: "Quantidade inválida" });
    }

    await DB.query("UPDATE barbearia SET saldo = saldo + ?", [quantidade]);
    await DB.query("INSERT INTO historico (entrada, saida) VALUES (?, 0)", [
      quantidade,
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/dinheiro/retirar", async (req, res) => {
  try {
    const quantidade = Number(req.body.quantidade);

    if (isNaN(quantidade)) {
      return res.status(400).json({ error: "Quantidade inválida" });
    }

    await DB.query("UPDATE barbearia SET saldo = saldo - ?", [quantidade]);
    await DB.query("INSERT INTO historico (entrada, saida) VALUES (0, ?)", [
      quantidade,
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/historico", async (req, res) => {
  try {
    const [transacoes] = await DB.query(
      "SELECT * FROM historico ORDER BY data DESC",
    );

    const [totais] = await DB.query(
      "SELECT SUM(entrada) AS total_entradas, SUM(saida) AS total_saidas FROM historico",
    );

    res.json({
      transacoes,
      total_entradas: totais[0].total_entradas || 0,
      total_saidas: totais[0].total_saidas || 0,
      saldo_historico:
        (totais[0].total_entradas || 0) - (totais[0].total_saidas || 0),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/historico-itens", async (req, res) => {
  try {
    const [dados] = await DB.query("SELECT * FROM historico");
    res.json(dados);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/historico/soma", async (req, res) => {
  try {
    const [dados] = await DB.query(
      "SELECT SUM(entrada) AS total_entradas, SUM(saida) AS total_saidas FROM historico",
    );
    res.json(dados[0] || { total_entradas: 0, total_saidas: 0 });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/search", async (req, res) => {
  try {
    const termo = `%${req.query.q || ""}%`;
    const query =
      "SELECT id, cliente AS nome, nome_servico AS servico, faturamento FROM agendamentos WHERE cliente LIKE ? OR nome_servico LIKE ?";
    const [results] = await DB.query(query, [termo, termo]);
    res.json(results);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor PORTA: ${PORT}`);
});
