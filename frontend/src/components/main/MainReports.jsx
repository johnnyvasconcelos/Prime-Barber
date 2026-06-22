import TopBar from "./TopBar";
import Reports from "./Reports";
import MainHeader from "./MainHeader";
import InfoReports from "./InfoReports";
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
      <InfoReports />
      <Reports />
    </main>
  );
};

export default MainReports;
