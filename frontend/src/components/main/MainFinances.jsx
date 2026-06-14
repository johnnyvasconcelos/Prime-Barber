import TopBar from "./TopBar";
import Finances from "./Finances";
import MainHeader from "./MainHeader";
import InfoFinances from "./InfoFinances";
import "./_Main.css";

const MainFinances = ({ menu, setMenu, userMenu, setUserMenu }) => {
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
      <InfoFinances />
      <Finances />
    </main>
  );
};

export default MainFinances;
