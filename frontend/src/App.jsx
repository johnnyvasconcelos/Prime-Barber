import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Finances from "./pages/Finances";
import PSearch from "./pages/PSearch";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Diary from "./pages/Diary";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/financeiro" element={<Finances />} />
        <Route path="/relatorios" element={<Reports />} />
        <Route path="/configuracoes" element={<Settings />} />
        <Route path="/agenda" element={<Diary />} />
        <Route path="/search" element={<PSearch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
