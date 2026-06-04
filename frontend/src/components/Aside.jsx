import "./Aside.css";

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

const Aside = () => {
  return (
    <aside className="aside__main">
      <img
        src="/images/logo.webp"
        alt="Prime Barber White Logo"
        className="aside__logo"
      />
      <div className="aside__container">
        {/* nav menu */}
        <nav className="aside__nav">
          <ul className="aside__menu">
            <li className="aside__item">
              <a href="#" className="aside__link aside__link--active">
                <FaHome /> Início
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaCalendarAlt /> Agenda
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaUsers /> Clientes
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaCut /> Serviços
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaDollarSign /> Financeiro
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaChartBar /> Relatório
              </a>
            </li>
            <li className="aside__item">
              <a href="#" className="aside__link">
                <FaCog /> Configurações
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
