import Aside from "../components/aside/Aside.jsx";
import MainClients from "../components/main/MainClients.jsx";
import { useState } from "react";

const Clients = () => {
  const [menu, setMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  return (
    <div className="app">
      {/* aside */}
      <Aside menu={menu} setMenu={setMenu} active="clientes" />
      {/* main content */}
      <MainClients
        userMenu={userMenu}
        setUserMenu={setUserMenu}
        menu={menu}
        setMenu={setMenu}
      />
    </div>
  );
};

export default Clients;
