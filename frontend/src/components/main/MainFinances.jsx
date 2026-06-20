import TopBar from "./TopBar";
import Finances from "./Finances";
import MainHeader from "./MainHeader";
import InfoFinances from "./InfoFinances";
import { useState } from "react";
import "./_Main.css";

const MainFinances = ({ menu, setMenu, userMenu, setUserMenu }) => {
  const [entradas, setEntradas] = useState(0.2);
  return (
    <main className="content__main">
      <TopBar
        menu={menu}
        setMenu={setMenu}
        userMenu={userMenu}
        setUserMenu={setUserMenu}
      />
      <MainHeader
        title="Financeiro"
        subtitle="Contas bancárias e movimentações!"
      />
      <InfoFinances entradas={entradas} />
      <Finances setEntradas={setEntradas} />
    </main>
  );
};

export default MainFinances;
