import { FaWallet, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";
const InfoFinances = () => {
  const [dados, setDados] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.2:3500/barbearia")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setDados(dados);
      })
      .catch((error) => console.error(error));
  }, []);
  // pega o ticked médio da barbearia
  const [agendamentos, setAgendamentos] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.2:3500/clientes")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados && dados.length > 0) {
          setAgendamentos(dados);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  function getMedia() {
    let valoresCalculo = 0;
    let valoresMedia = [];

    for (let agendamento of agendamentos) {
      valoresMedia.push(agendamento.faturamento);
      valoresCalculo += Number(agendamento.faturamento);
    }

    return (valoresCalculo / agendamentos.length)
      .toFixed(2)
      .replaceAll(".", ",");
  }
  return (
    <section className="content__info">
      <div className="content__container">
        <article className="content__box">
          <div className="content__icon">
            <FaWallet />
          </div>
          {/* agendamentos */}
          <div className="content__status">
            <h3>Saldo Atual</h3>
            <strong>R$ {dados[0]?.saldo.replace(".", ",")}</strong>
            <p>Disponível para saque</p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaArrowDown />
          </div>
          {/* clientes */}
          <div className="content__status">
            <h3>Entradas (este mês)</h3>
            <strong>R$ {dados[0]?.entradas.replace(".", ",")}</strong>
            <p>
              {dados.length > 0
                ? (() => {
                    const ultimaData = dados.reduce((recente, atual) => {
                      return new Date(atual.data) > new Date(recente.data)
                        ? atual
                        : recente;
                    }, dados[0])?.data;

                    const dataOntem = new Date(ultimaData);
                    dataOntem.setDate(dataOntem.getDate() - 1);
                    const dataOntemString = dataOntem
                      .toISOString()
                      .split("T")[0];
                    const ultimaDataString = new Date(ultimaData)
                      .toISOString()
                      .split("T")[0];

                    let atendidosHoje = 0;
                    let atendidosOntem = 0;

                    for (let dadoX of dados) {
                      const dataItemString = new Date(dadoX.data)
                        .toISOString()
                        .split("T")[0];

                      if (
                        dataItemString === ultimaDataString &&
                        dadoX.atendido
                      ) {
                        atendidosHoje++;
                      } else if (
                        dataItemString === dataOntemString &&
                        dadoX.atendido
                      ) {
                        atendidosOntem++;
                      }
                    }

                    if (atendidosOntem === 0) {
                      return atendidosHoje > 0 ? (
                        <span className="green">+100% em relação a ontem</span>
                      ) : (
                        <span>0% em relação a ontem</span>
                      );
                    }

                    const variacao =
                      ((atendidosHoje - atendidosOntem) / atendidosOntem) * 100;
                    const sinal = variacao > 0 ? "+" : "";
                    const classeCor = variacao >= 0 ? "green" : "red";

                    return (
                      <>
                        <span className={classeCor}>
                          {sinal}
                          {variacao.toFixed(0)}%
                        </span>{" "}
                        em relação a ontem
                      </>
                    );
                  })()
                : "0% em relação a ontem"}
            </p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaArrowUp />
          </div>
          {/* faturamento diário */}
          <div className="content__status">
            <h3>Saídas (este mês)</h3>
            <strong>R$ {dados[0]?.saidas.replace(".", ",")}</strong>
            <p>
              {dados.length > 0
                ? (() => {
                    const ultimaData = dados.reduce((recente, atual) => {
                      return new Date(atual.data) > new Date(recente.data)
                        ? atual
                        : recente;
                    }, dados[0])?.data;

                    const dataOntem = new Date(ultimaData);
                    dataOntem.setDate(dataOntem.getDate() - 1);
                    const dataOntemString = dataOntem
                      .toISOString()
                      .split("T")[0];
                    const ultimaDataString = new Date(ultimaData)
                      .toISOString()
                      .split("T")[0];

                    let faturamentoHoje = 0;
                    let faturamentoOntem = 0;

                    for (let dadoX of dados) {
                      const dataItemString = new Date(dadoX.data)
                        .toISOString()
                        .split("T")[0];
                      if (dataItemString === ultimaDataString) {
                        faturamentoHoje += Number(dadoX.faturamento);
                      } else if (dataItemString === dataOntemString) {
                        faturamentoOntem += Number(dadoX.faturamento);
                      }
                    }

                    if (faturamentoOntem === 0) {
                      return faturamentoHoje > 0 ? (
                        <span className="green">+100% em relação a ontem</span>
                      ) : (
                        <span>0% em relação a ontem</span>
                      );
                    }

                    const variacao =
                      ((faturamentoHoje - faturamentoOntem) /
                        faturamentoOntem) *
                      100;
                    const sinal = variacao > 0 ? "+" : "";
                    const classeCor = variacao >= 0 ? "green" : "red";

                    return (
                      <>
                        <span className={classeCor}>
                          {sinal}
                          {variacao.toFixed(0)}%
                        </span>{" "}
                        em relação a ontem
                      </>
                    );
                  })()
                : "0% em relação a ontem"}
            </p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaWallet />
          </div>
          {/* faturamento mensal */}
          <div className="content__status">
            <h3>Ticket Médio</h3>
            <strong>R$ {getMedia()}</strong>
            <p>Média por atendimento</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default InfoFinances;
