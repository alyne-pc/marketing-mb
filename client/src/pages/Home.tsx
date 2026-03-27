import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

/**
 * Mission Brasil - Home/Landing Page
 * Design: Space-themed celestial navigator with cyan/blue accents
 * Features: Hero section with CTA, navigation to request form
 */
export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#111127]/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(83,210,255,0.15)]">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-[#5fd4ff] tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Mission Brasil
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setLocation("/request")}
              className="text-[#c3c6cf] hover:text-[#5fd4ff] transition-colors font-bold tracking-[0.05em] hover:scale-105 transition-transform duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Solicitação
            </button>
            <button
              onClick={() => setLocation("/dashboard")}
              className="text-[#c3c6cf] hover:text-[#5fd4ff] transition-colors font-bold tracking-[0.05em] hover:scale-105 transition-transform duration-200"
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

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 relative overflow-hidden px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 constellation-bg pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#003259]/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#5fd4ff]/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Hero Section */}
        <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center space-y-8">
          {/* Rocket Icon */}
          <div className="mb-8 relative group">
            <div className="text-[120px] animate-bounce select-none">
              🚀
            </div>
            {/* Particles / Flames */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-3 h-8 bg-gradient-to-t from-transparent via-[#5fd4ff]/40 to-[#5fd4ff] rounded-full blur-sm opacity-60"></div>
              <div className="w-4 h-12 bg-gradient-to-t from-transparent via-[#5fd4ff]/60 to-[#5fd4ff] rounded-full blur-md"></div>
              <div className="w-3 h-8 bg-gradient-to-t from-transparent via-[#5fd4ff]/40 to-[#5fd4ff] rounded-full blur-sm opacity-60"></div>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <span className="text-[#5fd4ff] tracking-[0.15em] font-bold uppercase text-[11px] block">
              Bem-vindo à Jornada
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-[#5fd4ff] leading-tight tracking-[0.05em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Solicitação de Camiseta Corporativa
            </h1>
            <p className="text-xl md:text-2xl text-[#c3c6cf] font-medium opacity-90 max-w-2xl mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Explore nossa política de distribuição e prepare-se para o lançamento da sua missão.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4 flex gap-4 flex-col sm:flex-row justify-center">
            <Button
              onClick={() => setLocation("/request")}
              className="group relative px-10 py-4 bg-gradient-to-r from-[#5fd4ff] to-[#3bb4ff] text-[#003259] font-bold rounded text-lg overflow-hidden shadow-[0_10px_30px_rgba(83,210,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 justify-center"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="relative z-10">Iniciar Solicitação</span>
              <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">rocket_launch</span>
            </Button>
            <Button
              onClick={() => setLocation("/confirmation")}
              variant="outline"
              className="px-10 py-4 border-[#5fd4ff]/30 text-[#5fd4ff] hover:bg-[#5fd4ff]/10 rounded font-bold text-lg transition-all"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Ver Exemplo
            </Button>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3 mt-8">
            <span className="w-2 h-2 rounded-full bg-[#bcd15d] animate-pulse"></span>
            <span className="text-xs font-label text-[#c3c6cf]/60 tracking-[0.2em] uppercase">
              Status: Sistema Operacional
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
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
