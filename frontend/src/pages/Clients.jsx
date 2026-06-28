import Aside from "../components/aside/Aside.jsx";
import MainClients from "../components/main/MainClients.jsx";
import { useState, useEffect } from "react";

const Clients = () => {
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
