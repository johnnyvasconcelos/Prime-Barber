import Aside from "../components/aside/Aside.jsx";
import MainDiary from "../components/main/MainDiary.jsx";
import { useState } from "react";

const Diary = () => {
  const [menu, setMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  return (
    <div className="app">
      {/* aside */}
      <Aside menu={menu} setMenu={setMenu} active="agenda" />
      {/* main content */}
      <MainDiary
        userMenu={userMenu}
        setUserMenu={setUserMenu}
        menu={menu}
        setMenu={setMenu}
      />
    </div>
  );
};

export default Diary;
