"use client"

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for food products
const products = [
  { id: 1, name: "Organic Apples", price: 2.99, image: "/placeholder.svg?height=200&width=200", description: "Fresh, crisp organic apples" },
  { id: 2, name: "Whole Grain Bread", price: 3.49, image: "/placeholder.svg?height=200&width=200", description: "Nutritious whole grain bread" },
  { id: 3, name: "Free-Range Eggs", price: 4.99, image: "/placeholder.svg?height=200&width=200", description: "Dozen free-range eggs" },
  { id: 4, name: "Greek Yogurt", price: 3.99, image: "/placeholder.svg?height=200&width=200", description: "Creamy Greek yogurt" },
  { id: 5, name: "Atlantic Salmon", price: 12.99, image: "/placeholder.svg?height=200&width=200", description: "Fresh Atlantic salmon fillet" },
  { id: 6, name: "Avocado", price: 1.99, image: "/placeholder.svg?height=200&width=200", description: "Ripe Hass avocado" },
  { id: 7, name: "Organic Spinach", price: 3.49, image: "/placeholder.svg?height=200&width=200", description: "Fresh organic baby spinach" },
  { id: 8, name: "Grass-Fed Ground Beef", price: 7.99, image: "/placeholder.svg?height=200&width=200", description: "Lean grass-fed ground beef" },
]

export default function Component() {
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([])

  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { id: productId, quantity: 1 }]
      }
    })
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Food Store Catalog</h1>
        <div className="relative">
          <ShoppingCart className="h-8 w-8" />
          <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full">
            {getTotalItems()}
          </Badge>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => addToCart(product.id)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}