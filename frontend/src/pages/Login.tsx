import { useState } from "react";

const Login = () => {
  /* 
  useEffect(() => {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
      window.location.replace("/login");
    }
  }, []);
  */
  const [user, setUser] = useState("convidado@teste.com");
  const [password, setPassword] = useState("@100Cem100!");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://192.168.1.2:3500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user,
          senha: password,
        }),
      });

      const dados = await response.json();

      if (dados.logado) {
        localStorage.setItem("usuario", JSON.stringify(dados.usuario));
        window.location.replace("/");
      } else {
        alert(dados.erro);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <div className="background-modal">
        <form onSubmit={submit} className="form-modal">
          <h2>Login</h2>

          <label>Login</label>
          <input
            id="user"
            type="text"
            value={user}
            name="user"
            onChange={(e) => setUser(e.target.value)}
          />

          <label>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="buttons">
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
