import {ObjectId} from "bson";
import {WithId} from "mongodb";

export interface PageWithObjectId {
  _id: ObjectId
  title: string
  userId: ObjectId
  imageUrl: string
  markdown: string
  isPublic: boolean
  shortId?: string
  tags: string[]
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
  tags: string[]
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

export type TagWithObjectId = WithId<Tag>

export interface Tag {
  name: string
  _id: string
}