'use client'

import { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StoreDetails {
  name: string
  phone: string
  logo: string
}

interface Product {
  id: number
  name: string
  price: number
  description: string
  imageUrl: string
}

export default function StoreDashboard() {
  const [storeDetails, setStoreDetails] = useState<StoreDetails>({
    name: '',
    phone: '',
    logo: '',
  })
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleStoreDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreDetails({ ...storeDetails, [e.target.name]: e.target.value })
  }

  const handleProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
    }

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p))
    } else {
      setProducts([...products, newProduct])
    }
    setEditingProduct(null)
    e.currentTarget.reset()
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Store Dashboard</h1>
      <Tabs defaultValue="store-details">
        <TabsList className="mb-4">
          <TabsTrigger value="store-details">Store Details</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="store-details">
          <Card>
            <CardHeader>
              <CardTitle>Store Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input
                    id="store-name"
                    name="name"
                    value={storeDetails.name}
                    onChange={handleStoreDetailsChange}
                  />
                </div>
                <div>
                  <Label htmlFor="store-phone">Phone Number</Label>
                  <Input
                    id="store-phone"
                    name="phone"
                    value={storeDetails.phone}
                    onChange={handleStoreDetailsChange}
                  />
                </div>
                <div>
                  <Label htmlFor="store-logo">Logo URL</Label>
                  <Input
                    id="store-logo"
                    name="logo"
                    value={storeDetails.logo}
                    onChange={handleStoreDetailsChange}
                  />
                </div>
                <Button type="submit">Save Store Details</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="product-name">Name</Label>
                    <Input
                      id="product-name"
                      name="name"
                      defaultValue={editingProduct?.name}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-price">Price</Label>
                    <Input
                      id="product-price"
                      name="price"
                      type="number"
                      step="0.01"
                      defaultValue={editingProduct?.price}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-description">Description (Optional)</Label>
                    <Textarea
                      id="product-description"
                      name="description"
                      defaultValue={editingProduct?.description}
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-image">Image URL</Label>
                    <Input
                      id="product-image"
                      name="imageUrl"
                      defaultValue={editingProduct?.imageUrl}
                      required
                    />
                  </div>
                  <Button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Product List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <p className="text-center text-gray-500">No products added yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}