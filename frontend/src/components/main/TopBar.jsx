import {
  FaBars,
  FaSearch,
  FaChevronDown,
  FaBell,
  FaCog,
  FaDoorOpen,
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const TopBar = ({ menu, setMenu, userMenu, setUserMenu }) => {
  const [busca, setBusca] = useState("");
  const navegar = useNavigate();

  const enviarBusca = (e) => {
    if (e) e.preventDefault();
    if (busca.trim()) {
      navegar(`/search?q=${busca}`);
    }
  };

  return (
    <nav className="content__nav">
      <div className="content__container">
        <div className="content__after">
          <FaBars
            onClick={() => {
              setMenu(!menu);
            }}
          />
          <form className="content__search" onSubmit={enviarBusca}>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Buscar clientes, agendamentos"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <FaSearch onClick={enviarBusca} style={{ cursor: "pointer" }} />
          </form>
        </div>
        <div className="content__before">
          <div className="content__notification">
            <FaBell />
            <span>0</span>
          </div>
          <div
            className="content__user"
            onClick={() => {
              setUserMenu(!userMenu);
            }}
          >
            <img src="/images/user.webp" alt="User" />
            <div>
              <strong>Convidado</strong>
              <p>Admnin</p>
            </div>
            <FaChevronDown />
            <ul
              className={
                userMenu
                  ? "content__menu content__menu--active"
                  : "content__menu"
              }
            >
              <li>
                <FaCog />
                <Link to="/configuracoes"> Configurações</Link>
              </li>
              <li>
                <FaDoorOpen />
                <a href="#"> Sair</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
