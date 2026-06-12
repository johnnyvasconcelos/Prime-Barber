import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Services from "./pages/Services";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/servicos" element={<Services />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
