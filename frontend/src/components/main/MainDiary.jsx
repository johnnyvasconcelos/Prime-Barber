import TopBar from "./TopBar";
import Diary from "./Diary";
import MainHeader from "./MainHeader";
import "./_Main.css";

const MainDiary = ({ menu, setMenu, userMenu, setUserMenu }) => {
  return (
    <main className="content__main">
      <TopBar
        menu={menu}
        setMenu={setMenu}
        userMenu={userMenu}
        setUserMenu={setUserMenu}
      />
      <MainHeader title="Agenda" subtitle="Consulte e Agende Cortes!" />
      <Diary />
    </main>
  );
};

export default MainDiary;
