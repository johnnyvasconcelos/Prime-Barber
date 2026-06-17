import {
  FaEllipsisV,
  FaPlus,
  FaArrowDown,
  FaPaypal,
  FaUniversity,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";
const Finances = () => {
  const [general, setGeneral] = useState(true);
  const [services, setServices] = useState(false);
  const [historic, setHistoric] = useState(false);
  const [pop, showPop] = useState(false);
  const [bancoOuPaypal, setBancoOuPaypal] = useState(false);
  const [paypalForm, setPaypalForm] = useState(false);
  const [bankForm, setBankForm] = useState(false);
  const [emailPaypal, setEmailPaypal] = useState("");
  const [nomeBanco, setNomeBanco] = useState("");
  const [contaBanco, setContaBanco] = useState("");
  const [agenciaBanco, setAgenciaBanco] = useState("");
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
  function CarregaAi() {
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
  }
  CarregaAi();
  async function enviaPaypal() {
    try {
      const url = `http://192.168.1.2:3500/paypal/item?email=${encodeURIComponent(emailPaypal)}`;

      const response = await fetch(url);

      if (!response.ok) {
        alert("Erro ao adicionar.");
      } else {
        setPaypalForm(false);
        showPop(false);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    CarregaAi();
  }
  async function enviaBank() {
    try {
      const url = `http://192.168.1.2:3500/banco/item?nome=${encodeURIComponent(nomeBanco)}&conta=${encodeURIComponent(contaBanco)}&agencia=${encodeURIComponent(agenciaBanco)}`;

      const response = await fetch(url);

      if (!response.ok) {
        alert("Erro ao adicionar.");
      } else {
        setBankForm(false);
        showPop(false);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    CarregaAi();
  }
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
                          {paypal.verificado ? "Verificado" : "Análise"}
                        </span>
                        <FaEllipsisV />
                      </div>
                    </div>
                    <a
                      href="#"
                      className="add"
                      onClick={() => {
                        showPop(true);
                        setBancoOuPaypal(true);
                      }}
                    >
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
      {/* formulário modal */}
      {pop && (
        <div
          className="background-modal"
          onClick={() => {
            showPop(false);
            setBancoOuPaypal(false);
            setBankForm(false);
            setPaypalForm(false);
          }}
        >
          {bancoOuPaypal && (
            <div
              className="form-modal"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <FaTimes
                className="close"
                onClick={() => {
                  showPop(false);
                }}
              />
              <div className="selects">
                <div
                  className="select"
                  onClick={() => {
                    setPaypalForm(true);
                    setBancoOuPaypal(false);
                  }}
                >
                  <FaPaypal />
                  <h3>Adicionar Paypal</h3>
                </div>
                <div
                  className="select"
                  onClick={() => {
                    setBankForm(true);
                    setBancoOuPaypal(false);
                  }}
                >
                  <FaUniversity />
                  <h3>Adicionar Banco</h3>
                </div>
              </div>
            </div>
          )}
          {paypalForm && (
            <form
              className="form-modal"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onSubmit={enviaPaypal}
            >
              <FaTimes
                className="close"
                onClick={() => {
                  showPop(false);
                  setPaypalForm(false);
                }}
              />
              <h2>Adicionar Paypal</h2>
              <p>Adicione uma conta paypal</p>
              <br />
              <label htmlFor="emailPaypal">Email</label>
              <input
                type="email"
                name="emailPaypal"
                id="nome"
                value={emailPaypal}
                placeholder="Ex.: email@gmail.com"
                onChange={(e) => setEmailPaypal(e.target.value)}
                required
              />

              <div className="buttons">
                <button
                  type="button"
                  onClick={() => {
                    showPop(false);
                    setPaypalForm(false);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          )}
          {bankForm && (
            <form
              className="form-modal"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onSubmit={enviaBank}
            >
              <FaTimes
                className="close"
                onClick={() => {
                  showPop(false);
                  setBankForm(false);
                }}
              />
              <h2>Adicionar Banco</h2>
              <p>Adicione uma conta bancária</p>
              <br />
              <label htmlFor="nome">Nome do banco</label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={nomeBanco}
                placeholder="Ex.: Banco Inter"
                onChange={(e) => setNomeBanco(e.target.value)}
              />

              <label htmlFor="conta">Conta</label>
              <input
                type="number"
                name="conta"
                id="conta"
                value={contaBanco}
                placeholder="Ex.: 123456"
                onChange={(e) => setContaBanco(e.target.value)}
              />

              <label htmlFor="agencia">Agência</label>
              <input
                type="text"
                name="agencia"
                id="agencia"
                value={agenciaBanco}
                placeholder="Ex.: 12345-6"
                onChange={(e) => setAgenciaBanco(e.target.value)}
              />

              <div className="buttons">
                <button
                  type="button"
                  onClick={() => {
                    showPop(false);
                    setBankForm(false);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default Finances;
