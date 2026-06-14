import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
const MainHeader = ({ title, subtitle, button }) => {
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState([]);
  const [nomeDado, setNomeDado] = useState("");
  const [Dado, setDado] = useState("");
  const [id, setId] = useState(0);

  const carregarDado = () => {
    fetch("http://192.168.1.2:3500/clientes")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setData(dados);
      })
      .catch((error) => console.error(error));
  };

  async function enviarDado() {
    try {
      const url = `http://192.168.1.2:3500/clientes/add?id=${id}&nome=${nomeDado}&dado=${Dado}`;

      const response = await fetch(url);

      if (!response.ok) {
        alert("Erro ao adicionar.");
      } else {
        setAddModal(false);
        carregarDado();
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
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
      {/* formulário modal */}
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
              value={nomeDado}
              placeholder="Ex.: Bastian Misawa"
              onChange={(e) => setNomeDado(e.target.value)}
            />

            <label htmlFor="corte">Corte</label>
            <select
              name="corte"
              id="corte"
              onChange={(e) => setDado(e.target.value)}
            >
              <option value="Corte Simples">Corte Simples</option>
            </select>
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
