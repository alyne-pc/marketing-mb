import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Mission Brasil - Admin Page
 * Master admin only - manage managers and inventory
 */
export default function Admin() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      setLocation("/");
    }
  }, [isAuthenticated, loading, user?.role, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-[#c3c6cf]">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

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
            <span className="text-[#c3c6cf] text-sm">Admin</span>
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
              Painel de Administração
            </h1>
            <p className="text-[#c3c6cf]">Gerencie gestores, estoque e configurações do sistema</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="bg-[#1b1b32] border border-[#5fd4ff]/20">
              <TabsTrigger value="inventory" className="data-[state=active]:bg-[#5fd4ff] data-[state=active]:text-[#003259]">
                Estoque
              </TabsTrigger>
              <TabsTrigger value="managers" className="data-[state=active]:bg-[#5fd4ff] data-[state=active]:text-[#003259]">
                Gestores
              </TabsTrigger>
            </TabsList>

            {/* Inventory Tab */}
            <TabsContent value="inventory">
              <InventorySection />
            </TabsContent>

            {/* Managers Tab */}
            <TabsContent value="managers">
              <ManagersSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

/**
 * Inventory Management Section
 */
function InventorySection() {
  const { data: inventory, isLoading } = trpc.admin.getInventory.useQuery();
  const [editingSize, setEditingSize] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [costs, setCosts] = useState<Record<string, string>>({});

  const updateQuantityMutation = trpc.admin.updateInventoryQuantity.useMutation({
    onSuccess: () => {
      toast.success("Quantidade atualizada!");
      setEditingSize(null);
      trpc.useUtils().admin.getInventory.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const updateCostMutation = trpc.admin.updateInventoryCost.useMutation({
    onSuccess: () => {
      toast.success("Custo atualizado!");
      trpc.useUtils().admin.getInventory.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const handleSaveQuantity = (size: string) => {
    const qty = quantities[size];
    if (qty !== undefined) {
      updateQuantityMutation.mutate({
        size: size as "P" | "M" | "G" | "GG",
        quantity: qty,
      });
    }
  };

  const handleSaveCost = (size: string) => {
    const cost = costs[size];
    if (cost) {
      updateCostMutation.mutate({
        size: size as "P" | "M" | "G" | "GG",
        costPerUnit: cost,
      });
    }
  };

  return (
    <Card className="bg-[#1b1b32] border-[#5fd4ff]/20 p-6 mt-6">
      <h2 className="text-2xl font-bold text-[#5fd4ff] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Gerenciar Estoque
      </h2>

      {isLoading ? (
        <p className="text-[#c3c6cf]">Carregando...</p>
      ) : inventory && inventory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#5fd4ff]/20">
                <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Tamanho</th>
                <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Quantidade</th>
                <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Custo Unitário</th>
                <th className="text-left py-3 px-4 text-[#5fd4ff] font-bold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-b border-[#42474e]/20 hover:bg-[#0f0f1f] transition-colors">
                  <td className="py-3 px-4 text-white font-bold">{item.size}</td>
                  <td className="py-3 px-4">
                    {editingSize === item.size ? (
                      <Input
                        type="number"
                        min="0"
                        value={quantities[item.size] ?? item.quantity}
                        onChange={(e) =>
                          setQuantities({
                            ...quantities,
                            [item.size]: parseInt(e.target.value) || 0,
                          })
                        }
                        className="bg-[#0f0f1f] border-[#42474e] text-white w-20"
                      />
                    ) : (
                      <span className="text-[#c3c6cf]">{item.quantity}</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={costs[item.size] ?? item.costPerUnit}
                      onChange={(e) =>
                        setCosts({
                          ...costs,
                          [item.size]: e.target.value,
                        })
                      }
                      className="bg-[#0f0f1f] border-[#42474e] text-white w-24"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    {editingSize === item.size ? (
                      <>
                        <Button
                          onClick={() => handleSaveQuantity(item.size)}
                          disabled={updateQuantityMutation.isPending}
                          className="bg-[#5fd4ff] text-[#003259] text-xs"
                        >
                          Salvar
                        </Button>
                        <Button
                          onClick={() => setEditingSize(null)}
                          variant="outline"
                          className="border-[#5fd4ff]/30 text-[#5fd4ff] text-xs"
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          setEditingSize(item.size);
                          setQuantities({ ...quantities, [item.size]: item.quantity });
                        }}
                        className="bg-[#5fd4ff] text-[#003259] text-xs"
                      >
                        Editar
                      </Button>
                    )}
                    <Button
                      onClick={() => handleSaveCost(item.size)}
                      disabled={updateCostMutation.isPending}
                      className="bg-[#3bb4ff] text-[#003259] text-xs"
                    >
                      Salvar Custo
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-[#c3c6cf]">Sem dados de estoque</p>
      )}
    </Card>
  );
}

/**
 * Managers Management Section
 */
function ManagersSection() {
  const { data: managers, isLoading } = trpc.admin.getManagers.useQuery();
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", area: "" });

  const upsertMutation = trpc.admin.upsertManager.useMutation({
    onSuccess: () => {
      toast.success("Gestor salvo com sucesso!");
      setFormData({ name: "", email: "", area: "" });
      setShowDialog(false);
      trpc.useUtils().admin.getManagers.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.area) {
      toast.error("Preencha todos os campos");
      return;
    }
    upsertMutation.mutate(formData);
  };

  return (
    <Card className="bg-[#1b1b32] border-[#5fd4ff]/20 p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#5fd4ff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Gerenciar Gestores
        </h2>
        <Button
          onClick={() => setShowDialog(true)}
          className="bg-[#5fd4ff] text-[#003259] hover:opacity-80"
        >
          + Novo Gestor
        </Button>
      </div>

      {isLoading ? (
        <p className="text-[#c3c6cf]">Carregando...</p>
      ) : managers && managers.length > 0 ? (
        <div className="space-y-4">
          {managers.map((manager) => (
            <div
              key={manager.id}
              className="bg-[#0f0f1f] border border-[#42474e]/20 rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-white font-bold">{manager.name}</p>
                <p className="text-[#c3c6cf] text-sm">{manager.email}</p>
                <p className="text-[#5fd4ff] text-sm">{manager.area}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#c3c6cf]">Nenhum gestor cadastrado</p>
      )}

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#1b1b32] border-[#5fd4ff]/20">
          <DialogHeader>
            <DialogTitle className="text-[#5fd4ff]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Novo Gestor
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-[#c3c6cf] mb-2 block">Nome *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome completo"
                className="bg-[#0f0f1f] border-[#42474e] text-white"
              />
            </div>

            <div>
              <Label className="text-[#c3c6cf] mb-2 block">Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="bg-[#0f0f1f] border-[#42474e] text-white"
              />
            </div>

            <div>
              <Label className="text-[#c3c6cf] mb-2 block">Área *</Label>
              <Input
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="Ex: Marketing, Tecnologia"
                className="bg-[#0f0f1f] border-[#42474e] text-white"
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setShowDialog(false)}
                variant="outline"
                className="flex-1 border-[#5fd4ff]/30 text-[#5fd4ff]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={upsertMutation.isPending}
                className="flex-1 bg-[#5fd4ff] text-[#003259]"
              >
                {upsertMutation.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
