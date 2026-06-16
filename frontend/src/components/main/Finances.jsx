import {
  FaEllipsisV,
  FaPlus,
  FaArrowDown,
  FaPaypal,
  FaUniversity,
} from "react-icons/fa";
import { useState, useEffect } from "react";
const Finances = () => {
  const [general, setGeneral] = useState(true);
  const [services, setServices] = useState(false);
  const [historic, setHistoric] = useState(false);
  const [banco, setBanco] = useState({
    nome: "",
    agencia: "",
    conta: "",
    verificado: false,
  });
  const [paypal, setPaypal] = useState({
    email: "",
    verificado: false,
  });
  useEffect(() => {
    fetch("http://192.168.1.2:3500/bancos")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados && dados.length > 0) {
          setBanco(dados[0]);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("http://192.168.1.2:3500/paypal")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados && dados.length > 0) {
          setPaypal(dados[0]);
        }
      })
      .catch((error) => console.error(error));
  }, []);
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
                      <span class="bank">
                        <FaUniversity />
                      </span>
                      <p>
                        <strong>{banco.nome}</strong>
                        <span>
                          Ag. {banco.agencia} &nbsp;●&nbsp; <wbr />
                          Conta {banco.conta}
                        </span>
                      </p>
                      <div className="content__dots">
                        <span
                          className={
                            banco.verificado ? "verificado" : "analise"
                          }
                        >
                          {banco.verificado ? "Verificado" : "Análise"}
                        </span>
                        <FaEllipsisV />
                      </div>
                    </div>
                    <div className="content__bank content__bank--paypal">
                      <span class="paypal">
                        <FaPaypal />
                      </span>
                      <p>
                        <strong>Paypal</strong>
                        <span>{paypal.email}</span>
                      </p>
                      <div className="content__dots">
                        <span
                          className={
                            paypal.verificado ? "verificado" : "analise"
                          }
                        >
                          Verificado
                        </span>
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
                      <span class="add">
                        <FaPlus />
                      </span>
                      <p>
                        <strong>Adicionar Dinheiro</strong>
                        <span>
                          Adicionar <wbr />
                          fundos
                        </span>
                      </p>
                    </div>
                    <div className="content__element">
                      <span class="ret">
                        <FaArrowDown />
                      </span>
                      <p>
                        <strong>Retirar Dinheiro</strong>
                        <span>
                          Transferir para <wbr />
                          sua conta
                        </span>
                      </p>
                    </div>
                    <div className="content__element">
                      <span class="build">
                        <FaUniversity />
                      </span>
                      <p>
                        <strong>Cadastrar Banco</strong>
                        <span>
                          Adicionar conta <wbr />
                          bancária
                        </span>
                      </p>
                    </div>
                    <div className="content__element">
                      <span>
                        <FaPaypal />
                      </span>
                      <p>
                        <strong>Cadastrar Paypal</strong>
                        <span>
                          Adicionar sua <wbr />
                          conta paypal
                        </span>
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
