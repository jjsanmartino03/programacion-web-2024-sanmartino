import {ObjectId} from "bson";

export interface PageWithObjectId {
  _id: ObjectId
  title: string
  userId: ObjectId
  imageUrl: string
  markdown: string
  isPublic: boolean
  shortId?: string
  slug: string
}

export interface Page {
  _id: string
  title: string
  userId: string
  imageUrl: string
  markdown: string
  isPublic: boolean
  shortId?: string
  slug: string
}

export interface CustomSession {
  user: {
    id?: string
    name?: string
    email?: string | null,
  }
  expires: string
}

export interface User {
  _id: ObjectId
  email: string
}