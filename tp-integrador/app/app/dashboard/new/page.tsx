'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useMutation} from '@tanstack/react-query'
import {useSession} from 'next-auth/react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Switch} from "@/components/ui/switch"
import {toast} from "@/hooks/use-toast"
import {Loader2, ArrowLeft} from 'lucide-react'

type NewPageData = {
  title: string
  description: string
  imageUrl: string
  isPublic: boolean
}

type ApiResponse = {
  id: string
  shortUrl: string
}

const createPage = async (pageData: NewPageData): Promise<ApiResponse> => {
  const response = await fetch('/api/pages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pageData),
  })

  if (!response.ok) {
    throw new Error('Failed to create page')
  }

  return response.json()
}

export default function NewPageForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: createPage,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Your page has been created.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create page. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) {
      toast({
        title: "Error",
        description: "Title and description are required.",
        variant: "destructive",
      })
      return
    }
    mutation.mutate({title, description, imageUrl, isPublic})
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'mqveikbd') // Replace with your Cloudinary upload preset

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dyz4ycir1/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )
        const data = await response.json()
        setImageUrl(data.secure_url)
      } catch (error) {
        console.error('Upload failed:', error)
        toast({
          title: "Error",
          description: "Image upload failed. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Create New Page</h1>
      <p className="text-muted-foreground mb-8">Fill in the details to create your new QR-linked page.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter page title"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description (Markdown)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter page description in Markdown"
            required
            rows={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Preview Image</Label>
          <Input
            id="image"
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
          />
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="mt-2 rounded-md max-w-full h-auto"/>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="public"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
          <Label htmlFor="public">Make this page public</Label>
        </div>
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4"/> Back
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Creating...
              </>
            ) : (
              'Create Page'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}