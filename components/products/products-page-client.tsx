"use client"

import { useState, useMemo } from "react"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductGrid } from "@/components/products/product-grid"
import { CTAWithForm } from "@/components/sections/cta-with-form"
import productsData from "@/data/products.json"

export function ProductsPageClient() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const breadcrumbItems = [
    { label: "Producten", href: "/producten" }
  ]

  // Get unique brands from products
  const availableBrands = useMemo(() => {
    const brands = new Set(productsData.products.map(product => product.brand))
    return Array.from(brands).sort()
  }, [])

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    let filtered = productsData.products

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      )
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand)
      )
    }

    return filtered
  }, [selectedCategories, selectedBrands])

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
  }

  return (
    <div className="container py-12">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Page header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Airconditioning Modellen
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Ontdek ons complete assortiment van topkwaliteit airconditioners. 
          Alle modellen zijn professioneel geïnstalleerd met 5 jaar garantie. 
          Geen prijzen? Wij geven u graag een persoonlijke offerte op maat.
        </p>
      </div>

      {/* Filters and content */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar filters */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <ProductFilters
              categories={productsData.categories}
              brands={availableBrands}
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              onCategoriesChange={setSelectedCategories}
              onBrandsChange={setSelectedBrands}
              onReset={resetFilters}
              totalProducts={productsData.products.length}
              filteredCount={filteredProducts.length}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16">
        <CTAWithForm
          title="Hulp Nodig bij het Kiezen?"
          description="Onze airco-experts helpen u graag bij het vinden van de perfecte airconditioning voor uw situatie. Vraag een gratis advies aan!"
        />
      </div>

      {/* Additional info section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Waarom Geen Prijzen op Onze Website?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Maatwerk Prijzen</h3>
            <p className="text-sm text-muted-foreground">
              Elke installatie is uniek. Wij berekenen de prijs op basis van uw specifieke situatie en wensen.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Locatie Afhankelijk</h3>
            <p className="text-sm text-muted-foreground">
              Installatieprijzen variëren per locatie, toegankelijkheid en complexiteit van de installatie.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Beste Prijs Garantie</h3>
            <p className="text-sm text-muted-foreground">
              Door persoonlijk advies krijgt u gegarandeerd de beste prijs-kwaliteit verhouding voor uw situatie.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}