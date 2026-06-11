import { FaDollarSign } from "react-icons/fa";
import { useState, useEffect } from "react";
const Apointments = () => {
  const [dados, setDados] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.4:3500/")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setDados(dados);
      })
      .catch((error) => console.error(error));
  }, []);

  const dadosTabela = [];
  let limite = 0;

  if (dados.length > 0) {
    const ultimaData = dados.reduce((recente, atual) => {
      return atual.data > recente.data ? atual : recente;
    }, dados[0]).data;

    for (const dado of dados) {
      if (limite > 5) {
        break;
      }

      if (dado.data === ultimaData) {
        const semSegs = dado.horario ? dado.horario.slice(0, 5) : "";

        dadosTabela.push(
          <tr key={dado.id}>
            <td>{semSegs}</td>
            <td>{dado.cliente}</td>
            <td>{dado.nome_servico}</td>
            <td>{dado.profissional}</td>
            <td>{dado.faturamento}</td>
            {dado.atendido == 1 ? (
              <td className="confirmed">Confirmado</td>
            ) : (
              <td className="pending">Pendente</td>
            )}
          </tr>,
        );

        limite += 1;
      }
    }
  }
  return (
    <section className="content__apointments">
      <div className="content__container">
        <div className="content__clients">
          <h3 className="h3">
            <strong>Agendamentos de Hoje</strong>
          </h3>
          <div className="content__area">
            <table className="content__table">
              <thead>
                <tr>
                  <th>HORÁRIO</th>
                  <th>CLIENTE</th>
                  <th>SERVIÇO</th>
                  <th>PROFISSIONAL</th>
                  <th>VALOR</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {/* dados de clientes */}
                {dadosTabela}
              </tbody>
            </table>
          </div>
        </div>
        <div className="content__financial">
          <h3 className="h3">
            <strong>Resumo Financeiro</strong>
          </h3>
          <table className="content__table">
            <tbody>
              <tr>
                <td>Faturamento hoje</td>
                <td className="today">
                  {" "}
                  {dados.length > 0
                    ? (() => {
                        const ultimaData = dados.reduce((recente, atual) => {
                          return new Date(atual.data) > new Date(recente.data)
                            ? atual
                            : recente;
                        }, dados[0])?.data;
                        let sum = 0;
                        for (let dadoX of dados) {
                          if (dadoX.data === ultimaData) {
                            sum += Number(dadoX.faturamento);
                          }
                        }
                        return `R$ ${sum.toFixed(2).replace(".", ",")}`;
                      })()
                    : "R$ 0,00"}
                </td>
              </tr>
              <tr>
                <td>Faturamento esta semana</td>
                <td>
                  {dados.length > 0
                    ? (() => {
                        const ultimaDataStr = dados.reduce((recente, atual) => {
                          return new Date(atual.data) > new Date(recente.data)
                            ? atual
                            : recente;
                        }, dados[0])?.data;

                        const dataMaxima = new Date(ultimaDataStr);

                        const dataLimite = new Date(ultimaDataStr);
                        dataLimite.setDate(dataLimite.getDate() - 7);

                        let sum = 0;
                        for (let dadoX of dados) {
                          const dataAtual = new Date(dadoX.data);

                          if (
                            dataAtual > dataLimite &&
                            dataAtual <= dataMaxima
                          ) {
                            sum += Number(dadoX.faturamento);
                          }
                        }

                        return `R$ ${sum.toFixed(2).replace(".", ",")}`;
                      })()
                    : "R$ 0,00"}
                </td>
              </tr>
              <tr>
                <td>Faturamento este mês</td>
                <td>
                  {dados.length > 0
                    ? (() => {
                        const ultimaData = dados.reduce((recente, atual) => {
                          return new Date(atual.data) > new Date(recente.data)
                            ? atual
                            : recente;
                        }, dados[0])?.data;

                        const data = new Date(ultimaData);
                        const ano = data.getFullYear();
                        const mes = data.getMonth();

                        let sum = 0;
                        for (let dadoX of dados) {
                          const dataAtual = new Date(dadoX.data);
                          if (
                            dataAtual.getFullYear() === ano &&
                            dataAtual.getMonth() === mes
                          ) {
                            sum += Number(dadoX.faturamento);
                          }
                        }

                        return `R$ ${sum.toFixed(2).replace(".", ",")}`;
                      })()
                    : "R$ 0,00"}
                </td>
              </tr>
              <tr>
                <td>Ticket médio</td>
                <td>
                  {dados.length > 0
                    ? (() => {
                        const ultimaDataStr = dados.reduce((recente, atual) => {
                          return new Date(atual.data) > new Date(recente.data)
                            ? atual
                            : recente;
                        }, dados[0])?.data;

                        const dataLimite = new Date(ultimaDataStr);
                        dataLimite.setDate(dataLimite.getDate() - 7);

                        let faturamentoTotal = 0;
                        let totalAtendimentos = 0;

                        for (let dadoX of dados) {
                          const dataAtual = new Date(dadoX.data);

                          if (
                            dataAtual > dataLimite &&
                            dataAtual <= new Date(ultimaDataStr)
                          ) {
                            faturamentoTotal += Number(dadoX.faturamento);
                            totalAtendimentos++;
                          }
                        }

                        const ticketMedio =
                          faturamentoTotal / totalAtendimentos;

                        return `R$ ${ticketMedio.toFixed(2).replace(".", ",")}`;
                      })()
                    : "R$ 0,00"}
                </td>
              </tr>
            </tbody>
          </table>
          <a href="#">
            <FaDollarSign />
            &nbsp;&nbsp;Receber Pagamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default Apointments;
