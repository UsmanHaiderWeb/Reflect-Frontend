import { collectionsInterface, JournalEntryInterface } from "@/data/types&Interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface userDataType {
    _id: string
    clerkId: string
    email: string
    collections: collectionsInterface[]
    journalEntries: JournalEntryInterface[]
    blackListedTokens: []
    createdAt: string
    updatedAt: string
}


const initialState: {} | userDataType = {}

const userData = createSlice({
    name: "userData",
    initialState,
    reducers: {
        update: ( _ , action: {payload: userDataType}) => action.payload,
        addCollection: ( state: any , action: {payload: collectionsInterface}) => {
            state.collections.unshift(action.payload);
            return state
        },
        updateCollection: ( state: any , action: {payload: collectionsInterface}) => {
            let collectionIndex = state.collections.findIndex((collection: collectionsInterface) => collection._id == action.payload._id)
            state.collections[collectionIndex] = {...state.collections[collectionIndex], title: action.payload.title, description: action.payload.description};
            return state
        },
        deleteCollection: ( state: any , action: {payload: { collectionId: string }}) => {
            const collectionIndex = state.collections.findIndex((collection: collectionsInterface) => collection._id === action.payload.collectionId);

            state.collections[collectionIndex].journalEntries.forEach((journal: JournalEntryInterface) => {
                let journalIndexInUsersJournals = state.journalEntries.findIndex((id: string) => id == journal._id)
                state.journalEntries.splice(journalIndexInUsersJournals, 1)
            })
            
            state.collections.splice(collectionIndex, 1);
            return state
        },
        addJournalToCollection: ( state: any , action: {payload: {journal: JournalEntryInterface, collectionId: string}}) => {
            const collectionIndex = state.collections.findIndex((collection: collectionsInterface) => collection._id === action.payload.collectionId);
            state.collections[collectionIndex].journalEntries.unshift(action.payload.journal);

            state.journalEntries.unshift({_id: action.payload.journal._id, createdAt: action.payload.journal.createdAt});

            return state
        },
        deleteJournalFromCollection: ( state: any , action: {payload: {journalEntryId: string, collectionId: string}}) => {
            const collectionIndex = state.collections.findIndex((collection: collectionsInterface) => collection._id === action.payload.collectionId);

            const journalIndexInCollection = state.collections[collectionIndex].journalEntries.findIndex((journal: JournalEntryInterface) => journal._id === action.payload.journalEntryId);
            state.collections[collectionIndex].journalEntries.splice(journalIndexInCollection, 1);

            const journalIndexInUsersJournals = state.journalEntries.findIndex((journal: JournalEntryInterface) => journal._id === action.payload.journalEntryId);
            state.collections[collectionIndex].journalEntries.splice(journalIndexInUsersJournals, 1);
            
            return state
        },
        updateJournal: ( state: any , action: {payload: {journal: JournalEntryInterface, collectionId: string}}) => {
            const collectionIndex = state.collections.findIndex((collection: collectionsInterface) => collection._id === action.payload.collectionId);
            const journalIndexInCollection = state.collections[collectionIndex].journalEntries.findIndex((journal: JournalEntryInterface) => journal._id === action.payload.journal._id);
            state.collections[collectionIndex].journalEntries[journalIndexInCollection] = action.payload.journal;

            return state
        },
    }
})

export const userDataActions = userData.actions;
export default userData;