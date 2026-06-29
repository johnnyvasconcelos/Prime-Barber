import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
const Settings = () => {
  const [users, setUsers] = useState([]);
  const [modalUser, showModalUser] = useState(false);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    fetch("http://https://prime-barber-dash.onrender.com/usuarios")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setUsers(dados);
      });
  }, []);

  async function deletarItem(id) {
    if (confirm("Remover o serviço?")) {
      try {
        const response = await fetch(
          `http://https://prime-barber-dash.onrender.com/usuarios/deletar?id=${id}`,
        );
        if (!response.ok) {
          alert("Erro ao remover.");
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error("Erro ao remover:", error);
      }
    }
  }

  async function enviar() {
    try {
      const response = await fetch(
        "http://https://prime-barber-dash.onrender.com/usuarios/item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nome,
            preco: email,
            password: password,
          }),
        },
      );

      if (!response.ok) {
        alert("Erro ao salvar.");
      } else {
        showModalUser(false);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }
  return (
    <>
      <section className="content__settings">
        <div className="content__container">
          <table className="content__table">
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Email</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td className="remover btn">
                      <span
                        onClick={() => {
                          deletarItem(user.id);
                        }}
                      >
                        <FaTrash />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <a
            href="#"
            class="more"
            onClick={() => {
              showModalUser(true);
            }}
          >
            Adicionar usuário&nbsp;&nbsp;
            <FaPlus />
          </a>
        </div>
      </section>
      {modalUser && (
        <div
          className="background-modal"
          onClick={() => {
            showModalUser(false);
          }}
        >
          <form
            className="form-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onSubmit={enviar}
          >
            <FaTimes
              className="close"
              onClick={() => {
                showModalUser(false);
              }}
            />
            <h2>Adicionar usuário</h2>
            <p>Preencha os dados para adicionar um novo usuário</p>
            <br />
            <label htmlFor="nome">Nome do usuário</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={nome}
              placeholder="Ex.: Corte Simples"
              onChange={(e) => setNome(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="ex@test.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="buttons">
              <button
                type="button"
                onClick={() => {
                  showModalUser(false);
                }}
              >
                Cancelar
              </button>
              <button type="submit">Adicionar usuário</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Settings;
