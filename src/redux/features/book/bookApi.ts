import apiSlice from '../../api/apiSlice';

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: 'get-books',
      }),
      providesTags: ['books'],
    }),
    getBooksWithFilter: builder.query({
      query: (options) => ({
        url: `get-books?search=${options?.search}&genres=${
          options?.genres || ''
        }&publicationDate=${options?.publicationDate || ''}`,
      }),
      providesTags: ['books'],
    }),
    getBook: builder.query({
      query: (id) => ({
        url: `get-book/${id}`,
      }),
      providesTags: (_result, _error, arg) => [{ type: 'book', id: arg }],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: 'add-book',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-book/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        'books',
        { type: 'book', id: arg.id },
      ],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `delete-book/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBooksWithFilterQuery,
  useGetBookQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
