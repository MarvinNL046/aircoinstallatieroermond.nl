"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Category {
  id: string
  name: string
  description: string
}

interface ProductFiltersProps {
  categories: Category[]
  brands: string[]
  selectedCategories: string[]
  selectedBrands: string[]
  onCategoriesChange: (_categories: string[]) => void
  onBrandsChange: (_brands: string[]) => void
  onReset: () => void
  totalProducts: number
  filteredCount: number
}

export function ProductFilters({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  onCategoriesChange,
  onBrandsChange,
  onReset,
  totalProducts,
  filteredCount
}: ProductFiltersProps) {
  const [showAllBrands, setShowAllBrands] = useState(false)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      onCategoriesChange([...selectedCategories, categoryId])
    } else {
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      onBrandsChange([...selectedBrands, brand])
    } else {
      onBrandsChange(selectedBrands.filter(b => b !== brand))
    }
  }

  const visibleBrands = showAllBrands ? brands : brands.slice(0, 6)
  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0

  return (
    <div className="space-y-6">
      {/* Results summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{filteredCount}</p>
            <p className="text-sm text-muted-foreground">
              van {totalProducts} modellen
            </p>
          </div>
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onReset}
              className="w-full mt-4"
            >
              Alle filters wissen
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Category filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Type Airco</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={category.id} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category.name}
                </Label>
              </div>
              <p className="text-xs text-muted-foreground ml-6">
                {category.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Brand filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Merk</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {visibleBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => 
                  handleBrandChange(brand, checked as boolean)
                }
              />
              <Label 
                htmlFor={`brand-${brand}`} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
          
          {brands.length > 6 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal"
            >
              {showAllBrands ? 'Minder tonen' : `+ ${brands.length - 6} meer merken`}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Popular filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Populaire Keuzes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={selectedBrands.includes('Daikin') ? 'default' : 'outline'}
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              const checked = !selectedBrands.includes('Daikin')
              handleBrandChange('Daikin', checked)
            }}
          >
            Daikin Premium
          </Button>
          <Button
            variant={selectedCategories.includes('wandmodellen') ? 'default' : 'outline'}
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              const checked = !selectedCategories.includes('wandmodellen')
              handleCategoryChange('wandmodellen', checked)
            }}
          >
            Wandmodellen
          </Button>
          <Button
            variant={selectedBrands.includes('Samsung') ? 'default' : 'outline'}
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              const checked = !selectedBrands.includes('Samsung')
              handleBrandChange('Samsung', checked)
            }}
          >
            Samsung WindFree
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}