import {
  FaEllipsisV,
  FaPlus,
  FaArrowDown,
  FaPaypal,
  FaTrash,
  FaUniversity,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const Finances = ({ setEntradas, atualizarTela }) => {
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
  const [abreMenuzim1, setAbreMenuzim1] = useState(false);
  const [abreMenuzim2, setAbreMenuzim2] = useState(false);
  const [addMoney, setAddMoney] = useState(false);
  const [withdrawMoney, setWithdrawMoney] = useState(false);
  const [dinheiroAdd, setDinheiroAdd] = useState(0);
  const [dinheiroWithdraw, setDinheiroWithdraw] = useState(0);
  const [dinheiroAtual, setDinheiroAtual] = useState(0);
  const [agendamentos, setAgendamentos] = useState([]);
  const [history, setHistory] = useState([]);

  let tableServices = [];
  let tableHistoryEntradas = [];
  let tableHistorySaidas = [];

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

  const buscarBancos = () => {
    fetch("http://https://prime-barber-dash.onrender.com/bancos")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados && dados.length > 0) {
          setBanco(dados[0]);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch("http://https://prime-barber-dash.onrender.com/historico-itens")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados && dados.length > 0) {
          setHistory(dados);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  async function mudarStatus(id, valor) {
    try {
      const url = `http://https://prime-barber-dash.onrender.com/clientes/status?id=${id}&atendido=${valor}`;
      const response = await fetch(url, { method: "PUT" });

      if (!response.ok) {
        alert("Erro ao mudar.");
      } else {
        buscarBancos();
      }
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  }

  for (const agendamento of agendamentos) {
    tableServices.push(
      <tr key={agendamento.id}>
        <td>{agendamento.nome_servico}</td>
        <td>{agendamento.cliente}</td>
        <td>{agendamento.faturamento}</td>
        <td>
          <select
            value={agendamento.atendido}
            onChange={(e) =>
              mudarStatus(agendamento.id, Number(e.target.value))
            }
          >
            <option value={1}>Confirmado</option>
            <option value={0}>Pendente</option>
          </select>
        </td>
      </tr>,
    );
  }

  for (const item of history) {
    if (item.entrada > 0.0) {
      tableHistoryEntradas.push(
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.entrada}</td>
          <td>{item.data}</td>
        </tr>,
      );
    }
  }

  for (const item of history) {
    if (item.saida > 0.0) {
      tableHistorySaidas.push(
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.saida}</td>
          <td>{item.data}</td>
        </tr>,
      );
    }
  }

  useEffect(() => {
    fetch("http://https://prime-barber-dash.onrender.com/clientes")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados && dados.length > 0) {
          setAgendamentos(dados);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://https://prime-barber-dash.onrender.com/dinheiro")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados && dados.length > 0) {
          setDinheiroAtual(dados[0].saldo);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://https://prime-barber-dash.onrender.com/bancos")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados && dados.length > 0) {
          setBanco(dados[0]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(dinheiroAtual);

  useEffect(() => {
    fetch("http://https://prime-barber-dash.onrender.com/paypal")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados && dados.length > 0) {
          setPaypal(dados[0]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  async function enviaPaypal() {
    try {
      const url = `http://https://prime-barber-dash.onrender.com/paypal/item?email=${encodeURIComponent(emailPaypal)}`;
      const response = await fetch(url);
      if (!response.ok) {
        alert("Erro");
      } else {
        setPaypalForm(false);
        showPop(false);
        buscarPaypal();
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  async function enviaBank() {
    try {
      const url = `http://https://prime-barber-dash.onrender.com/banco/item?nome=${encodeURIComponent(nomeBanco)}&conta=${encodeURIComponent(contaBanco)}&agencia=${encodeURIComponent(agenciaBanco)}`;
      const response = await fetch(url);
      if (!response.ok) {
        alert("Erro.");
      } else {
        setBankForm(false);
        showPop(false);
        buscarBancos();
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  async function deletaBank() {
    try {
      const response = await fetch(
        "http://https://prime-barber-dash.onrender.com/bancos/deletar",
      );
      if (!response.ok) {
        alert("Erro.");
      } else {
        setBanco({
          nome: "",
          agencia: "",
          conta: "",
          verificado: false,
        });
        setAbreMenuzim1(false);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  const buscarPaypal = () => {
    fetch("http://https://prime-barber-dash.onrender.com/paypal")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados && dados.length > 0) {
          setPaypal(dados[0]);
        }
      })
      .catch((error) => console.error(error));
  };

  async function deletaPaypal() {
    try {
      const response = await fetch(
        "http://https://prime-barber-dash.onrender.com/paypal/deletar",
      );
      if (!response.ok) {
        alert("Erro.");
      } else {
        setPaypal({
          email: "",
          verificado: false,
        });
        setAbreMenuzim2(false);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  async function enviaGrana() {
    try {
      const url = `http://https://prime-barber-dash.onrender.com/dinheiro/adicionar`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantidade: Number(dinheiroAdd) }),
      });

      if (!response.ok) {
        alert("Erro.");
      } else {
        setAddMoney(false);
        showPop(false);
        setEntradas(Number(dinheiroAdd));
        if (atualizarTela) atualizarTela();
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  async function retiraGrana() {
    try {
      const url = `http://https://prime-barber-dash.onrender.com/dinheiro/retirar`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantidade: dinheiroWithdraw }),
      });

      if (!response.ok) {
        alert("Erro.");
      } else {
        setWithdrawMoney(false);
        showPop(false);
        if (atualizarTela) atualizarTela();
      }
    } catch (error) {
      console.error("Erro:", error);
    }
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
                    {banco.nome !== "" && (
                      <div className="content__bank content__bank--bank">
                        <span className="bank">
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
                          <div
                            className="dotBase"
                            onClick={() => setAbreMenuzim1(!abreMenuzim1)}
                          >
                            <FaEllipsisV />
                            <ul
                              className={
                                abreMenuzim1
                                  ? "content__menu content__menu--active"
                                  : "content__menu"
                              }
                            >
                              <li>
                                <FaTrash />
                                &nbsp;
                                <a onClick={() => deletaBank()}>Remover</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {paypal.email && (
                      <div className="content__bank content__bank--paypal">
                        <span className="paypal">
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
                          <div
                            className="dotBase"
                            onClick={() => setAbreMenuzim2(!abreMenuzim2)}
                          >
                            <FaEllipsisV />
                            <ul
                              className={
                                abreMenuzim2
                                  ? "content__menu content__menu--active"
                                  : "content__menu"
                              }
                            >
                              <li>
                                <FaTrash />
                                &nbsp;
                                <a onClick={() => deletaPaypal()}>Remover</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
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
                    <div
                      className="content__element"
                      onClick={() => {
                        showPop(true);
                        setAddMoney(true);
                      }}
                    >
                      <span className="add">
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
                    <div
                      className="content__element"
                      onClick={() => {
                        showPop(true);
                        setWithdrawMoney(true);
                      }}
                    >
                      <span className="ret">
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
                    <div
                      className="content__element"
                      onClick={() => {
                        showPop(true);
                        setBankForm(true);
                      }}
                    >
                      <span className="build">
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
                    <div
                      className="content__element"
                      onClick={() => {
                        showPop(true);
                        setPaypalForm(true);
                      }}
                    >
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
              <article className="content__tab content__tab-100">
                <div>
                  <h3>Serviços em Conclusão</h3>
                </div>
                <table className="content__table">
                  <thead>
                    <tr>
                      <th>Serviço</th>
                      <th>Cliente</th>
                      <th>Preço</th>
                      <th>Pendente</th>
                    </tr>
                  </thead>
                  <tbody>{tableServices}</tbody>
                </table>
              </article>
            )}
            {historic && (
              <article className="content__tab content__tab-100">
                <div>
                  <h3>Histórico de Transações</h3>
                </div>
                <table className="content__table">
                  <thead>
                    <p>
                      <strong>Entradas:</strong>
                    </p>
                    <tr>
                      <th>ID</th>
                      <th>Valor da Entrada</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>{tableHistoryEntradas}</tbody>
                </table>
                <br />
                <table className="content__table">
                  <thead>
                    <p>
                      <strong>Saídas:</strong>
                    </p>
                    <tr>
                      <th>ID</th>
                      <th>Valor da Saída</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>{tableHistorySaidas}</tbody>
                </table>
              </article>
            )}
          </div>
        </div>
      </section>

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
            <div className="form-modal" onClick={(e) => e.stopPropagation()}>
              <FaTimes className="close" onClick={() => showPop(false)} />
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
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
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
          {addMoney && (
            <form
              className="form-modal"
              onClick={(e) => e.stopPropagation()}
              onSubmit={enviaGrana}
            >
              <FaTimes
                className="close"
                onClick={() => {
                  showPop(false);
                  setAddMoney(false);
                }}
              />
              <h2>Adicionar Dinheiro</h2>
              <p>Retirada da conta bancária ou paypal</p>
              <br />
              <label htmlFor="dinheiroAdd">Quantidade</label>
              <input
                type="number"
                name="dinheiroAdd"
                id="dinheiroAdd"
                value={dinheiroAdd}
                placeholder="Ex.: 100"
                onChange={(e) => setDinheiroAdd(e.target.value)}
                required
              />
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => {
                    showPop(false);
                    setAddMoney(false);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit">Adicionar</button>
              </div>
            </form>
          )}
          {withdrawMoney && (
            <form
              className="form-modal"
              onClick={(e) => e.stopPropagation()}
              onSubmit={retiraGrana}
            >
              <FaTimes
                className="close"
                onClick={() => {
                  showPop(false);
                  setWithdrawMoney(false);
                }}
              />
              <h2>Retirar Dinheiro</h2>
              <p>Adicionar para conta bancária ou paypal</p>
              <br />
              <label htmlFor="dinheiroWithdraw">Quantidade</label>
              <input
                type="number"
                name="dinheiroWithdraw"
                id="dinheiroWithdraw"
                value={dinheiroWithdraw}
                placeholder="Ex.: 100"
                onChange={(e) => setDinheiroWithdraw(e.target.value)}
                required
              />
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => {
                    showPop(false);
                    setWithdrawMoney(false);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit">Retirar</button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default Finances;
