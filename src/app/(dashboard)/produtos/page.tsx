'use client'

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { productsApi } from "@/lib/api"

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await productsApi.getAll()
      setProducts(data)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await productsApi.delete(id)
      fetchProducts()
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
    }
  }

  const getStatusBadge = (quantity: number) => {
    if (quantity > 10) {
      return <span className="status-badge status-badge-success">Em Estoque</span>
    } else if (quantity > 0) {
      return <span className="status-badge status-badge-warning">Baixo Estoque</span>
    } else {
      return <span className="status-badge status-badge-error">Sem Estoque</span>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">Gerencie seu catálogo de produtos</p>
        </div>
        
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Filtros */}
        <div className="bg-card p-4 rounded-lg border">
          <h3 className="font-semibold mb-4">Filtros</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm">Categoria</label>
              <select className="w-full rounded-md border bg-secondary p-2">
                <option>Todas as Categorias</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Status</label>
              <select className="w-full rounded-md border bg-secondary p-2">
                <option>Todos os Status</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Fornecedor</label>
              <select className="w-full rounded-md border bg-secondary p-2">
                <option>Todos os Fornecedores</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Ordenar por</label>
              <select className="w-full rounded-md border bg-secondary p-2">
                <option>Nome</option>
              </select>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Aplicar Filtros
            </Button>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Carregando produtos...
                  </TableCell>
                </TableRow>
              ) : products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      {product.name}
                      <div className="text-xs text-muted-foreground">#{product.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>R$ {product.price}</TableCell>
                  <TableCell>{product.stockQuantity}</TableCell>
                  <TableCell>{product.manufacturer}</TableCell>
                  <TableCell>{getStatusBadge(product.stockQuantity)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
} 