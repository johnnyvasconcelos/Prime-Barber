import "./_Aside.css";
import CloseMenu from "./CloseMenu";
import { Link } from "react-router-dom";

import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaCut,
  FaDollarSign,
  FaChartBar,
  FaCog,
  FaCrown,
} from "react-icons/fa";

const Aside = ({ menu, setMenu, active }) => {
  return (
    <aside
      className={`${menu ? "aside__main aside__main--active" : "aside__main"}`}
    >
      <img
        src="/images/logo.webp"
        alt="Prime Barber White Logo"
        className="aside__logo"
      />
      <img
        src="/images/logo-mobile.webp"
        alt="Prime Barber White Logo Mobile"
        className="aside__logo-mobile"
      />
      <div className="aside__container">
        <CloseMenu setMenu={setMenu} />
        {/* nav menu */}
        <nav className="aside__nav">
          <ul className="aside__menu">
            <li className="aside__item">
              <Link
                to="/"
                className={`${active === "home" ? "aside__link aside__link--active" : "aside__link"}`}
              >
                <FaHome /> <span>Home</span>
              </Link>
            </li>
            <li className="aside__item">
              <Link
                to="/agenda"
                className={`${active === "agenda" ? "aside__link aside__link--active" : "aside__link"}`}
              >
                <FaCalendarAlt /> <span>Agenda</span>
              </Link>
            </li>
            <li className="aside__item">
              <Link
                to="/clientes"
                className={`${active === "clientes" ? "aside__link aside__link--active" : "aside__link"}`}
              >
                <FaUsers /> <span>Clientes</span>
              </Link>
            </li>
            <li className="aside__item">
              <Link
                to="/servicos"
                className={`${active === "servicos" ? "aside__link aside__link--active" : "aside__link"}`}
              >
                <FaCut /> <span>Serviços</span>
              </Link>
            </li>
            <li className="aside__item">
              <Link
                to="/financeiro"
                className={`${active === "financeiro" ? "aside__link aside__link--active" : "aside__link"}`}
              >
                <FaDollarSign /> <span>Financeiro</span>
              </Link>
            </li>
            <li className="aside__item">
              <Link
                to="/relatorios"
                className={`${active === "relatorios" ? "aside__link aside__link--active" : "aside__link"}`}
              >
                <FaChartBar /> <span>Relatório</span>
              </Link>
            </li>
            <li className="aside__item">
              <Link
                to="/configuracoes"
                className={`${active === "configuracoes" ? "aside__link aside__link--active" : "aside__link"}`}
              >
                <FaCog /> <span>Configurações</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="aside__premium">
          <div className="aside__crown">
            <FaCrown />
          </div>
          <h3>Plano Premium</h3>
          <p>Seu plano expira em</p>
          <p>24/04/2026</p>
          <a href="#">Gerenciar Plano</a>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
