"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

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

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.brand}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.colors.length} {product.colors.length === 1 ? 'kleur' : 'kleuren'}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        {/* Image carousel */}
        <div className="relative mb-4 aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden group">
          <Image
            src={product.images[currentImageIndex]}
            alt={`${product.name} - afbeelding ${currentImageIndex + 1}`}
            fill
            className="object-contain p-4"
          />
          
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Vorige afbeelding"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Volgende afbeelding"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-blue-600' : 'bg-white/50'
                    }`}
                    aria-label={`Ga naar afbeelding ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Beschikbare kleuren:</p>
            <div className="flex gap-1 flex-wrap">
              {product.colors.map((color) => (
                <Badge key={color} variant="outline" className="text-xs px-2 py-0">
                  {color}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="space-y-1">
          {product.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
          {product.features.length > 3 && (
            <p className="text-xs text-muted-foreground italic">
              + {product.features.length - 3} meer voordelen
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Link href="/contact" className="w-full">
          <Button className="w-full" variant="default">
            {product.ctaText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}