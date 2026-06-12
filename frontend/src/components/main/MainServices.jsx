import TopBar from "./TopBar";
import Services from "./ServicesPage";
import MainHeader from "./MainHeader";
import "./_Main.css";

const MainServices = ({ menu, setMenu, userMenu, setUserMenu }) => {
  return (
    <main className="content__main">
      <TopBar
        menu={menu}
        setMenu={setMenu}
        userMenu={userMenu}
        setUserMenu={setUserMenu}
      />
      <MainHeader title="Services" subtitle="Lista de serviços!" />
      <Services />
    </main>
  );
};

export default MainServices;
