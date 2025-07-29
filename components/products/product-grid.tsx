"use client"

import { ProductCard } from "@/components/products/product-card"

interface Product {
  id: string
  name: string
  brand: string
  category: string
  description: string
  features: string[]
  images: string[]
  colors: string[]
  ctaText: string
}

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

export function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg h-[500px] animate-pulse" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Geen producten gevonden
          </h3>
          <p className="text-gray-600 mb-4">
            Probeer andere filters of zoek naar een ander merk of model.
          </p>
          <p className="text-sm text-muted-foreground">
            Kunt u niet vinden wat u zoekt? 
            <a href="/contact" className="text-blue-600 hover:underline ml-1">
              Neem contact met ons op
            </a> voor persoonlijk advies.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sort/View options */}
      <div className="flex justify-between items-center border-b pb-4">
        <p className="text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? 'product' : 'producten'} gevonden
        </p>
        <div className="flex items-center gap-4">
          <select className="text-sm border rounded-md px-3 py-1 bg-white">
            <option value="name">Sorteren op naam</option>
            <option value="brand">Sorteren op merk</option>
            <option value="category">Sorteren op type</option>
          </select>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load more button (if needed) */}
      {products.length >= 12 && (
        <div className="text-center pt-8">
          <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Meer producten laden
          </button>
        </div>
      )}
    </div>
  )
}