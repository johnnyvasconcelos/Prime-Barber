import Aside from "../components/aside/Aside.jsx";
import MainServices from "../components/main/MainServices.jsx";
import { useState } from "react";

const Services = () => {
  const [menu, setMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  return (
    <div className="app">
      {/* aside */}
      <Aside menu={menu} setMenu={setMenu} active="servicos" />
      {/* main content */}
      <MainServices
        userMenu={userMenu}
        setUserMenu={setUserMenu}
        menu={menu}
        setMenu={setMenu}
      />
    </div>
  );
};

export default Services;
