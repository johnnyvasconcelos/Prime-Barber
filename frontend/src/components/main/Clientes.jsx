import { useState, useEffect } from "react";

const Clientes = () => {
  const [dados, setDados] = useState([]);
  const [limite, setLimite] = useState(5);

  useEffect(() => {
    fetch("https://prime-barber-dash.onrender.com/")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setDados(dados);
      })
      .catch((error) => console.error(error));
  }, []);

  const dadosTabela = [];

  if (dados.length > 0) {
    const ultimaData = dados.reduce((recente, atual) => {
      return atual.data > recente.data ? atual : recente;
    }, dados[0]).data;

    const dadosFiltrados = dados.filter((dado) => dado.data === ultimaData);

    for (let i = 0; i < dadosFiltrados.length; i++) {
      if (i >= limite) {
        break;
      }

      const dado = dadosFiltrados[i];
      const apenasData = dado.data.split("T")[0];
      const [ano, mes, dia] = apenasData.split("-");
      const dataFormatada = `${dia}/${mes}/${ano}`;
      dadosTabela.push(
        <tr key={dado.id}>
          <td>{dado.cliente}</td>
          <td>{dado.nome_servico}</td>
          <td>{dataFormatada}</td>
          <td>{dado.faturamento}</td>
        </tr>,
      );
    }
  }

  function aumentaLimite() {
    setLimite(limite + 5);
  }
  return (
    <div className="content__clients">
      <div className="content__container">
        <div className="content__area">
          <table className="content__table">
            <thead>
              <tr>
                <th>NOME DO CLIENTE</th>
                <th>SERVIÇO FAVORITO</th>
                <th>CLIENTE DESDE</th>
                <th>VALOR GERADO</th>
              </tr>
            </thead>
            <tbody>
              {/* clientes */}
              {dadosTabela}
            </tbody>
          </table>
        </div>
        <a
          href="#"
          className="more"
          onClick={() => {
            aumentaLimite();
          }}
        >
          Carregar mais
        </a>
      </div>
    </div>
  );
};

export default Clientes;
