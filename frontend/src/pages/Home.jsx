import Aside from "../components/aside/Aside.jsx";
import Main from "../components/main/Main.jsx";
import { useState, useEffect } from "react";

const Home = () => {
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
      <Aside menu={menu} setMenu={setMenu} active="home" />
      {/* main content */}
      <Main
        userMenu={userMenu}
        setUserMenu={setUserMenu}
        menu={menu}
        setMenu={setMenu}
      />
    </div>
  );
};

export default Home;
