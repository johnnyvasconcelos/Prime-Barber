import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCut, FaTimes } from "react-icons/fa";

const ServicesPage = () => {
  const [modal, setModal] = useState(false);
  const [dados, setDados] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.2:3500/servicos")
      .then((resposta) => resposta.json())
      .then((dados2) => {
        setDados(dados2);
      })
      .catch((error) => console.error(error));
  }, []);

  const dadosTabela = [];

  if (dados.length > 0) {
    for (let i = 0; i < dados.length; i++) {
      dadosTabela.push(
        <tr key={dados[i].id}>
          <td>{dados[i].nome}</td>
          <td>R$ {dados[i].preco}</td>
          <td className="editar btn">
            <span>
              <FaEdit />
            </span>
          </td>
          <td className="remover btn">
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
        <div className="background-modal">
          <form className="form-modal">
            <FaTimes className="close"
              onClick={() => {
                setModal(false);
              }}
            />
            <h2>Adicionar Serviço</h2>
            <p>Preencha os dados para adicionar um novo serviço.</p>

            <label htmlFor="nome">Nome do serviço</label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Ex.: Corte Simples"
            />

            <label htmlFor="preco">Preço</label>
            <input
              type="number"
              name="preco"
              id="preco"
              placeholder="Ex.: 49,90"
              step="0.01"
              min="0"
            />

            <button type="submit">Adicionar Serviço</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default ServicesPage;
