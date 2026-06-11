import TopBar from "./TopBar";
import Clientes from "./Clientes";
import MainHeader from "./MainHeader";
import "./_Main.css";

const MainClients = ({ menu, setMenu, userMenu, setUserMenu }) => {
  return (
    <main className="content__main">
      <TopBar
        menu={menu}
        setMenu={setMenu}
        userMenu={userMenu}
        setUserMenu={setUserMenu}
      />
      <MainHeader title="Clientes" subtitle="Lista de clientes!" />
      <Clientes />
    </main>
  );
};

export default MainClients;
