import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
const Exports = () => {
  const [clientes, setClientes] = useState([]);
  /* 
  const [filtros, setFiltros] = useState({
    dataInicial: "",
    dataFinal: "",
    profissional: "todos",
    servico: "",
  });
  */
  useEffect(() => {
    fetch("http://https://prime-barber-dash.onrender.com/clientes")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setClientes(dados);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const servicosUnicos = Array.from(
    new Set(clientes.map((cliente) => cliente.nome_servico)),
  );
  const exportarExcel = () => {
    const planilha = XLSX.utils.json_to_sheet(clientes);
    const pastaTrabalho = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(pastaTrabalho, planilha, "Clientes");
    XLSX.writeFile(pastaTrabalho, "dados.xlsx");
  };
  return (
    <>
      <br />
      <section className="content__exports">
        <div className="content__container content__expocontainer">
          <form className="export__filters">
            <div className="filter__card">
              <svg
                className="filter__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>

              <div className="filter__info">
                <label className="filter__label">Período Inicial</label>

                <input
                  type="date"
                  className="filter__value"
                  name="dataInicial"
                />
              </div>
            </div>

            <div className="filter__card">
              <svg
                className="filter__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>

              <div className="filter__info">
                <label className="filter__label">Período Final</label>

                <input type="date" className="filter__value" name="dataFinal" />
              </div>
            </div>

            <div className="filter__card">
              <svg
                className="filter__icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>

              <div className="filter__info">
                <label className="filter__label">Profissional</label>

                <select className="filter__value" name="profissional">
                  <option value="todos">Todos os profissionais</option>
                  <option value="Rodrigo">Rodrigo</option>
                  <option value="Luíz">Luíz</option>
                  <option value="Leomar">Leomar</option>
                  <option value="Rogério">Rogério</option>
                </select>
              </div>
            </div>

            <div className="filter__card">
              <svg
                className="filter__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <circle cx="4" cy="6" r="1.5" fill="currentColor"></circle>
                <circle cx="4" cy="12" r="1.5" fill="currentColor"></circle>
                <circle cx="4" cy="18" r="1.5" fill="currentColor"></circle>
              </svg>

              <div className="filter__info">
                <label className="filter__label">Serviço</label>

                <select className="filter__value" name="servico">
                  <option value="">Todos os serviços</option>
                  {servicosUnicos.map((servico) => (
                    <option key={servico} value={servico}>
                      {servico}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={exportarExcel}
              className="button__export"
            >
              Exportar Excel
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Exports;
