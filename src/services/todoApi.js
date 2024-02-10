import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const todoApi = createApi({
	reducerPath: 'todoApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com',
	}),
	endpoints: (builder) => ({
		getTodos: builder.query({
			query: ({ page = 1 } = {}) => `todos?_start=${(page - 1) * 10}&_limit=10`,
			invalidatesTags: ['todos'],
		}),
		getTodoDetails: builder.query({
			query: (id) => `/todos/${id}`,
		}),
		createTodo: builder.mutation({
			query: (body) => ({
				url: '/todos',
				method: 'POST',
				body,
				invalidatesTags: ['todos'],
			}),
		}),
	}),
});
export const {
	useGetTodosQuery,
	useGetTodoDetailsQuery,
	useCreateTodoMutation,
} = todoApi;
