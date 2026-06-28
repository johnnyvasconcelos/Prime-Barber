import Aside from "../components/aside/Aside.jsx";
import MainSettings from "../components/main/MainSettings.jsx";
import { useState, useEffect } from "react";

const Settings = () => {
  useEffect(() => {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
      window.location.replace("/login");
    }
  }, []);
  const [menu, setMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  return (
    <div className="app">
      {/* aside */}
      <Aside menu={menu} setMenu={setMenu} active="configuracoes" />
      {/* main content */}
      <MainSettings
        userMenu={userMenu}
        setUserMenu={setUserMenu}
        menu={menu}
        setMenu={setMenu}
      />
    </div>
  );
};

export default Settings;
