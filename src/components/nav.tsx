"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  ShoppingCart, 
  Package, 
  LayoutDashboard,
  Settings
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Produtos',
    href: '/produtos',
    icon: Package
  },
  {
    name: 'Vendas',
    href: '/vendas',
    icon: ShoppingCart
  },
  {
    name: 'Configurações',
    href: '/configuracoes',
    icon: Settings
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2">
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground',
              pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            )}
          >
            <Icon className="w-5 h-5" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
} 