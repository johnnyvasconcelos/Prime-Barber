import { useState } from "react";
const Finances = () => {
  const [general, setGeneral] = useState(true);
  const [services, setServices] = useState(false);
  const [historic, setHistoric] = useState(false);
  return (
    <>
      <section className="content__finances">
        <div className="content__container">
          <div className="content__tabs">
            <div className="content__selects">
              <div
                className={
                  general
                    ? "content__select content__select--active"
                    : "content__select"
                }
                onClick={() => {
                  setGeneral(true);
                  setServices(false);
                  setHistoric(false);
                }}
              >
                Visão Geral
              </div>
              <div
                className={
                  services
                    ? "content__select content__select--active"
                    : "content__select"
                }
                onClick={() => {
                  setGeneral(false);
                  setServices(true);
                  setHistoric(false);
                }}
              >
                Serviços
              </div>
              <div
                className={
                  historic
                    ? "content__select content__select--active"
                    : "content__select"
                }
                onClick={() => {
                  setGeneral(false);
                  setServices(false);
                  setHistoric(true);
                }}
              >
                Histórico
              </div>
            </div>
            {general && (
              <article className="content__tab">
                <div>
                  <h3>Contas & Métodos Cadastrados</h3>
                </div>
                <div>
                  <h3>Ações Rápidas</h3>
                </div>
              </article>
            )}
            {services && (
              <article className="content__tab">
                <h3>Serviços em Conclusão</h3>
                {/* tabela de recebimento, serviços pendentes */}
              </article>
            )}
            {historic && (
              <article className="content__tab">
                <h3>Histórico de Transações</h3>
                {/* tabela de transações */}
              </article>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Finances;
