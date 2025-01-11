import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export type RegisterUserType = {
    clerkId: string;
    email: string;
    token: string;
}

export const registerUser = async ({ clerkId, email, token }: RegisterUserType) => {
    const { data } = await api.post('/api/user/register', { clerkId, email }, {
        headers: {Authorization: `bearer ${token}`}
    })
    return data;
}

export const createCollection = async ({ title, description, token }: { title: string, description: string, token : string }) => {
    const { data } = await api.post('/api/collection/create', { title, description }, {
        headers: {Authorization: `bearer ${token}`}
    })
    return data;
}

export const updateCollectionFn = async ({ title, description, token, collectionId }: { title: string, description: string, token: string, collectionId: string }) => {
    const { data } = await api.post('/api/collection/update', { title, description, collectionId }, {
        headers: {Authorization: `bearer ${token}`}
    })
    return data;
}

export const createJournalFn = async ({ title, content, token, collectionId, mood }: { title: string, content: string, token: string, collectionId: string, mood: string }) => {
    const { data } = await api.post('/api/journal/create', { title, content, collectionId, mood }, {
        headers: {Authorization: `bearer ${token}`}
    })
    return data;
}

export const updateJournalFn = async ({ title, content, token, journalEntryId, mood }: { title: string, content: string, token: string, journalEntryId: string, mood: string }) => {
    const { data } = await api.post('/api/journal/update', { title, content, journalEntryId, mood }, {
        headers: {Authorization: `bearer ${token}`}
    })
    return data;
}