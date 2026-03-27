import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/**
 * Mission Brasil - Request Form Page
 * Multi-step form for t-shirt requests with all required fields
 */
export default function Request() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [showRegulations, setShowRegulations] = useState(false);
  const [agreedToRegulations, setAgreedToRegulations] = useState(false);
  const [managers, setManagers] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telefone: "",
    matricula: "",
    area: "",
    gestor: "",
    size: "M" as "P" | "M" | "G" | "GG",
    model: "tradicional" as "tradicional" | "baby-look",
    isFirstRequest: true,
    lastRequestDate: "",
    motivo: "",
  });

  // Fetch managers
  const { data: managersData } = trpc.admin.getManagers.useQuery();

  useEffect(() => {
    if (managersData) {
      setManagers(managersData);
    }
  }, [managersData]);

  // Auto-fill gestor when area changes
  useEffect(() => {
    if (formData.area && managers.length > 0) {
      const manager = managers.find((m) => m.area === formData.area);
      if (manager) {
        setFormData((prev) => ({
          ...prev,
          gestor: manager.name,
        }));
      }
    }
  }, [formData.area, managers]);

  const createRequestMutation = trpc.requests.create.useMutation({
    onSuccess: () => {
      toast.success("Solicitação enviada com sucesso!");
      setLocation("/confirmation");
    },
    onError: (error) => {
      toast.error(`Erro ao enviar solicitação: ${error.message}`);
    },
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.telefone || !formData.matricula) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }
      // Validate email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error("Email inválido");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.area) {
        toast.error("Selecione sua área");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.isFirstRequest && !formData.lastRequestDate) {
        toast.error("Informe a data da última solicitação");
        return;
      }
      if (!formData.motivo) {
        toast.error("Informe o motivo da solicitação");
        return;
      }
      setStep(4);
    }
  };

  const handleSubmit = async () => {
    if (!agreedToRegulations) {
      toast.error("Você deve concordar com o regulamento");
      return;
    }

    createRequestMutation.mutate({
      ...formData,
      isFirstRequest: formData.isFirstRequest ? 1 : 0,
      lastRequestDate: formData.lastRequestDate ? new Date(formData.lastRequestDate) : undefined,
    } as any);
  };

  const areas = Array.from(new Set(managers.map((m: any) => m.area)));

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
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s <= step
                      ? "bg-[#5fd4ff] text-[#003259]"
                      : "bg-[#42474e] text-[#c3c6cf]"
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      s < step ? "bg-[#5fd4ff]" : "bg-[#42474e]"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Form Container */}
          <div className="bg-[#1b1b32]/80 backdrop-blur-md p-8 rounded border border-[#5fd4ff]/20">
            {/* Step 1: Personal Info */}
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
                    className="bg-[#0f0f1f] border-[#42474e] text-white"
                  />
                </div>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu.email@example.com"
                    className="bg-[#0f0f1f] border-[#42474e] text-white"
                  />
                </div>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Telefone *</Label>
                  <Input
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="bg-[#0f0f1f] border-[#42474e] text-white"
                  />
                </div>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Matrícula *</Label>
                  <Input
                    value={formData.matricula}
                    onChange={(e) => handleInputChange("matricula", e.target.value)}
                    placeholder="Sua matrícula"
                    className="bg-[#0f0f1f] border-[#42474e] text-white"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Area and Size */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#5fd4ff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Área e Tamanho
                </h2>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Área *</Label>
                  <Select value={formData.area} onValueChange={(value) => handleInputChange("area", value)}>
                    <SelectTrigger className="bg-[#0f0f1f] border-[#42474e] text-white">
                      <SelectValue placeholder="Selecione sua área" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f0f1f] border-[#42474e]">
                      {areas.map((area: any) => (
                        <SelectItem key={String(area)} value={String(area)} className="text-white">
                          {String(area)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Gestor</Label>
                  <Input
                    value={formData.gestor}
                    disabled
                    className="bg-[#0f0f1f] border-[#42474e] text-[#c3c6cf]"
                    placeholder="Será preenchido automaticamente"
                  />
                </div>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Tamanho da Camiseta *</Label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value as any)}>
                    <SelectTrigger className="bg-[#0f0f1f] border-[#42474e] text-white">
                      <SelectValue placeholder="Selecione o tamanho" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f0f1f] border-[#42474e]">
                      <SelectItem value="P" className="text-white">P</SelectItem>
                      <SelectItem value="M" className="text-white">M</SelectItem>
                      <SelectItem value="G" className="text-white">G</SelectItem>
                      <SelectItem value="GG" className="text-white">GG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Modelo *</Label>
                  <Select value={formData.model} onValueChange={(value) => handleInputChange("model", value as any)}>
                    <SelectTrigger className="bg-[#0f0f1f] border-[#42474e] text-white">
                      <SelectValue placeholder="Selecione o modelo" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f0f1f] border-[#42474e]">
                      <SelectItem value="tradicional" className="text-white">Tradicional</SelectItem>
                      <SelectItem value="baby-look" className="text-white">Baby Look</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Request Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#5fd4ff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Detalhes da Solicitação
                </h2>

                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={formData.isFirstRequest}
                    onCheckedChange={(checked) => handleInputChange("isFirstRequest", checked)}
                    className="border-[#5fd4ff]"
                  />
                  <Label className="text-[#c3c6cf]">É sua primeira solicitação?</Label>
                </div>

                {!formData.isFirstRequest && (
                  <div>
                    <Label className="text-[#c3c6cf] mb-2 block">Data da Última Solicitação *</Label>
                    <Input
                      type="date"
                      value={formData.lastRequestDate}
                      onChange={(e) => handleInputChange("lastRequestDate", e.target.value)}
                      className="bg-[#0f0f1f] border-[#42474e] text-white"
                    />
                  </div>
                )}

                <div>
                  <Label className="text-[#c3c6cf] mb-2 block">Motivo da Solicitação *</Label>
                  <Textarea
                    value={formData.motivo}
                    onChange={(e) => handleInputChange("motivo", e.target.value)}
                    placeholder="Descreva o motivo da sua solicitação"
                    className="bg-[#0f0f1f] border-[#42474e] text-white min-h-[120px]"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review and Regulations */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#5fd4ff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Resumo e Concordância
                </h2>

                <div className="bg-[#0f0f1f] p-4 rounded border border-[#42474e]/20 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#c3c6cf]">Nome:</span>
                    <span className="text-white font-bold">{formData.fullName}</span>
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

                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={agreedToRegulations}
                    onCheckedChange={(checked) => setAgreedToRegulations(checked as boolean)}
                    className="border-[#5fd4ff] mt-1"
                  />
                  <div>
                    <Label className="text-[#c3c6cf]">
                      Concordo com o{" "}
                      <button
                        onClick={() => setShowRegulations(true)}
                        className="text-[#5fd4ff] hover:underline"
                      >
                        regulamento
                      </button>
                      {" "}*
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                variant="outline"
                className="flex-1 border-[#5fd4ff]/30 text-[#5fd4ff]"
              >
                Voltar
              </Button>
              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-[#5fd4ff] text-[#003259] hover:opacity-80"
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={createRequestMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-[#5fd4ff] to-[#3bb4ff] text-[#003259]"
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
        <DialogContent className="bg-[#1b1b32] border-[#5fd4ff]/20 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#5fd4ff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Regulamento de Distribuição de Camisetas
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-[#c3c6cf] text-sm">
            <p>
              <strong className="text-[#5fd4ff]">1. Elegibilidade</strong><br />
              Todos os colaboradores da Mission Brasil podem solicitar camisetas corporativas, seguindo os critérios de distribuição.
            </p>

            <p>
              <strong className="text-[#5fd4ff]">2. Frequência de Solicitação</strong><br />
              Cada colaborador pode solicitar uma camiseta a cada 12 meses. Solicitações fora deste período podem ser recusadas.
            </p>

            <p>
              <strong className="text-[#5fd4ff]">3. Aprovação</strong><br />
              Todas as solicitações serão analisadas pelo gestor da área dentro de 48 horas úteis. A aprovação dependerá da disponibilidade de estoque.
            </p>

            <p>
              <strong className="text-[#5fd4ff]">4. Entrega</strong><br />
              Após aprovação, a camiseta deverá ser retirada no setor de Marketing. O colaborador tem 30 dias para retirar sua camiseta.
            </p>

            <p>
              <strong className="text-[#5fd4ff]">5. Tamanhos Disponíveis</strong><br />
              Tamanhos disponíveis: P, M, G, GG. Sujeito à disponibilidade de estoque.
            </p>

            <p>
              <strong className="text-[#5fd4ff]">6. Motivo da Solicitação</strong><br />
              O colaborador deve informar o motivo da solicitação para fins de controle e planejamento.
            </p>

            <p>
              <strong className="text-[#5fd4ff]">7. Responsabilidade</strong><br />
              O colaborador é responsável pelas informações fornecidas. Dados incorretos podem resultar em recusa da solicitação.
            </p>
          </div>

          <Button
            onClick={() => setShowRegulations(false)}
            className="w-full bg-[#5fd4ff] text-[#003259] mt-6"
          >
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
