import TopBar from "./TopBar";
import "./_Main.css";
import { useSearchParams } from "react-router-dom";

const MainPSearch = ({ menu, setMenu, userMenu, setUserMenu, resultados }) => {
  const [searchParams] = useSearchParams();
  const termo = searchParams.get("q");

  return (
    <main className="content__main">
      <TopBar
        menu={menu}
        setMenu={setMenu}
        userMenu={userMenu}
        setUserMenu={setUserMenu}
      />
      <div className="content__container">
        <div className="results-page">
          <h2>Resultados para: "{termo}"</h2>
          <br />
          <p>Total encontrado: {resultados.length}</p>
          {resultados.length > 0 ? (
            <table class="content__table">
              {resultados.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.nome} - {item.servico}
                  </td>
                  <td>
                    <a href="/clientes">Acessar</a>
                  </td>
                </tr>
              ))}
            </table>
          ) : (
            <p>Nenhum agendamento encontrado.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainPSearch;
