import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import InfoReports from "./InfoReports";
import Exports from "./Exports";
import "./_Main.css";

const MainReports = ({ menu, setMenu, userMenu, setUserMenu }) => {
  return (
    <main className="content__main">
      <TopBar
        menu={menu}
        setMenu={setMenu}
        userMenu={userMenu}
        setUserMenu={setUserMenu}
      />
      <MainHeader
        title="Relatórios"
        subtitle="Analise e exporte dados da barbearia!"
      />
      <Exports />
      <InfoReports />
    </main>
  );
};

export default MainReports;
