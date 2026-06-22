import { FaWallet, FaArrowDown, FaArrowUp } from "react-icons/fa";
const InfoReports = () => {
  return (
    <section className="content__info">
      <div className="content__container">
        <article className="content__box">
          <div className="content__icon">
            <FaWallet />
          </div>
          <div className="content__status">
            <h3>Saldo Atual</h3>
            <strong>R$ 14</strong>
            <p>Disponível para saque</p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaArrowDown />
          </div>
          <div className="content__status">
            <h3>Entradas (último mês)</h3>
            <strong>R$ 14</strong>
            <p>test</p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaArrowUp />
          </div>
          <div className="content__status">
            <h3>Saídas (último mês)</h3>
            <strong>R$ 15</strong>
            <p>test</p>
          </div>
        </article>
        <article className="content__box">
          <div className="content__icon">
            <FaWallet />
          </div>
          <div className="content__status">
            <h3>Ticket Médio</h3>
            <strong>R$ 43</strong>
            <p>Média por atendimento</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default InfoReports;
