import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Finances from "./pages/Finances";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/financeiro" element={<Finances />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
