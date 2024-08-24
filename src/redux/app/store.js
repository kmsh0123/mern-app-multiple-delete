// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { NoteApi } from '../Api/NoteApi';

export const store = configureStore({
    reducer: {
        // Add the API reducer to the store
        [NoteApi.reducerPath]: NoteApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(NoteApi.middleware),
});
