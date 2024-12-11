export interface Product {
  id: number
  name: string
  description?: string
  sku: string
  price: number
  stockQuantity: number
  manufacturer: string
  brand: string
  category: string
  weight?: number
  dimensions?: string
  barcode?: string
  isActive: boolean
} 