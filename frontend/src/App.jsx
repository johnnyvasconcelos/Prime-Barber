import "./App.css";

import Aside from "./components/Aside.jsx";
import Main from "./components/Main.jsx";

const App = () => {
  return (
    <div className="app">
      {/* aside */}
      <Aside />
      {/* main content */}
      <Main />
    </div>
  );
};

export default App;
