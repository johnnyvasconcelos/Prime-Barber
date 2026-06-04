import "./_Aside.css";
import CloseMenu from "./CloseMenu";

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

const Aside = ({ menu, setMenu }) => {
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
              <a href="#" className="aside__link aside__link--active">
                <FaHome /> <span>Início</span>
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaCalendarAlt /> <span>Agenda</span>
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaUsers /> <span>Clientes</span>
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaCut /> <span>Serviços</span>
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaDollarSign /> <span>Financeiro</span>
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaChartBar /> <span>Relatório</span>
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaCog /> <span>Configurações</span>
              </a>
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
