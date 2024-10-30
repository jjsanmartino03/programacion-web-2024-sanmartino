"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock data for food stores
const foodStores = [
  { id: 1, name: "Fresh Mart", logo: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "Gourmet Grocer", logo: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "Organic Oasis", logo: "/placeholder.svg?height=80&width=80" },
  { id: 4, name: "Pantry Paradise", logo: "/placeholder.svg?height=80&width=80" },
  { id: 5, name: "Veggie Valley", logo: "/placeholder.svg?height=80&width=80" },
  { id: 6, name: "Meat Masters", logo: "/placeholder.svg?height=80&width=80" },
  { id: 7, name: "Bakery Bliss", logo: "/placeholder.svg?height=80&width=80" },
  { id: 8, name: "Seafood Sensation", logo: "/placeholder.svg?height=80&width=80" },
]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStores = foodStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Choose Your Food Store</h1>
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search stores..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStores.map((store) => (
          <div key={store.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="p-4 flex flex-col items-center">
              <img src={store.logo} alt={`${store.name} logo`} className="w-20 h-20 object-contain mb-4" />
              <h2 className="text-xl font-semibold text-center mb-2">{store.name}</h2>
              <Button className="w-full">View Catalog</Button>
            </div>
          </div>
        ))}
      </div>
      {filteredStores.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No stores found. Try a different search term.</p>
      )}
    </div>
  )
}