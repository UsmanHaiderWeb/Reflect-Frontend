import { configureStore } from '@reduxjs/toolkit'
import userData from './Slices/userData.slice';

const ReduxStore = configureStore({
    reducer: {
        userData: userData.reducer,
    }
})


export type StoreType = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
export default ReduxStore;