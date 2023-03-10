import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import { HYDRATE } from 'next-redux-wrapper'


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: 'include'
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['Posts'],
    endpoints: builder => ({
        getPosts: builder.query({
            query: (page = 1, page_size = 10) => ({
                url: '/api/post',
                params: {
                    page,
                    page_size,
                    select: ['id', 'title', 'excerpt', 'bannerImage', 'slug', 'author', 'createAt', 'updateAt']
                },
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // "Authorization": "Bearer " + getCookie({ req: props.req, res: props.res })?.accessToken
                },
                withCredentials: true,
            }),

            transformResponse: (response) => {
                return response.result
            },

            providesTags: (result, error, page) =>
                result
                    ? [
                        // Provides a tag for each post in the current page,
                        // as well as the 'PARTIAL-LIST' tag.
                        ...result.map(({ id }) => ({ type: 'Posts', id })),
                        { type: 'Posts', id: 'PARTIAL-LIST' },
                    ]
                    : [{ type: 'Posts', id: 'PARTIAL-LIST' }],

            // transformResponse: (response) => {
            //     console.log('transformResponse', response)
            //     return response.data.results
            // }
        }),
        getPost: builder.query({
            query: (slug) => ({
                url: `/api/post/${slug}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // "Authorization": "Bearer " + getCookie({ req: props.req, res: props.res })?.accessToken
                },
                withCredentials: true,
            }),
        })
    })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery } = apiSlice

// Export the reducer as a named export
export const { getPosts } = apiSlice.endpoints

