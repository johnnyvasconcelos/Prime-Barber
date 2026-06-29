import { FaPlus, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
const MainHeader = ({ title, subtitle, button }) => {
  const [addModal, setAddModal] = useState(false);
  const [...setData] = useState([]);

  const [cliente, setCliente] = useState("");
  const [nomeServico, setNomeServico] = useState("");
  const [profissional, setProfissional] = useState("");
  const [listaServicos, setListaServicos] = useState([]);

  const carregarDado = () => {
    fetch("https://prime-barber-dash.onrender.com/clientes")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setData(dados);
      })
      .catch((error) => console.error(error));
  };

  const carregarServicos = () => {
    fetch("https://prime-barber-dash.onrender.com/servicos")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setListaServicos(dados);
        if (dados.length > 0) {
          setNomeServico(dados[0].nome);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    carregarServicos();
  }, []);

  async function enviarDado() {
    try {
      const url = `https://prime-barber-dash.onrender.com/clientes/cliente?cliente=${encodeURIComponent(cliente)}&nome_servico=${encodeURIComponent(nomeServico)}&profissional=${encodeURIComponent(profissional)}`;

      const response = await fetch(url);

      if (!response.ok) {
        alert("Erro ao adicionar.");
      } else {
        setAddModal(false);
        setCliente("");
        setProfissional("");
        if (listaServicos.length > 0) setNomeServico(listaServicos[0].nome);
        carregarDado();
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }

    carregarDado();
  }

  return (
    <>
      <header className="content__header">
        <div className="content__container">
          <div className="content__titles">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {button && (
            <button
              className="add"
              onClick={() => {
                setAddModal(true);
              }}
            >
              Adicionar {button} <FaPlus />
            </button>
          )}
        </div>
      </header>

      {addModal && (
        <div
          className="background-modal"
          onClick={() => {
            setAddModal(false);
          }}
        >
          <form
            className="form-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onSubmit={enviarDado}
          >
            <FaTimes
              className="close"
              onClick={() => {
                setAddModal(false);
              }}
            />
            <h2>Adicionar Cliente</h2>
            <p>Preencha os dados para adicionar um novo cliente.</p>
            <br />

            <label htmlFor="nome">Nome do cliente</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={cliente}
              placeholder="Ex.: Bastian Misawa"
              onChange={(e) => setCliente(e.target.value)}
              required
            />

            <label htmlFor="corte">Corte</label>
            <select
              name="corte"
              id="corte"
              value={nomeServico}
              onChange={(e) => setNomeServico(e.target.value)}
            >
              {listaServicos.map((servico) => (
                <option key={servico.id} value={servico.nome}>
                  {servico.nome}
                </option>
              ))}
            </select>

            <label htmlFor="profissional">Profissional</label>
            <input
              type="text"
              name="profissional"
              id="profissional"
              value={profissional}
              placeholder="Ex.: Alan"
              onChange={(e) => setProfissional(e.target.value)}
              required
            />

            <div className="buttons">
              <button
                type="button"
                onClick={() => {
                  setAddModal(false);
                }}
              >
                Cancelar
              </button>
              <button type="submit">Adicionar Cliente</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default MainHeader;
