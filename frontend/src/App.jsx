import "./App.css";
import { useState } from "react";

import Aside from "./components/aside/Aside.jsx";
import Main from "./components/main/Main.jsx";

const App = () => {
  const [menu, setMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  return (
    <div className="app">
      {/* aside */}
      <Aside menu={menu} setMenu={setMenu} />
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

export default App;
