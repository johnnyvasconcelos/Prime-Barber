import {
  FaBars,
  FaSearch,
  FaChevronDown,
  FaBell,
  FaCog,
  FaDoorOpen,
} from "react-icons/fa";
const TopBar = ({ menu, setMenu, userMenu, setUserMenu }) => {
  return (
    <nav className="content__nav">
      <div className="content__container">
        <div className="content__after">
          <FaBars
            onClick={() => {
              setMenu(!menu);
            }}
          />
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
                <a href="#"> Configurações</a>
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
