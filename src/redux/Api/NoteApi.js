import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API service
export const NoteApi = createApi({
    reducerPath: 'NoteApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
        getNote: builder.query({
            query: () => ({
                url : "get",
                method : "GET",
            }),
            providesTags : ["NoteApi"]
        }),
        deleteNote: builder.mutation({
            query: (ids) => ({
                url: 'delete',
                method: 'DELETE',
                body: { ids },
            }),
            invalidatesTags : ["NoteApi"]
        }),
    }),
});

export const { useGetNoteQuery, useDeleteNoteMutation } = NoteApi;
