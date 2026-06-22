import Aside from "../components/aside/Aside.jsx";
import MainReports from "../components/main/MainReports.jsx";
import { useState } from "react";

const Reports = () => {
  const [menu, setMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  return (
    <div className="app">
      {/* aside */}
      <Aside menu={menu} setMenu={setMenu} active="relatorios" />
      {/* main content */}
      <MainReports
        userMenu={userMenu}
        setUserMenu={setUserMenu}
        menu={menu}
        setMenu={setMenu}
      />
    </div>
  );
};

export default Reports;
