import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Mission Brasil - Manager Dashboard
 * Displays inventory, requests, and area statistics
 */
export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Redirect if not authenticated or not a manager
  if (!isAuthenticated) {
    setLocation("/");
    return null;
  }

  if (user?.role !== "manager" && user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#5fd4ff] mb-4">Acesso Negado</h1>
          <p className="text-[#c3c6cf] mb-6">Você não tem permissão para acessar o dashboard</p>
          <Button onClick={() => setLocation("/")} className="bg-[#5fd4ff] text-[#003259]">
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  // Fetch data
  const { data: pendingRequests, isLoading: loadingRequests } = trpc.requests.getPending.useQuery();
  const { data: inventory, isLoading: loadingInventory } = trpc.dashboard.getInventory.useQuery();
  const { data: areaStats, isLoading: loadingStats } = trpc.dashboard.getAreaStats.useQuery();

  // Mutations
  const approveMutation = trpc.requests.approve.useMutation({
    onSuccess: () => {
      toast.success("Solicitação aprovada!");
      // Refetch data
      trpc.useUtils().requests.getPending.invalidate();
      trpc.useUtils().dashboard.getAreaStats.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro ao aprovar: ${error.message}`);
    },
  });

  const rejectMutation = trpc.requests.reject.useMutation({
    onSuccess: () => {
      toast.success("Solicitação rejeitada!");
      setShowRejectDialog(false);
      setRejectionReason("");
      setSelectedRequestId(null);
      trpc.useUtils().requests.getPending.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro ao rejeitar: ${error.message}`);
    },
  });

  const handleReject = () => {
    if (!selectedRequestId || !rejectionReason.trim()) {
      toast.error("Informe um motivo para rejeição");
      return;
    }
    rejectMutation.mutate({
      requestId: selectedRequestId,
      reason: rejectionReason,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#111127]/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(83,210,255,0.15)]">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <button
            onClick={() => setLocation("/")}
            className="text-2xl font-bold text-[#5fd4ff] tracking-tighter hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Mission Brasil
          </button>
          <div className="flex items-center gap-4">
            <span className="text-[#c3c6cf] text-sm">{user?.name}</span>
            <button
              onClick={() => setLocation("/")}
              className="text-[#c3c6cf] hover:text-[#5fd4ff] transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5fd4ff]/20 to-transparent"></div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-[#5fd4ff] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Dashboard de Gestão
            </h1>
            <p className="text-[#c3c6cf]">Gerencie solicitações, estoque e estatísticas de distribuição</p>
          </div>

          {/* Inventory Section */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <h2 className="col-span-full text-2xl font-bold text-[#5fd4ff] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Estoque Disponível
            </h2>
            {loadingInventory ? (
              <p className="text-[#c3c6cf]">Carregando...</p>
            ) : inventory && inventory.length > 0 ? (
              inventory.map((item) => (
                <Card key={item.id} className="bg-[#1b1b32] border-[#5fd4ff]/20 p-6">
                  <div className="text-center">
                    <p className="text-[#c3c6cf] text-sm mb-2">Tamanho</p>
                    <p className="text-3xl font-bold text-[#5fd4ff] mb-4">{item.size}</p>
                    <p className="text-2xl font-bold text-white">{item.quantity}</p>
                    <p className="text-[#c3c6cf] text-xs mt-2">unidades disponíveis</p>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-[#c3c6cf]">Sem dados de estoque</p>
            )}
          </section>

          {/* Area Statistics Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#5fd4ff] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Estatísticas por Área
            </h2>
            {loadingStats ? (
              <p className="text-[#c3c6cf]">Carregando...</p>
            ) : areaStats && areaStats.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#5fd4ff]/20">
                      <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Área</th>
                      <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Total de Camisetas</th>
                      <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Valor Total Gasto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {areaStats.map((stat) => (
                      <tr key={stat.id} className="border-b border-[#42474e]/20 hover:bg-[#1b1b32] transition-colors">
                        <td className="py-3 px-4 text-white">{stat.area}</td>
                        <td className="py-3 px-4 text-[#5fd4ff] font-bold">{stat.totalShirts}</td>
                        <td className="py-3 px-4 text-white">R$ {parseFloat(stat.totalSpent.toString()).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-[#c3c6cf]">Sem dados de áreas</p>
            )}
          </section>

          {/* Pending Requests Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#5fd4ff] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Solicitações Aguardando Aprovação
            </h2>
            {loadingRequests ? (
              <p className="text-[#c3c6cf]">Carregando...</p>
            ) : pendingRequests && pendingRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#5fd4ff]/20">
                      <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Nome</th>
                      <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Área</th>
                      <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Tamanho</th>
                      <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Modelo</th>
                      <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Data</th>
                      <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRequests.map((req) => (
                      <tr key={req.id} className="border-b border-[#42474e]/20 hover:bg-[#1b1b32] transition-colors">
                        <td className="py-3 px-4 text-white">{req.fullName}</td>
                        <td className="py-3 px-4 text-[#c3c6cf]">{req.area}</td>
                        <td className="py-3 px-4 text-[#c3c6cf]">{req.size}</td>
                        <td className="py-3 px-4 text-[#c3c6cf]">
                          {req.model === "tradicional" ? "Tradicional" : "Baby Look"}
                        </td>
                        <td className="py-3 px-4 text-[#c3c6cf]">
                          {new Date(req.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="py-3 px-4 flex gap-2">
                          <Button
                            onClick={() => approveMutation.mutate({ requestId: req.id })}
                            disabled={approveMutation.isPending}
                            className="bg-[#5fd4ff] text-[#003259] text-xs hover:opacity-80"
                          >
                            Aprovar
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedRequestId(req.id);
                              setShowRejectDialog(true);
                            }}
                            disabled={rejectMutation.isPending}
                            variant="outline"
                            className="border-red-500 text-red-500 text-xs hover:bg-red-500/10"
                          >
                            Rejeitar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Card className="bg-[#1b1b32] border-[#5fd4ff]/20 p-8 text-center">
                <p className="text-[#c3c6cf]">Nenhuma solicitação aguardando aprovação</p>
              </Card>
            )}
          </section>
        </div>
      </main>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-[#1b1b32] border-[#5fd4ff]/20">
          <DialogHeader>
            <DialogTitle className="text-[#5fd4ff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Rejeitar Solicitação
            </DialogTitle>
            <DialogDescription className="text-[#c3c6cf]">
              Informe o motivo da rejeição
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-[#c3c6cf] mb-2 block">Motivo da Rejeição *</Label>
              <Input
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Ex: Estoque insuficiente, dados incorretos, etc."
                className="bg-[#0f0f1f] border-[#42474e] text-white placeholder-[#42474e]"
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setShowRejectDialog(false)}
                variant="outline"
                className="flex-1 border-[#5fd4ff]/30 text-[#5fd4ff]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleReject}
                disabled={rejectMutation.isPending}
                className="flex-1 bg-red-600 text-white hover:bg-red-700"
              >
                {rejectMutation.isPending ? "Rejeitando..." : "Rejeitar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
