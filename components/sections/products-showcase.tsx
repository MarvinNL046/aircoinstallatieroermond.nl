import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredProducts = [
  {
    id: "daikin-emura",
    name: "Daikin Emura",
    brand: "Daikin",
    description: "Premium designmodel met elegante afwerking en fluisterstille werking",
    image: "/images/daikin-emura-wit.webp",
    features: ["A+++ energie", "19 dB geluidsniveau", "WiFi besturing"]
  },
  {
    id: "samsung-windfree-elite",
    name: "Samsung WindFree Elite", 
    brand: "Samsung",
    description: "Innovatieve WindFree technologie zonder koude luchtstroom",
    image: "/images/samsung/windfreeElite/WindFree Elite_S2_Front_Web_RGB.webp",
    features: ["WindFree koeling", "AI functie", "SmartThings"]
  },
  {
    id: "lg-artcool-mirror",
    name: "LG Artcool Mirror",
    brand: "LG", 
    description: "Uniek spiegeldesign dat perfect past in elk modern interieur",
    image: "/images/lg-artcool-mirror.webp",
    features: ["Spiegeldesign", "ThinQ WiFi", "Plasma filter"]
  },
  {
    id: "mitsubishi-titanium-zs",
    name: "Mitsubishi Heavy Titanium",
    brand: "Mitsubishi",
    description: "Robuuste kwaliteit met titanium coating voor lange levensduur",
    image: "/images/Mitsubishi heavy indus/Mitsubishi-titanium-zs-wft-1.webp",
    features: ["Titanium coating", "Hyper Heating", "Plasma filter"]
  }
]

export function ProductsShowcase() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Onze Populairste Airco Modellen
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Van premium design tot slimme technologie - ontdek de airconditioning modellen 
            die onze klanten het meest waarderen. Alle modellen komen met professionele 
            installatie en 5 jaar garantie.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.brand}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Product image */}
                <div className="relative mb-4 aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="text-green-600 flex-shrink-0">✓</span>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="w-full">
                  <Button variant="outline" className="w-full">
                    Vraag Offerte Aan
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center bg-blue-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">
            Meer dan 50 Modellen Beschikbaar
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Bekijk ons complete assortiment met alle topmerken en -modellen. 
            Van wandmodellen tot vloerstaande airconditioners en mobiele units.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/producten">
              <Button size="lg" className="px-8">
                Alle Modellen Bekijken
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8">
                Persoonlijk Advies
              </Button>
            </Link>
          </div>
        </div>

        {/* Why no prices explanation */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h4 className="font-semibold mb-2">Maatwerk Advies</h4>
            <p className="text-sm text-muted-foreground">
              Elke situatie is uniek. Wij adviseren de beste airco voor uw specifieke ruimte en budget.
            </p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-2">Scherpe Prijzen</h4>
            <p className="text-sm text-muted-foreground">
              Door direct contact krijgt u gegarandeerd de scherpste prijs inclusief professionele installatie.
            </p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-2">Transparante Offerte</h4>
            <p className="text-sm text-muted-foreground">
              Binnen 24 uur ontvangt u een heldere offerte met alle kosten voor uw airco installatie.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}