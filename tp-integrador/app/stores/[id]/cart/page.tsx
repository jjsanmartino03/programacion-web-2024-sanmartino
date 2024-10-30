'use client'

import { useState } from 'react'
import { Minus, Plus, Trash2, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// Mock data for cart items
const initialCartItems = [
  { id: 1, name: "Organic Apples", price: 2.99, quantity: 2 },
  { id: 2, name: "Whole Grain Bread", price: 3.49, quantity: 1 },
  { id: 3, name: "Free-Range Eggs", price: 4.99, quantity: 1 },
]

export default function Component() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const sendViaWhatsApp = () => {
    const message = cartItems
      .map(item => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n')
    const total = `Total: $${subtotal.toFixed(2)}`
    const encodedMessage = encodeURIComponent(`My Order:\n${message}\n\n${total}`)
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      className="w-16 text-center"
                      aria-label={`Quantity of ${item.name}`}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Separator className="my-6" />
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold">Subtotal:</span>
            <span className="text-xl">${subtotal.toFixed(2)}</span>
          </div>
          <Button className="w-full" onClick={sendViaWhatsApp}>
            <Send className="mr-2 h-4 w-4" /> Send Order via WhatsApp
          </Button>
        </>
      )}
    </div>
  )
}