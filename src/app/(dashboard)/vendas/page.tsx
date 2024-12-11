import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Search, DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react"

export default function VendasPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Vendas</h2>
            <p className="text-sm text-muted-foreground">Gerencie suas vendas e pedidos</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar vendas..."
                className="pl-8 h-9 w-[250px] rounded-md bg-background border border-input"
              />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Nova Venda
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 bg-white/15 hover:bg-white/20 transition-colors">
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Total de Vendas</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">R$ 45.850,00</h3>
                <span className="text-green-500 text-sm">+12.5%</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/15 hover:bg-white/20 transition-colors">
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Ticket Médio</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">R$ 350,00</h3>
                <span className="text-red-500 text-sm">-2.4%</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/15 hover:bg-white/20 transition-colors">
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Total de Pedidos</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">125</h3>
                <span className="text-green-500 text-sm">+8.2%</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/15 hover:bg-white/20 transition-colors">
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Novos Clientes</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">28</h3>
                <span className="text-green-500 text-sm">+5.1%</span>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-white/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-medium">ID</th>
                <th className="text-left p-4 text-sm font-medium">Cliente</th>
                <th className="text-left p-4 text-sm font-medium">Data</th>
                <th className="text-left p-4 text-sm font-medium">Valor</th>
                <th className="text-left p-4 text-sm font-medium">Itens</th>
                <th className="text-left p-4 text-sm font-medium">Pagamento</th>
                <th className="text-left p-4 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="p-4 text-sm">#VD001</td>
                <td className="p-4 text-sm">João Silva</td>
                <td className="p-4 text-sm">12/03/2024, 14:30</td>
                <td className="p-4 text-sm">R$ 1.250,00</td>
                <td className="p-4 text-sm">3 itens</td>
                <td className="p-4 text-sm">Cartão de Crédito</td>
                <td className="p-4 text-sm">
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500">
                    Concluído
                  </span>
                </td>
                <td className="p-4 text-sm">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Ver</Button>
                    <Button variant="ghost" size="sm">Imprimir</Button>
                  </div>
                </td>
              </tr>
              {/* Adicione mais linhas conforme necessário */}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
} 