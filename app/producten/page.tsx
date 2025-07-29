import { Metadata } from "next"
import { ProductsPageClient } from "@/components/products/products-page-client"

export const metadata: Metadata = {
  title: "Airco Modellen & Producten | StayCool Airco Roermond",
  description: "Ontdek ons complete assortiment airconditioning modellen. Van Daikin tot Samsung, alle topmerken en -modellen voor uw woning of bedrijf. Bekijk specificaties en vraag direct een offerte aan.",
  keywords: [
    "airco modellen",
    "airconditioners",
    "Daikin airco",
    "Samsung WindFree", 
    "LG airco",
    "Mitsubishi Electric",
    "wandmodellen",
    "vloermodellen",
    "cassette airco",
    "mobiele airco",
    "Roermond"
  ],
}

export default function ProductsPage() {
  return <ProductsPageClient />
}