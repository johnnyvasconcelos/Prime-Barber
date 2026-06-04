import { FaCalendar, FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";
const Info = () => {
  return (
    <section className="content__info">
      <div className="content__container">
        <article className="content__box">
          <div className="content__icon">
            <FaCalendar />
          </div>
          <div className="content__status">
            <h3>Agendamentos hoje</h3>
            <strong>12</strong>
            <p>
              <span>+20%</span> em relação a ontem
            </p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaUsers />
          </div>
          <div className="content__status">
            <h3>Clientes atendidos</h3>
            <strong>8</strong>
            <p>
              <span>+14%</span> em relação a ontem
            </p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaDollarSign />
          </div>
          <div className="content__status">
            <h3>Faturamento hoje</h3>
            <strong>R$ 420,00</strong>
            <p>
              <span>+18%</span> em relação a ontem
            </p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaChartLine />
          </div>
          <div className="content__status">
            <h3>Faturamento do mês</h3>
            <strong>R$ 8560,00</strong>
            <p>
              <span>+15%</span> em relação ao mês passado
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Info;
