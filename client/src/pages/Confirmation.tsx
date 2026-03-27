import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

/**
 * Mission Brasil - Confirmation Page
 * Design: Success message with protocol info
 * Features: Rocket animation, status indicator, action buttons
 */
export default function Confirmation() {
  const [, setLocation] = useLocation();

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
            <button
              onClick={() => setLocation("/dashboard")}
              className="text-[#c3c6cf] hover:text-[#5fd4ff] transition-colors font-bold tracking-[0.05em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Dashboard
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#5fd4ff] hover:scale-105 transition-transform duration-200">
              <span className="material-symbols-outlined text-3xl">account_circle</span>
            </button>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5fd4ff]/20 to-transparent"></div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 relative overflow-hidden px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 constellation-bg pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#003259]/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#5fd4ff]/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Success Module */}
        <div className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center">
          {/* Rocket Illustration Container */}
          <div className="mb-12 relative group">
            <div className="text-[120px] rocket-launch select-none">
              🚀
            </div>
            {/* Particles / Flames */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-3 h-8 bg-gradient-to-t from-transparent via-[#5fd4ff]/40 to-[#5fd4ff] rounded-full blur-sm opacity-60"></div>
              <div className="w-4 h-12 bg-gradient-to-t from-transparent via-[#5fd4ff]/60 to-[#5fd4ff] rounded-full blur-md"></div>
              <div className="w-3 h-8 bg-gradient-to-t from-transparent via-[#5fd4ff]/40 to-[#5fd4ff] rounded-full blur-sm opacity-60"></div>
            </div>
          </div>

          {/* Elevated Data Module (Card) */}
          <div className="bg-[#1d1d34]/80 backdrop-blur-md p-10 rounded border-t-2 border-l-2 border-[#5fd4ff]/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full relative">
            {/* Checkmark Icon */}
            <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#bcd15d]/10 border-2 border-[#bcd15d]/30 shadow-[0_0_30px_rgba(188,209,93,0.2)]">
              <span className="material-symbols-outlined text-6xl text-[#bcd15d]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>

            {/* Messaging */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-[0.05em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ✓ Sua solicitação foi enviada com sucesso!
            </h2>
            <p className="text-[#c3c6cf] text-lg tracking-wide mb-10">
              Resultado em até 48 horas úteis
            </p>

            {/* Action Module */}
            <div className="flex flex-col items-center gap-6">
              <Button
                onClick={() => setLocation("/")}
                className="bg-[#2a2a4a] hover:bg-[#33335a] text-[#5fd4ff] px-10 py-4 rounded font-bold text-lg tracking-widest uppercase transition-all duration-300 border border-[#5fd4ff]/20 shadow-[0_4px_15px_rgba(83,210,255,0.1)] hover:shadow-[0_4px_25px_rgba(83,210,255,0.2)] hover:-translate-y-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Voltar ao Início
              </Button>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#bcd15d] animate-pulse"></span>
                <span className="text-xs text-[#c3c6cf]/60 tracking-[0.2em] uppercase">
                  Status: Missão em Processamento
                </span>
              </div>
            </div>
          </div>

          {/* Contextual Information (Asymmetric detail) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full opacity-60">
            <div className="bg-[#191930] p-4 rounded border-l border-[#5fd4ff]/20">
              <span className="block text-[10px] text-[#5fd4ff] mb-1 font-bold uppercase tracking-widest">
                PROTOCOLO
              </span>
              <span className="font-bold text-sm tracking-widest text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                #MB-2024-OX92
              </span>
            </div>
            <div className="bg-[#191930] p-4 rounded border-l border-[#5fd4ff]/20">
              <span className="block text-[10px] text-[#5fd4ff] mb-1 font-bold uppercase tracking-widest">
                DATA DE ENVIO
              </span>
              <span className="font-bold text-sm tracking-widest text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {new Date().toLocaleDateString("pt-BR")} {new Date().toLocaleTimeString("pt-BR")}
              </span>
            </div>
            <div className="bg-[#191930] p-4 rounded border-l border-[#5fd4ff]/20">
              <span className="block text-[10px] text-[#5fd4ff] mb-1 font-bold uppercase tracking-widest">
                CANAL
              </span>
              <span className="font-bold text-sm tracking-widest text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                PORTAL ESTELAR
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#111127] w-full py-12 border-t border-[#42474e]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 w-full gap-4 max-w-7xl mx-auto">
          <div className="text-xs tracking-widest uppercase text-[#c3c6cf]">
            © Mission Brasil - The Celestial Navigator
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs tracking-widest uppercase text-[#c3c6cf] hover:text-[#5fd4ff] hover:translate-y-[-2px] transition-all duration-300">
              Regulamento
            </a>
            <a href="#" className="text-xs tracking-widest uppercase text-[#c3c6cf] hover:text-[#5fd4ff] hover:translate-y-[-2px] transition-all duration-300">
              Privacidade
            </a>
            <a href="#" className="text-xs tracking-widest uppercase text-[#c3c6cf] hover:text-[#5fd4ff] hover:translate-y-[-2px] transition-all duration-300">
              Suporte
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
