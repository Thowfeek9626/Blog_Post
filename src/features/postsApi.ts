import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '@/types';


export const postsApi = createApi({
  reducerPath: 'blog',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ['Posts'], 
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { page: number; limit: number }>({
      query: ({ page = 1, limit = 4 }) => `/posts?page=${page}&limit=${limit}`,
      providesTags: ['Posts'], 
    }),
    createPost: builder.mutation<Post, { title: string; body: string;author:string }>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Posts"],
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation, useGetPostByIdQuery } = postsApi;
