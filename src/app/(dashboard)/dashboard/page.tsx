"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Package, 
  DollarSign,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Users,
  Calendar
} from 'lucide-react';
import { SalesChart } from "@/components/charts/sales-chart";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ProductsChart } from "@/components/charts/products-chart";
import { getDashboardStats } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend: number;
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            {icon}
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          <div className={cn(
            "flex items-center rounded-full px-2 py-1 text-xs font-semibold",
            trend > 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
          )}>
            {trend > 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
            {Math.abs(trend)}%
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface CalendarDateRangePickerProps {
  date: { from: Date | undefined; to: Date | undefined };
  setDate: (date: { from: Date | undefined; to: Date | undefined }) => void;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="mt-4 h-8 w-[100px]" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardContent className="p-6">
              <Skeleton className="h-[300px]" />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardContent className="p-6">
              <Skeleton className="h-[300px]" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">Dashboard</h2>
        <div className="flex items-center space-x-2">

          <Button>Download</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total de Vendas"
              value={new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(stats?.totalSales || 0)}
              description="Últimos 30 dias"
              icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
              trend={20.1}
            />
            <StatCard
              title="Produtos em Estoque"
              value={stats?.totalProducts || 0}
              description={`${stats?.lowStockProducts || 0} produtos com estoque baixo`}
              icon={<Package className="h-4 w-4 text-muted-foreground" />}
              trend={-5.2}
            />
            <StatCard
              title="Ticket Médio"
              value={new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(stats?.averageTicket || 0)}
              description="Por venda"
              icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
              trend={5.2}
            />
            <StatCard
              title="Taxa de Conversão"
              value="32%"
              description="Visitas vs. Vendas"
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
              trend={2.4}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="text-base font-medium">Vendas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <SalesChart data={stats?.recentSales?.map((sale: any) => ({
                  date: new Date(sale.date).toLocaleDateString("pt-BR"),
                  total: Number(sale.totalAmount),
                })) || []} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-base font-medium">Produtos Mais Vendidos</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductsChart data={stats?.topProducts || []} />
                <div className="space-y-4 mt-4">
                  {stats?.topProducts?.map((product: any) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.stockQuantity} em estoque
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="font-medium">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-base font-medium">Receita por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueChart data={stats?.revenueByCategory || []} />
              </CardContent>
            </Card>

            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Últimas Atividades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentActivities?.map((activity: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full",
                        activity.type === 'sale' ? "bg-emerald-100" : "bg-blue-100"
                      )}>
                        {activity.type === 'sale' ? (
                          <ShoppingCart className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Users className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString("pt-BR", {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      {activity.amount && (
                        <div className="ml-auto font-medium">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(activity.amount)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Conteúdo da aba Analytics */}
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          {/* Conteúdo da aba Reports */}
        </TabsContent>
      </Tabs>
    </div>
  );
} 