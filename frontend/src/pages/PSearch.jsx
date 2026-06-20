import MainPSearch from "../components/main/MainPSearch";
import { useEffect, useState } from "react";
import "../components/main/_Main.css";
import { useSearchParams } from "react-router-dom";
import Aside from "../components/aside/Aside.jsx";

const PSearch = ({ menu, setMenu }) => {
  const [searchParams] = useSearchParams();
  const [resultados, setResultados] = useState([]);
  const termo = searchParams.get("q");

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await fetch(`http://localhost:3500/search?q=${termo}`);
        const dados = await response.json();
        setResultados(dados);
      } catch (error) {
        console.error(error);
      }
    };

    if (termo) {
      buscarDados();
    }
  }, [termo, setResultados]);

  return (
    <div className="app">
      <Aside menu={menu} setMenu={setMenu} active="clientes" />
      <MainPSearch
        title="Pesquisa"
        subtitle="Resultados de pesquisa!"
        menu={menu}
        setMenu={setMenu}
        resultados={resultados}
      />
    </div>
  );
};

export default PSearch;
