import { FaDollarSign } from "react-icons/fa";
const Apointments = () => {
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
                <tr>
                  <td>09:00</td>
                  <td>João Silva</td>
                  <td>Corte + Barba</td>
                  <td>Ricardo</td>
                  <td>R$ 39,00</td>
                  <td className="confirmed">Confirmado</td>
                </tr>
                <tr>
                  <td>09:00</td>
                  <td>João Silva</td>
                  <td>Corte + Barba</td>
                  <td>Ricardo</td>
                  <td>R$ 39,00</td>
                  <td className="confirmed">Confirmado</td>
                </tr>
                <tr>
                  <td>09:00</td>
                  <td>João Silva</td>
                  <td>Corte Simples</td>
                  <td>Ricardo</td>
                  <td>R$ 39,00</td>
                  <td className="confirmed">Confirmado</td>
                </tr>
                <tr>
                  <td>09:00</td>
                  <td>João Silva</td>
                  <td>Corte + Barba</td>
                  <td>Joel</td>
                  <td>R$ 39,00</td>
                  <td className="pending">Pendente</td>
                </tr>
                <tr>
                  <td>09:00</td>
                  <td>João Silva</td>
                  <td>Corte + Barba</td>
                  <td>Ricardo</td>
                  <td>R$ 39,00</td>
                  <td className="pending">Pendente</td>
                </tr>
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
                <td className="today">R$ 400,00</td>
              </tr>
              <tr>
                <td>Faturamento esta semana</td>
                <td>R$ 400,00</td>
              </tr>
              <tr>
                <td>Faturamento este mês</td>
                <td>R$ 400,00</td>
              </tr>
              <tr>
                <td>Ticket médio</td>
                <td>R$ 400,00</td>
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
