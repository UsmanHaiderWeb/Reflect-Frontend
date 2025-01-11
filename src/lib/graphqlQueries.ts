import { gql } from "@apollo/client";

export const userDataQuery = gql`
    query userData($token: String!) {
        getUserData(token: $token) {
            _id
            clerkId
            email
            createdAt
            updatedAt
            journalEntries{
                _id
                createdAt
            }
            collections {
                _id
                title
                description
                createdAt
                updatedAt
                journalEntries{
                    _id
                    title
                    mood
                    createdAt
                }
            }
        }
    }
`

export const journalDataQuery = gql`
    query journalDataQuery($journalEntryId: ID!) {
        getJournalEntryData(journalEntryId: $journalEntryId) {
            _id
            title
            mood
            content
            createdAt
            collection{
                _id
                title
            }
            updatedAt
        }
    }
`

export const deleteCollectionMutaion = gql`
    mutation deleteCollection($token: String!, $collectionId: String!) {
        deleteCollection(token: $token, collectionId: $collectionId)
    }
`

export const deleteJournalMutaion = gql`
    mutation deleteJournal($token: String!, $collectionId: String!, $journalEntryId: String!) {
        deleteJournal(token: $token, collectionId: $collectionId, journalEntryId: $journalEntryId)
    }
`