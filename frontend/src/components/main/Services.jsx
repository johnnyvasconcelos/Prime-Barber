import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";
const Services = () => {
  const [dados, setDados] = useState([]);
  useEffect(() => {
    fetch("https://prime-barber-dash.onrender.com/")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setDados(dados);
      })
      .catch((error) => console.error(error));
  }, []);
  const dadosParaGrafico = [
    { dia: trataData(dados[0]?.data), faturamento: dados[0]?.faturamento },
    { dia: trataData(dados[1]?.data), faturamento: dados[1]?.faturamento },
    { dia: trataData(dados[2]?.data), faturamento: dados[2]?.faturamento },
    { dia: trataData(dados[3]?.data), faturamento: dados[3]?.faturamento },
    { dia: trataData(dados[4]?.data), faturamento: dados[4]?.faturamento },
    { dia: trataData(dados[5]?.data), faturamento: dados[5]?.faturamento },
    { dia: trataData(dados[6]?.data), faturamento: dados[6]?.faturamento },
  ];
  const dadosPizza = [
    {
      name: "Corte Simples",
      value: dados.filter((item) => item.nome_servico === "Corte Simples")
        .length,
      color: "#5758ed",
    },
    {
      name: "Corte + Barba",
      value: dados.filter((item) => item.nome_servico === "Corte + Barba")
        .length,
      color: "#27ae60",
    },
    {
      name: "Barba",
      value: dados.filter((item) => item.nome_servico === "Barba").length,
      color: "#2f80ed",
    },
    {
      name: "Outros",
      value: dados.filter(
        (item) =>
          !["Corte Simples", "Corte + Barba", "Barba"].includes(
            item.nome_servico,
          ),
      ).length,
      color: "#959292",
    },
  ];
  function trataData(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
  }
  const totalFaturamento = dados.length;
  function obterPorcentagem(valorItem) {
    if (!totalFaturamento) return 0;
    return ((Number(valorItem) / totalFaturamento) * 100).toFixed(0);
  }
  return (
    <section className="content__services">
      <div className="content__container">
        <div className="content__first">
          <div className="content__revenue">
            <h3 className="h3">
              <strong>Faturamento</strong> (últimos 7 dias)
            </h3>
            <LineChart width={"100%"} height={300} data={dadosParaGrafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis tickFormatter={(valor) => `R$ ${valor}`} />
              <Tooltip formatter={(valor) => [`R$ ${valor}`, "Faturamento"]} />
              <Line
                type="monotone"
                dataKey="faturamento"
                strokeWidth={3}
                stroke="#5758ed"
              />
            </LineChart>
          </div>
        </div>
        <div className="content__second">
          <div
            className="content__performand"
            style={{ width: "100%", height: 300 }}
          >
            <h3 className="h3">
              <strong>Serviços mais Realizados</strong>
            </h3>
            <div className="content__pizza">
              <div className="content__chart">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      formatter={(value) => `${obterPorcentagem(value)}%`}
                    />
                    <Pie
                      data={dadosPizza}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {dadosPizza.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <table className="content__dat">
                <tbody>
                  <tr>
                    <td></td>
                    <td>Corte Simples</td>
                    <td>{obterPorcentagem(dadosPizza[0].value)}%</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>Corte + Barba</td>
                    <td>{obterPorcentagem(dadosPizza[1].value)}%</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>Barba</td>
                    <td>{obterPorcentagem(dadosPizza[2].value)}%</td>
                  </tr>

                  <tr>
                    <td></td>
                    <td>Outros</td>
                    <td>{obterPorcentagem(dadosPizza[3].value)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
