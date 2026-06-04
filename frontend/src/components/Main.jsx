import { FaBars, FaSearch, FaChevronDown, FaBell } from "react-icons/fa";
import "./Main.css";

const Main = () => {
  return (
    <main className="content__main">
      <nav className="content__nav">
        <div className="content__container">
          <div className="content__after">
            <FaBars />
            <form className="content__search">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Buscar clientes, agendamentos"
              />
              <FaSearch />
            </form>
          </div>
          <div className="content__before">
            <div className="content__notification">
              <FaBell />
              <span>0</span>
            </div>
            <div className="content__user">
              <img src="/images/user.webp" alt="User" />
              <div>
                <strong>Convidado</strong>
                <p>Admnin</p>
              </div>
              <FaChevronDown />
            </div>
          </div>
        </div>
      </nav>
      <header className="content__header">
        <div className="content__container">
          <h1>Dashboard</h1>
          <p>Olá, Lino! Veja o resumo da sua barbearia hoje!</p>
        </div>
      </header>
    </main>
  );
};

export default Main;
