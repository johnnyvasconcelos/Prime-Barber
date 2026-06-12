import { FaCalendar, FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";
import { useState, useEffect } from "react";
const Info = () => {
  const [dados, setDados] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.2:3500/")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setDados(dados);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <section className="content__info">
      <div className="content__container">
        <article className="content__box">
          <div className="content__icon">
            <FaCalendar />
          </div>
          {/* agendamentos */}
          <div className="content__status">
            <h3>Agendamentos hoje</h3>
            <strong>
              {dados.length > 0
                ? (() => {
                    const ultimaData = dados.reduce((dado, atual) => {
                      return new Date(atual.data) > new Date(dado.data)
                        ? atual
                        : dado;
                    }, dados[0])?.data;
                    return dados.filter(
                      (agendamento) => agendamento.data === ultimaData,
                    ).length;
                  })()
                : "0"}
            </strong>
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
            <FaUsers />
          </div>
          {/* clientes */}
          <div className="content__status">
            <h3>Clientes atendidos</h3>
            <strong>
              {dados.length > 0
                ? (() => {
                    const ultimaData = dados.reduce((dado, atual) => {
                      return new Date(atual.data) > new Date(dado.data)
                        ? atual
                        : dado;
                    }, dados[0])?.data;

                    return dados.filter(
                      (agendamento) =>
                        agendamento.data === ultimaData &&
                        agendamento.atendido == true,
                    ).length;
                  })()
                : "0"}
            </strong>
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
            <FaDollarSign />
          </div>
          {/* faturamento diário */}
          <div className="content__status">
            <h3>Faturamento hoje</h3>
            <strong>
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
            </strong>
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
            <FaChartLine />
          </div>
          {/* faturamento mensal */}
          <div className="content__status">
            <h3>Faturamento do mês</h3>
            <strong>
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
            </strong>
            <p>
              {dados.length > 0
                ? (() => {
                    const ultimaData = dados.reduce((recente, atual) => {
                      return new Date(atual.data) > new Date(recente.data)
                        ? atual
                        : recente;
                    }, dados[0])?.data;

                    const dataAtualObj = new Date(ultimaData);
                    const anoAtual = dataAtualObj.getFullYear();
                    const mesAtual = dataAtualObj.getMonth();

                    const dataMesPassadoObj = new Date(
                      anoAtual,
                      mesAtual - 1,
                      1,
                    );
                    const anoPassado = dataMesPassadoObj.getFullYear();
                    const mesPassado = dataMesPassadoObj.getMonth();

                    let faturamentoMesAtual = 0;
                    let faturamentoMesPassado = 0;

                    for (let dadoX of dados) {
                      const dataItem = new Date(dadoX.data);
                      const anoItem = dataItem.getFullYear();
                      const mesItem = dataItem.getMonth();

                      if (anoItem === anoAtual && mesItem === mesAtual) {
                        faturamentoMesAtual += Number(dadoX.faturamento);
                      } else if (
                        anoItem === anoPassado &&
                        mesItem === mesPassado
                      ) {
                        faturamentoMesPassado += Number(dadoX.faturamento);
                      }
                    }

                    if (faturamentoMesPassado === 0) {
                      return faturamentoMesAtual > 0 ? (
                        <>
                          <span className="green">+100%</span> em relação ao mês
                          passado
                        </>
                      ) : (
                        <>
                          <span>0%</span> em relação ao mês passado
                        </>
                      );
                    }

                    const variacao =
                      ((faturamentoMesAtual - faturamentoMesPassado) /
                        faturamentoMesPassado) *
                      100;
                    const sinal = variacao > 0 ? "+" : "";
                    const classeCor = variacao >= 0 ? "green" : "red";

                    return (
                      <>
                        <span className={classeCor}>
                          {sinal}
                          {variacao.toFixed(0)}%
                        </span>{" "}
                        em relação ao mês passado
                      </>
                    );
                  })()
                : "0% em relação ao mês passado"}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Info;
