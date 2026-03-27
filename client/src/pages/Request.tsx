import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/**
 * Mission Brasil - Request Form Page
 * Multi-step form for t-shirt requests with regulations modal
 */
export default function Request() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [showRegulations, setShowRegulations] = useState(false);
  const [agreedToRegulations, setAgreedToRegulations] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    matricula: "",
    area: "",
    size: "M" as "P" | "M" | "G" | "GG",
    model: "tradicional" as "tradicional" | "baby-look",
  });

  const createRequestMutation = trpc.requests.create.useMutation({
    onSuccess: () => {
      toast.success("Solicitação enviada com sucesso!");
      setLocation("/confirmation");
    },
    onError: (error) => {
      toast.error(`Erro ao enviar solicitação: ${error.message}`);
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.matricula) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.area) {
        toast.error("Selecione sua área");
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    if (!agreedToRegulations) {
      toast.error("Você deve concordar com o regulamento");
      return;
    }

    createRequestMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#111127]/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(83,210,255,0.15)]">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <button
            onClick={() => setLocation("/")}
            className="text-2xl font-bold text-[#5fd4ff] tracking-tighter hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Mission Brasil
          </button>
          <button
            onClick={() => setLocation("/")}
            className="text-[#c3c6cf] hover:text-[#5fd4ff] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5fd4ff]/20 to-transparent"></div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator */}
          <div className="flex justify-between mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s <= step
                      ? "bg-[#5fd4ff] text-[#003259]"
                      : "bg-[#42474e]/30 text-[#c3c6cf]"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {s}
                </div>
                <p className="text-xs mt-2 text-[#c3c6cf] text-center">
                  {s === 1 && "Dados Pessoais"}
                  {s === 2 && "Área & Tamanho"}
                  {s === 3 && "Confirmação"}
                </p>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-[#1b1b32]/80 border border-[#5fd4ff]/20 rounded p-8 space-y-6">
            {/* Step 1: Personal Data */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#5fd4ff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Dados Pessoais
                </h2>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Nome Completo *</Label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Seu nome completo"
                    className="bg-[#0f0f1f] border-[#42474e] text-white placeholder-[#42474e]"
                  />
                </div>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu.email@empresa.com"
                    className="bg-[#0f0f1f] border-[#42474e] text-white placeholder-[#42474e]"
                  />
                </div>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Matrícula *</Label>
                  <Input
                    value={formData.matricula}
                    onChange={(e) => handleInputChange("matricula", e.target.value)}
                    placeholder="Sua matrícula corporativa"
                    className="bg-[#0f0f1f] border-[#42474e] text-white placeholder-[#42474e]"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Area & Size */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#5fd4ff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Área & Tamanho
                </h2>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Área *</Label>
                  <Input
                    value={formData.area}
                    onChange={(e) => handleInputChange("area", e.target.value)}
                    placeholder="Ex: Desenvolvimento, Marketing, RH"
                    className="bg-[#0f0f1f] border-[#42474e] text-white placeholder-[#42474e]"
                  />
                </div>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Tamanho *</Label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                    <SelectTrigger className="bg-[#0f0f1f] border-[#42474e] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1b1b32] border-[#42474e]">
                      <SelectItem value="P">P</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="G">G</SelectItem>
                      <SelectItem value="GG">GG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Modelo *</Label>
                  <Select value={formData.model} onValueChange={(value) => handleInputChange("model", value)}>
                    <SelectTrigger className="bg-[#0f0f1f] border-[#42474e] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1b1b32] border-[#42474e]">
                      <SelectItem value="tradicional">Tradicional</SelectItem>
                      <SelectItem value="baby-look">Baby Look</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#5fd4ff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Confirmação
                </h2>

                <div className="bg-[#0f0f1f] border border-[#5fd4ff]/20 rounded p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#c3c6cf]">Nome:</span>
                    <span className="text-white font-bold">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#c3c6cf]">Email:</span>
                    <span className="text-white font-bold">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#c3c6cf]">Matrícula:</span>
                    <span className="text-white font-bold">{formData.matricula}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#c3c6cf]">Área:</span>
                    <span className="text-white font-bold">{formData.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#c3c6cf]">Tamanho:</span>
                    <span className="text-white font-bold">{formData.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#c3c6cf]">Modelo:</span>
                    <span className="text-white font-bold">
                      {formData.model === "tradicional" ? "Tradicional" : "Baby Look"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={agreedToRegulations}
                    onCheckedChange={(checked) => setAgreedToRegulations(checked as boolean)}
                    className="border-[#5fd4ff]"
                  />
                  <label className="text-[#c3c6cf] text-sm">
                    Concordo com o{" "}
                    <button
                      onClick={() => setShowRegulations(true)}
                      className="text-[#5fd4ff] hover:underline"
                    >
                      regulamento
                    </button>
                  </label>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  variant="outline"
                  className="flex-1 border-[#5fd4ff]/30 text-[#5fd4ff] hover:bg-[#5fd4ff]/10"
                >
                  Voltar
                </Button>
              )}

              {step < 3 && (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-[#5fd4ff] to-[#3bb4ff] text-[#003259] font-bold hover:scale-105 transition-transform"
                >
                  Próximo
                </Button>
              )}

              {step === 3 && (
                <Button
                  onClick={handleSubmit}
                  disabled={!agreedToRegulations || createRequestMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-[#5fd4ff] to-[#3bb4ff] text-[#003259] font-bold hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {createRequestMutation.isPending ? "Enviando..." : "Enviar Solicitação"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Regulations Modal */}
      <Dialog open={showRegulations} onOpenChange={setShowRegulations}>
        <DialogContent className="bg-[#1b1b32] border-[#5fd4ff]/20 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#5fd4ff] text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Regulamento de Distribuição
            </DialogTitle>
            <DialogDescription className="text-[#c3c6cf]">
              Leia atentamente os termos e condições
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-[#c3c6cf] text-sm">
            <section>
              <h3 className="font-bold text-[#5fd4ff] mb-2">1. Elegibilidade</h3>
              <p>
                Apenas colaboradores ativos com matrícula corporativa válida podem solicitar camisetas. Cada colaborador tem direito a uma camiseta por período de distribuição.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-[#5fd4ff] mb-2">2. Processo de Solicitação</h3>
              <p>
                As solicitações devem ser feitas através deste portal. Após submissão, o gestor da área terá até 48 horas úteis para análise e aprovação.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-[#5fd4ff] mb-2">3. Tamanhos e Modelos</h3>
              <p>
                Disponíveis nos tamanhos P, M, G e GG. Modelos: Tradicional e Baby Look. Sujeito à disponibilidade de estoque.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-[#5fd4ff] mb-2">4. Retirada</h3>
              <p>
                Após aprovação, a camiseta deve ser retirada no setor de Marketing em até 30 dias. Após este período, a solicitação será cancelada.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-[#5fd4ff] mb-2">5. Responsabilidades</h3>
              <p>
                O colaborador é responsável pela guarda e uso adequado da camiseta. Não é permitida a comercialização ou distribuição não autorizada.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-[#5fd4ff] mb-2">6. Alterações</h3>
              <p>
                A empresa se reserva o direito de alterar este regulamento a qualquer momento, com notificação prévia aos colaboradores.
              </p>
            </section>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              onClick={() => setShowRegulations(false)}
              className="flex-1 bg-gradient-to-r from-[#5fd4ff] to-[#3bb4ff] text-[#003259] font-bold"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
