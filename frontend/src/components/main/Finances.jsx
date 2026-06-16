import {
  FaEllipsisV,
  FaPlus,
  FaArrowDown,
  FaPaypal,
  FaUniversity,
} from "react-icons/fa";
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
                  <div className="content__banks">
                    <div className="content__bank content__bank--bank">
                      <span>
                        <FaUniversity />
                      </span>
                      <p>
                        <strong>Banco do Brasil</strong>
                        <span>Agência 12345 &nbsp;●&nbsp; Conta 1234-5</span>
                      </p>
                      <div className="content__dots">
                        <span className="verificado">Verificado</span>
                        <FaEllipsisV />
                      </div>
                    </div>
                    <div className="content__bank content__bank--paypal">
                      <span>
                        <FaPaypal />
                      </span>
                      <p>
                        <strong>Banco do Brasil</strong>
                        <span>Agência 12345 &nbsp;●&nbsp; Conta 1234-5</span>
                      </p>
                      <div className="content__dots">
                        <span className="verificado">Verificado</span>
                        <FaEllipsisV />
                      </div>
                    </div>
                    <a href="#" className="add">
                      <FaPlus /> Adicionar nova conta
                    </a>
                  </div>
                </div>
                <div>
                  <h3>Ações Rápidas</h3>
                  <div className="content__grid">
                    <div className="content__element">
                      <span>
                        <FaPlus />
                      </span>
                      <p>
                        <strong>Adicionar Dinheiro</strong>
                        <span>Adicionar fundos</span>
                      </p>
                    </div>
                    <div className="content__element">
                      <span>
                        <FaArrowDown />
                      </span>
                      <p>
                        <strong>Retirar Dinheiro</strong>
                        <span>Transferir para sua conta</span>
                      </p>
                    </div>
                    <div className="content__element">
                      <span>
                        <FaUniversity />
                      </span>
                      <p>
                        <strong>Cadastrar Banco</strong>
                        <span>Adicionar conta bancária</span>
                      </p>
                    </div>
                    <div className="content__element">
                      <span>
                        <FaPaypal />
                      </span>
                      <p>
                        <strong>Cadastrar Paypal</strong>
                        <span>Adicionar sua conta paypal</span>
                      </p>
                    </div>
                  </div>
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
