import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCut, FaTimes } from "react-icons/fa";

const ServicesPage = () => {
  const [modal, setModal] = useState(false);
  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editaId, setEditaId] = useState(null);

  const carregar = () => {
    fetch("http://192.168.1.2:3500/servicos")
      .then((resposta) => resposta.json())
      .then((dados2) => {
        setDados(dados2);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    carregar();
  }, []);

  async function enviar() {
    try {
      const url = editaId
        ? `http://192.168.1.2:3500/servicos/editar?id=${editaId}&nome=${nome}&preco=${preco}`
        : `http://192.168.1.2:3500/servicos/item?nome=${nome}&preco=${preco}`;

      const response = await fetch(url);

      if (!response.ok) {
        alert("Erro ao salvar.");
      } else {
        fechaModal();
        carregar();
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  const dadosTabela = [];

  async function remover(id) {
    if (confirm("Remover o serviço?")) {
      try {
        const response = await fetch(
          `http://192.168.1.2:3500/servicos/deletar?id=${id}`,
        );
        if (response.ok) {
          carregar();
        } else {
          alert("Erro ao remover.");
        }
      } catch (error) {
        console.error("Erro ao remover:", error);
      }
    }
  }

  function editar(servico) {
    setEditaId(servico.id);
    setNome(servico.nome);
    setPreco(servico.preco);
    setModal(true);
  }

  function fechaModal() {
    setModal(false);
    setEditaId(null);
    setNome("");
    setPreco("");
  }

  if (dados.length > 0) {
    for (let i = 0; i < dados.length; i++) {
      dadosTabela.push(
        <tr key={dados[i].id}>
          <td>{dados[i].nome}</td>
          <td>R$ {dados[i].preco}</td>
          <td className="editar btn" onClick={() => editar(dados[i])}>
            <span>
              <FaEdit />
            </span>
          </td>
          <td className="remover btn" onClick={() => remover(dados[i].id)}>
            <span>
              <FaTrash />
            </span>
          </td>
        </tr>,
      );
    }
  }
  return (
    <section className="content__cuts">
      <div className="content__container">
        <table className="content__table">
          <thead>
            <tr>
              <th>Serviço</th>
              <th>Preço</th>
              <th>Editar</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>{dadosTabela}</tbody>
        </table>
        <a
          href="#"
          className="more"
          onClick={() => {
            setModal(true);
          }}
        >
          Adicionar Serviço&nbsp;&nbsp;
          <FaCut />
        </a>
      </div>
      {/* formulário modal */}
      {modal && (
        <div
          className="background-modal"
          onClick={() => {
            fechaModal();
          }}
        >
          <form
            className="form-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onSubmit={enviar}
          >
            <FaTimes
              className="close"
              onClick={() => {
                fechaModal();
              }}
            />
            <h2>{editaId ? "Editar Serviço" : "Adicionar Serviço"}</h2>
            <p>
              {editaId
                ? "Edite o serviço abaixo."
                : "Preencha os dados para adicionar um novo serviço."}
            </p>
            <br />
            <label htmlFor="nome">Nome do serviço</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={nome}
              placeholder="Ex.: Corte Simples"
              onChange={(e) => setNome(e.target.value)}
            />

            <label htmlFor="preco">Preço</label>
            <input
              type="number"
              name="preco"
              id="preco"
              value={preco}
              placeholder="Ex.: 49,90"
              onChange={(e) => setPreco(e.target.value)}
              step="0.01"
              min="0"
            />
            <div className="buttons">
              <button
                type="button"
                onClick={() => {
                  fechaModal();
                }}
              >
                Cancelar
              </button>
              <button type="submit">
                {editaId ? "Salvar Alterações" : "Adicionar Serviço"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default ServicesPage;
