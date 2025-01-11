import { userDataType } from "@/ReduxStore/Slices/userData.slice"

export interface collectionsInterface {
    _id: string
    title: string
    description: string
    user?: userDataType
    journalEntries?: JournalEntryInterface[]
    createdAt?: string
    updatedAt?: string
}

export interface JournalEntryInterface {
    _id: string
    title: string
    content: string
    mood: string
    createdBy: string
    collection: collectionsInterface
    createdAt: string
    updatedAt: string
}