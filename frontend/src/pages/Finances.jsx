import Aside from "../components/aside/Aside.jsx";
import MainFinances from "../components/main/MainFinances.jsx";
import { useState } from "react";

const Finances = () => {
  const [menu, setMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  return (
    <div className="app">
      {/* aside */}
      <Aside menu={menu} setMenu={setMenu} active="financeiro" />
      {/* main content */}
      <MainFinances
        userMenu={userMenu}
        setUserMenu={setUserMenu}
        menu={menu}
        setMenu={setMenu}
      />
    </div>
  );
};

export default Finances;
