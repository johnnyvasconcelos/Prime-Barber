import TopBar from "./TopBar";
import Settings from "./Settings";
import MainHeader from "./MainHeader";
import "./_Main.css";

const MainSettings = ({ menu, setMenu, userMenu, setUserMenu }) => {
  return (
    <main className="content__main">
      <TopBar
        menu={menu}
        setMenu={setMenu}
        userMenu={userMenu}
        setUserMenu={setUserMenu}
      />
      <MainHeader
        title="Configurações"
        subtitle="Configure dashboard e usuário!"
      />
      <Settings />
    </main>
  );
};

export default MainSettings;
