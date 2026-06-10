import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import Info from "./Info";
import Services from "./Services";
import Apointments from "./Apointments";
import "./_Main.css";

const Main = ({ menu, setMenu, userMenu, setUserMenu }) => {
  return (
    <main className="content__main">
      <TopBar
        menu={menu}
        setMenu={setMenu}
        userMenu={userMenu}
        setUserMenu={setUserMenu}
      />
      <MainHeader />
      <Info />
      <Services />
      <Apointments />
    </main>
  );
};

export default Main;
