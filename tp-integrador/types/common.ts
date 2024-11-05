export interface Page {
  id: number
  title: string
  url: string
  userId: string
  imageUrl: string
  markdown: string
  isPublic: boolean
}

export interface CustomSession {
  user: {
    id?: string
    name?: string
    email?: string | null,
    accessToken?: string
  }
  token: string
  expires: string
}