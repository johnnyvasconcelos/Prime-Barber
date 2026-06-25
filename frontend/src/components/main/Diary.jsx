import "./_Diary.css";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useEffect } from "react";

const Diary = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [modalAgenda, showModalAgenda] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 6));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 6));
  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [status, setStatus] = useState("Pendente");

  useEffect(() => {
    fetch("http://192.168.1.2:3500/agenda")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setAgendamentos(dados);
      });
  }, []);

  // console.log(agendamentos);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const renderHeader = () => {
    return (
      <div className="diary__calendar-header">
        <div className="diary__nav-buttons">
          <button onClick={prevMonth}>&lt;</button>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <span className="diary__calendar-title">
          {capitalize(format(currentMonth, "MMMM yyyy", { locale: ptBR }))}
        </span>
        <button className="diary__today-button" onClick={handleToday}>
          Hoje
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const days = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
    return (
      <div className="diary__weekdays">
        {days.map((day, index) => (
          <div className="diary__weekday" key={index}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(cloneDay, "yyyy-MM-dd");

        const hasAppointments = agendamentos.some(
          (item) => item.data === formattedDate,
        );
        const isCurrentMonth = isSameMonth(cloneDay, currentMonth);
        const isSelected = isSameDay(cloneDay, selectedDate);

        let cellClass = "diary__day-cell";
        if (!isCurrentMonth) cellClass += " diary__day-cell--disabled";
        if (isSelected) cellClass += " diary__day-cell--selected";

        days.push(
          <div
            className={cellClass}
            key={cloneDay.toString()}
            onClick={() => isCurrentMonth && setSelectedDate(cloneDay)}
          >
            <span className="diary__day-number">{format(cloneDay, "d")}</span>
            {hasAppointments && isCurrentMonth && (
              <span className="diary__day-dot"></span>
            )}
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="diary__calendar-row" key={day.toString()}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="diary__calendar-cells">{rows}</div>;
  };

  const agendamentosDoDia = agendamentos.filter(
    (item) => item.data === format(selectedDate, "yyyy-MM-dd"),
  );

  const formatSubtitleDate = (date) => {
    const dayOfWeek = capitalize(format(date, "eeee", { locale: ptBR }));
    const rest = format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    return `${dayOfWeek}, ${rest}`;
  };

  const enviar = (e) => {
    e.preventDefault();

    const dadosAgendamento = { cliente, servico, data, hora, status };

    fetch("http://192.168.1.2:3500/agenda/adicionar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosAgendamento),
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao inserir o agendamento.");
        }
        return resposta.json();
      })
      .then(() => {
        return fetch("http://192.168.1.2:3500/agenda");
      })
      .then((resposta) => resposta.json())
      .then((dados) => {
        setAgendamentos(dados);

        setCliente("");
        setServico("");
        setData("");
        setHora("");
        setStatus("Pendente");

        showModalAgenda(false);
      })
      .catch((erro) => {
        console.error("Erro na comunicação:", erro);
        alert("Não foi possível salvar o agendamento.");
      });
  };

  return (
    <>
      <section className="content__diary">
        <div className="content__container">
          <div className="diary__workspace">
            <div className="diary__card diary__card--calendar">
              {renderHeader()}
              {renderDaysOfWeek()}
              {renderCells()}
              <div className="diary__legend">
                <span className="diary__legend-dot"></span>
                <span className="diary__legend-text">
                  Data com agendamentos
                </span>
              </div>
            </div>

            <div className="diary__card diary__card--agenda">
              <h2 className="diary__agenda-title">Agendamentos do dia</h2>
              <p className="diary__agenda-date">
                {formatSubtitleDate(selectedDate)}
              </p>

              <div className="diary__agenda-list">
                {agendamentosDoDia.map((agendamento) => (
                  <div className="diary__agenda-item" key={agendamento.id}>
                    <span className="diary__item-time">{agendamento.hora}</span>
                    <div className="diary__item-details">
                      <h4 className="diary__item-name">
                        {agendamento.cliente}
                      </h4>
                      <p className="diary__item-service">
                        {agendamento.servico}
                      </p>
                    </div>
                    <span
                      className={`diary__item-status diary__item-status--${agendamento.status.toLowerCase()}`}
                    >
                      {agendamento.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* 
              <a href="#todos" className="diary__view-all">
                Ver todos agendamentos do dia &rarr;
              </a>
              */}
            </div>
          </div>

          <div className="diary__card diary__card--banner">
            <div className="diary__banner-info">
              <div className="diary__banner-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="diary__banner-texts">
                <h3 className="diary__banner-title">
                  Quer agendar um novo horário?
                </h3>
                <p className="diary__banner-desc">
                  Clique no botão ao lado para criar um novo agendamento.
                </p>
              </div>
            </div>
            <br />
            <button
              className="diary__btn-new"
              onClick={() => {
                showModalAgenda(true);
              }}
            >
              + Novo Agendamento
            </button>
          </div>
          {modalAgenda && (
            <div
              className="background-modal"
              onClick={() => {
                showModalAgenda(false);
              }}
            >
              <form
                className="form-modal"
                onClick={(e) => e.stopPropagation()}
                onSubmit={enviar}
              >
                <FaTimes
                  className="close"
                  onClick={() => {
                    showModalAgenda(false);
                  }}
                />
                <h2>Agendar Horário</h2>
                <p>Preencha os dados para o agendamento</p>
                <br />

                <label htmlFor="cliente">Cliente</label>
                <input
                  type="text"
                  name="cliente"
                  id="cliente"
                  value={cliente}
                  placeholder="Nome do cliente"
                  onChange={(e) => setCliente(e.target.value)}
                  required
                />

                <label htmlFor="servico">Serviço</label>
                <input
                  type="text"
                  name="servico"
                  id="servico"
                  value={servico}
                  placeholder="Ex.: Corte + Barba"
                  onChange={(e) => setServico(e.target.value)}
                  required
                />

                <label htmlFor="data">Data</label>
                <input
                  type="date"
                  name="data"
                  id="data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />

                <label htmlFor="hora">Hora</label>
                <input
                  type="time"
                  name="hora"
                  id="hora"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                />

                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Confirmado">Confirmado</option>
                  <option value="Agendado">Agendado</option>
                </select>

                <div className="buttons">
                  <button
                    type="button"
                    onClick={() => {
                      showModalAgenda(false);
                    }}
                  >
                    Cancelar
                  </button>
                  <button type="submit">Cadastrar</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Diary;
