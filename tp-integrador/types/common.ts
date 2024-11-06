import {ObjectId} from "bson";

export interface PageWithObjectId {
  _id: ObjectId
  title: string
  url: string
  userId: ObjectId
  imageUrl: string
  markdown: string
  isPublic: boolean
  shortId?: string
}

export interface Page {
  _id: string
  title: string
  url: string
  userId: string
  imageUrl: string
  markdown: string
  isPublic: boolean
  shortId?: string
}

export interface CustomSession {
  user: {
    id?: string
    name?: string
    email?: string | null,
  }
  expires: string
}