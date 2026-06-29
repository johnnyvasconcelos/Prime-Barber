import { useState, useEffect } from "react";
import { FaWallet, FaPeopleCarry, FaTicketAlt } from "react-icons/fa";
const InfoReports = () => {
  const [dados, setDados] = useState([]);
  const [dadosAgendamentos, setDadosAgendamentos] = useState([]);

  useEffect(() => {
    fetch("https://prime-barber-dash.onrender.com/cl")
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        setDados(dados);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("https://prime-barber-dash.onrender.com/clientes")
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        setDadosAgendamentos(dados);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let faturamentoTotal = 0;
  for (let i = 0; i < dadosAgendamentos.length; i++) {
    faturamentoTotal += Number(dadosAgendamentos[i].faturamento);
  }

  const nomesClientes = dados.map((item) => {
    return item.nome;
  });
  const nomesUnicos = new Set(nomesClientes);
  const totalClientes = nomesUnicos.size;

  function getMedia() {
    if (dadosAgendamentos.length === 0) return "0,00";
    let valoresCalculo = 0;
    let valoresMedia = [];

    for (let agendamento of dadosAgendamentos) {
      valoresMedia.push(agendamento.faturamento);
      valoresCalculo += Number(agendamento.faturamento);
    }

    return (valoresCalculo / dadosAgendamentos.length)
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
          <div className="content__status">
            <h3>Faturamento Total</h3>
            <strong>
              R$ {faturamentoTotal.toFixed(2).replaceAll(".", ",")}
            </strong>
            <p>Disponível para saque</p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaPeopleCarry />
          </div>
          <div className="content__status">
            <h3>Total de Clientes</h3>
            <strong>{totalClientes}</strong>
            <p>Ao longo do tempo</p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaTicketAlt />
          </div>
          <div className="content__status">
            <h3>Total de Serviços</h3>
            <strong>{dadosAgendamentos.length}</strong>
            <p>Serviços já feitos</p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaWallet />
          </div>
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

export default InfoReports;
