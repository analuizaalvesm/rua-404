import axios from "axios";
import React, { useState } from "react";

const Report: React.FC = () => {
  const [reportType, setReportType] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    if (!reportType) {
      alert("Por favor, selecione um tipo de relatório.");
      return;
    }

    setIsDownloading(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/report/baixar`,
        {
          params: { tipoRelatorio: reportType },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Relatorio.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar o relatório:", error);
      alert("Erro ao gerar o relatório. Por favor, tente novamente.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Relatórios</h1>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Selecione o tipo de relatório:</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Selecione...</option>
          <option value="estoque">Relatório de Estoque</option>
          <option value="usuarios">Relatório de Usuários</option>
          <option value="pedidos">Relatório de Pedidos</option>
        </select>
      </div>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`px-4 py-2 text-white rounded-md ${isDownloading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
          }`}
      >
        {isDownloading ? "Baixando..." : "Baixar Relatório"}
      </button>
    </div>
  );
};

export default Report;
