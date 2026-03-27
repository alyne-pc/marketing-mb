import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";

/**
 * Mission Brasil - Dashboard Page
 * Design: Management panel with request table
 * Features: Request list, approval/rejection actions, status tracking
 */
export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [requests] = useState([
    {
      id: 1,
      name: "João Silva",
      email: "joao.silva@empresa.com",
      size: "M",
      model: "Tradicional",
      date: "23.05.2024 / 22:30",
      status: "Aguardando",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria.santos@empresa.com",
      size: "P",
      model: "Baby Look",
      date: "24.05.2024 / 10:15",
      status: "Aprovada",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro.costa@empresa.com",
      size: "G",
      model: "Tradicional",
      date: "25.05.2024 / 14:45",
      status: "Aguardando",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovada":
        return "bg-[#bcd15d]/20 text-[#bcd15d]";
      case "Rejeitada":
        return "bg-[#ffb4ab]/20 text-[#ffb4ab]";
      default:
        return "bg-[#c3c6cf]/10 text-[#c3c6cf]";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#111127]/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(83,210,255,0.15)]">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <button
            onClick={() => setLocation("/")}
            className="text-2xl font-bold text-[#5fd4ff] tracking-tighter hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Mission Brasil
          </button>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setLocation("/request")}
              className="text-[#c3c6cf] hover:text-[#5fd4ff] transition-colors font-bold tracking-[0.05em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Solicitação
            </button>
            <span className="text-[#ffffff] border-b-2 border-[#5fd4ff] pb-1 font-bold tracking-[0.05em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#5fd4ff] hover:scale-105 transition-transform duration-200">
              <span className="material-symbols-outlined text-3xl">account_circle</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-20 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <header className="mb-12">
            <span className="text-[#5fd4ff] tracking-widest text-[11px] uppercase mb-2 block font-bold">
              Central de Operações
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-[0.05em] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Dashboard de Gestão
            </h1>
            <p className="text-[#c3c6cf] max-w-2xl">
              Monitore e gerencie todas as solicitações de camisetas corporativas em tempo real.
            </p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#1b1b32] border border-[#5fd4ff]/30 rounded p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#c3c6cf] text-sm uppercase tracking-widest block mb-2">
                    Total de Solicitações
                  </span>
                  <span className="text-4xl font-bold text-[#5fd4ff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {requests.length}
                  </span>
                </div>
                <span className="material-symbols-outlined text-5xl text-[#5fd4ff]/30">
                  assignment
                </span>
              </div>
            </div>

            <div className="bg-[#1b1b32] border border-[#bcd15d]/30 rounded p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#c3c6cf] text-sm uppercase tracking-widest block mb-2">
                    Aprovadas
                  </span>
                  <span className="text-4xl font-bold text-[#bcd15d]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {requests.filter((r) => r.status === "Aprovada").length}
                  </span>
                </div>
                <span className="material-symbols-outlined text-5xl text-[#bcd15d]/30">
                  check_circle
                </span>
              </div>
            </div>

            <div className="bg-[#1b1b32] border border-[#8fcdff]/30 rounded p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#c3c6cf] text-sm uppercase tracking-widest block mb-2">
                    Aguardando
                  </span>
                  <span className="text-4xl font-bold text-[#8fcdff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {requests.filter((r) => r.status === "Aguardando").length}
                  </span>
                </div>
                <span className="material-symbols-outlined text-5xl text-[#8fcdff]/30">
                  schedule
                </span>
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-[#1b1b32] border border-[#5fd4ff]/30 rounded shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0f0f1f] border-b border-[#42474e]/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#5fd4ff] uppercase tracking-widest">
                      Nome
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#5fd4ff] uppercase tracking-widest">
                      E-mail
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#5fd4ff] uppercase tracking-widest">
                      Tamanho
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#5fd4ff] uppercase tracking-widest">
                      Modelo
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#5fd4ff] uppercase tracking-widest">
                      Data
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#5fd4ff] uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-[#5fd4ff] uppercase tracking-widest">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, index) => (
                    <tr
                      key={request.id}
                      className={`border-b border-[#42474e]/20 hover:bg-[#262626]/50 transition-colors ${
                        index % 2 === 0 ? "bg-[#1d1d34]/50" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-white font-medium">
                        {request.name}
                      </td>
                      <td className="px-6 py-4 text-xs text-[#c3c6cf]">
                        {request.email}
                      </td>
                      <td className="px-6 py-4 text-xs text-[#c3c6cf]">
                        {request.size}
                      </td>
                      <td className="px-6 py-4 text-xs text-[#c3c6cf]">
                        {request.model}
                      </td>
                      <td className="px-6 py-4 text-xs text-[#c3c6cf]">
                        {request.date}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            className="p-2 bg-[#bcd15d]/20 text-[#bcd15d] rounded hover:bg-[#bcd15d] hover:text-[#003259] transition-all"
                            title="Aprovar"
                          >
                            <span className="material-symbols-outlined text-sm">check</span>
                          </button>
                          <button
                            className="p-2 bg-[#ffb4ab]/20 text-[#ffb4ab] rounded hover:bg-[#ffb4ab] hover:text-[#690005] transition-all"
                            title="Rejeitar"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                          <button
                            className="p-2 bg-[#5fd4ff]/20 text-[#5fd4ff] rounded hover:bg-[#5fd4ff] hover:text-[#003259] transition-all"
                            title="Entregar"
                          >
                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-[#42474e]/20 flex justify-center">
              <button className="text-xs font-bold uppercase text-[#c3c6cf] hover:text-[#5fd4ff] transition-colors tracking-widest">
                Ver Todas as Solicitações
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#111127] w-full py-12 border-t border-[#42474e]/20 z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 w-full gap-4 max-w-7xl mx-auto">
          <div className="font-bold text-[#5fd4ff] text-sm tracking-widest hidden md:block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            MISSION BRASIL
          </div>
          <p className="text-[#c3c6cf] text-xs tracking-widest uppercase text-center md:text-left">
            © Mission Brasil - The Celestial Navigator
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs tracking-widest uppercase text-[#c3c6cf] hover:text-[#5fd4ff] hover:translate-y-[-2px] transition-all">
              Regulamento
            </a>
            <a href="#" className="text-xs tracking-widest uppercase text-[#c3c6cf] hover:text-[#5fd4ff] hover:translate-y-[-2px] transition-all">
              Privacidade
            </a>
            <a href="#" className="text-xs tracking-widest uppercase text-[#c3c6cf] hover:text-[#5fd4ff] hover:translate-y-[-2px] transition-all">
              Suporte
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
