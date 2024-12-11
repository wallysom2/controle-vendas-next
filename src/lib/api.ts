import axios from 'axios';
import { Product } from '@/types/product';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

interface CreateProductData {
  name: string;
  description: string;
  sku: string;
  price: number;
  stockQuantity: number;
  manufacturer: string;
  brand: string;
  category: string;
  weight: number;
  dimensions: string;
  barcode: string;
  isActive: boolean;
}

interface CreateSaleData {
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  paymentMethod: 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH' | 'PIX';
  notes?: string;
}

// Interfaces
interface UpdateProductData {
  name?: string;
  description?: string;
  sku?: string;
  price?: number;
  stockQuantity?: number;
  manufacturer?: string;
  brand?: string;
  category?: string;
  weight?: number;
  dimensions?: string;
  barcode?: string;
  isActive?: boolean;
}


// Produtos
export const productsApi = {
  getAll: async () => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (data: CreateProductData) => {
    const response = await api.post<Product>('/products', data);
    return response.data;
  },

  update: async (id: number, data: UpdateProductData) => {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/products/${id}`);
  },

  updateStock: async (id: number, quantity: number) => {
    const response = await api.put<Product>(`/products/${id}/stock`, { quantity });
    return response.data;
  }
};

export default api; 

// Vendas
export const getSales = async () => {
  const response = await api.get('/sales');
  return response.data;
};

export const getSale = async (id: number) => {
  const response = await api.get(`/sales/${id}`);
  return response.data;
};

export const createSale = async (data: CreateSaleData) => {
  const response = await api.post('/sales', data);
  return response.data;
};

// Compras
export const getPurchases = async () => {
  const response = await api.get('/purchases');
  return response.data;
};

export const createPurchase = async (data: any) => {
  const response = await api.post('/purchases', data);
  return response.data;
};

// Dashboard
export const getDashboardStats = async () => {
  const [products, sales, purchases] = await Promise.all([
    productsApi.getAll(),
    getSales(),
    getPurchases(),
  ]);

  const totalSales = sales.reduce((acc: number, sale: any) => acc + Number(sale.totalAmount), 0);
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p: any) => p.stockQuantity < 10).length;
  const averageTicket = totalSales / sales.length || 0;

  return {
    totalSales,
    totalProducts,
    lowStockProducts,
    averageTicket,
    recentSales: sales.slice(0, 5),
    topProducts: products
      .sort((a: any, b: any) => b.stockQuantity - a.stockQuantity)
      .slice(0, 5),
  };
}; 