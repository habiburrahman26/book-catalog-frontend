import apiSlice from '../../api/apiSlice';

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: 'get-books',
      }),
    }),
    getBook: builder.query({
      query: (id) => ({
        url: `get-book/${id}`,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery } = bookApi;
