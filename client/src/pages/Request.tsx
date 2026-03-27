import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";

/**
 * Mission Brasil - Request Form Page
 * Design: Multi-step form with progress tracker
 * Features: Personal data, product details, and confirmation
 */
export default function Request() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    matricula: "",
    size: "M",
    model: "tradicional",
    agreed: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeClick = (size: string) => {
    setFormData((prev) => ({ ...prev, size }));
  };

  const handleModelChange = (model: string) => {
    setFormData((prev) => ({ ...prev, model }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form and redirect to confirmation
      setLocation("/confirmation");
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
            <span className="text-[#ffffff] border-b-2 border-[#5fd4ff] pb-1 font-bold tracking-[0.05em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Solicitação
            </span>
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
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-20 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <header className="mb-12 text-center md:text-left">
            <span className="text-[#5fd4ff] tracking-widest text-[11px] uppercase mb-2 block font-bold">
              Central de Operações
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-[0.05em] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Nova Solicitação
            </h1>
            <p className="text-[#c3c6cf] max-w-xl">
              Configure os parâmetros da sua missão e garanta seu traje oficial de explorador.
            </p>
          </header>

          {/* Progress Tracker */}
          <div className="mb-12 relative">
            <div className="flex justify-between items-center relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-[0_0_15px_rgba(95,212,255,0.5)] transition-all ${
                    step >= 1
                      ? "bg-[#5fd4ff] text-[#003259]"
                      : "bg-[#33324b] text-[#c3c6cf]"
                  }`}
                >
                  <span className="material-symbols-outlined">person</span>
                </div>
                <span className="mt-2 text-[11px] font-bold text-[#c3c6cf] uppercase tracking-wider">
                  Dados
                </span>
              </div>

              {/* Connector */}
              <div className="flex-grow h-0.5 mx-4 bg-[#33324b]">
                <div
                  className={`h-full transition-all ${
                    step >= 2 ? "w-full bg-[#5fd4ff]" : "w-1/2 bg-[#5fd4ff]"
                  }`}
                ></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= 2
                      ? "bg-[#5fd4ff] text-[#003259]"
                      : "bg-[#33324b] text-[#c3c6cf] border border-[#42474e]"
                  }`}
                >
                  <span className="material-symbols-outlined">checkroom</span>
                </div>
                <span className="mt-2 text-[11px] font-bold text-[#c3c6cf] uppercase tracking-wider">
                  Detalhes
                </span>
              </div>

              {/* Connector */}
              <div className="flex-grow h-0.5 mx-4 bg-[#33324b]">
                <div
                  className={`h-full transition-all ${
                    step >= 3 ? "w-full bg-[#5fd4ff]" : "w-0"
                  }`}
                ></div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= 3
                      ? "bg-[#5fd4ff] text-[#003259]"
                      : "bg-[#33324b] text-[#c3c6cf] border border-[#42474e]"
                  }`}
                >
                  <span className="material-symbols-outlined">description</span>
                </div>
                <span className="mt-2 text-[11px] font-bold text-[#c3c6cf] uppercase tracking-wider">
                  Resumo
                </span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Personal Data */}
            {step === 1 && (
              <section className="bg-[#1b1b32] border border-[#5fd4ff]/30 rounded p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-8 bg-[#5fd4ff]"></div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-[#5fd4ff]">assignment_ind</span>
                  <h2 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Dados Pessoais
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-white font-medium text-sm">Nome Completo</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#c3c6cf] group-focus-within:text-[#5fd4ff] transition-colors text-xl">
                        person
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Digite seu nome"
                        className="w-full bg-[#262626] border-[#2a2a4a] border text-white rounded pl-12 pr-4 py-3 focus:ring-1 focus:ring-[#5fd4ff] focus:border-[#5fd4ff] outline-none transition-all placeholder:text-[#42474e]/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-white font-medium text-sm">E-mail Corporativo</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#c3c6cf] group-focus-within:text-[#5fd4ff] transition-colors text-xl">
                        mail
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu.email@empresa.com"
                        className="w-full bg-[#262626] border-[#2a2a4a] border text-white rounded pl-12 pr-4 py-3 focus:ring-1 focus:ring-[#5fd4ff] focus:border-[#5fd4ff] outline-none transition-all placeholder:text-[#42474e]/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-white font-medium text-sm">Número de Matrícula</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#c3c6cf] group-focus-within:text-[#5fd4ff] transition-colors text-xl">
                        badge
                      </span>
                      <input
                        type="text"
                        name="matricula"
                        value={formData.matricula}
                        onChange={handleInputChange}
                        placeholder="M-000000"
                        className="w-full bg-[#262626] border-[#2a2a4a] border text-white rounded pl-12 pr-4 py-3 focus:ring-1 focus:ring-[#5fd4ff] focus:border-[#5fd4ff] outline-none transition-all placeholder:text-[#42474e]/50"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Step 2: Product Details */}
            {step === 2 && (
              <section className="bg-[#1b1b32] border border-[#5fd4ff]/30 rounded p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-8 bg-[#5fd4ff]"></div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-[#5fd4ff]">checkroom</span>
                  <h2 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Detalhes da Camiseta
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-white font-medium text-sm">Selecione o Tamanho</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["P", "M", "G", "GG"].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeClick(size)}
                          className={`py-3 rounded text-white font-bold transition-all ${
                            formData.size === size
                              ? "bg-[#5fd4ff]/10 border border-[#5fd4ff] text-[#5fd4ff]"
                              : "bg-[#262626] border border-[#2a2a4a] hover:border-[#5fd4ff] hover:text-[#5fd4ff]"
                          }`}
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-white font-medium text-sm">Modelo da Missão</label>
                    <div className="flex gap-4">
                      {["tradicional", "baby-look"].map((model) => (
                        <label key={model} className="flex-1 cursor-pointer group">
                          <input
                            type="radio"
                            name="model"
                            value={model}
                            checked={formData.model === model}
                            onChange={(e) => handleModelChange(e.target.value)}
                            className="hidden peer"
                          />
                          <div className="p-3 bg-[#262626] border border-[#2a2a4a] rounded text-center peer-checked:border-[#5fd4ff] peer-checked:bg-[#5fd4ff]/10 transition-all">
                            <div className="text-white group-hover:text-[#5fd4ff] font-medium capitalize">
                              {model === "tradicional" ? "Tradicional" : "Baby Look"}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-start gap-4 cursor-pointer select-none">
                      <div className="relative flex items-center mt-1">
                        <input
                          type="checkbox"
                          name="agreed"
                          checked={formData.agreed}
                          onChange={handleInputChange}
                          className="peer h-6 w-6 appearance-none rounded border border-[#42474e] bg-[#262626] checked:bg-[#5fd4ff] checked:border-[#5fd4ff] transition-all cursor-pointer"
                        />
                        <span className="material-symbols-outlined absolute opacity-0 peer-checked:opacity-100 text-[16px] left-1 text-[#003259] pointer-events-none">
                          check
                        </span>
                      </div>
                      <span className="text-[#c3c6cf] text-sm leading-tight">
                        Concordo com os termos de suprimentos e confirmo que meus dados estão corretos para o lançamento da produção.
                      </span>
                    </label>
                  </div>
                </div>
              </section>
            )}

            {/* Step 3: Summary */}
            {step === 3 && (
              <section className="bg-[#1b1b32] border border-[#5fd4ff]/30 rounded p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-8 bg-[#5fd4ff]"></div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-[#5fd4ff]">description</span>
                  <h2 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Resumo da Solicitação
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[#42474e]/20">
                    <span className="text-[#c3c6cf]">Nome Completo:</span>
                    <span className="text-white font-medium">{formData.fullName || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#42474e]/20">
                    <span className="text-[#c3c6cf]">E-mail:</span>
                    <span className="text-white font-medium">{formData.email || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#42474e]/20">
                    <span className="text-[#c3c6cf]">Matrícula:</span>
                    <span className="text-white font-medium">{formData.matricula || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#42474e]/20">
                    <span className="text-[#c3c6cf]">Tamanho:</span>
                    <span className="text-white font-medium">{formData.size}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-[#c3c6cf]">Modelo:</span>
                    <span className="text-white font-medium capitalize">
                      {formData.model === "tradicional" ? "Tradicional" : "Baby Look"}
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 gap-4">
              <Button
                type="button"
                onClick={() => {
                  if (step > 1) setStep(step - 1);
                  else setLocation("/");
                }}
                variant="outline"
                className="px-8 py-3 border-[#5fd4ff]/30 text-[#5fd4ff] hover:bg-[#5fd4ff]/10"
              >
                {step === 1 ? "Voltar" : "Anterior"}
              </Button>
              <Button
                type="submit"
                className="group relative px-10 py-3 bg-gradient-to-r from-[#5fd4ff] to-[#3bb4ff] text-[#003259] font-bold rounded overflow-hidden shadow-[0_4px_15px_rgba(83,210,255,0.1)] hover:shadow-[0_4px_25px_rgba(83,210,255,0.2)] hover:-translate-y-1 transition-all flex items-center gap-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="relative z-10">
                  {step === 3 ? "Enviar Solicitação" : "Próximo"}
                </span>
                <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  {step === 3 ? "check" : "arrow_forward"}
                </span>
              </Button>
            </div>
          </form>
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
