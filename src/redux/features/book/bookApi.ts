import apiSlice from "../../api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "get-books",
      }),
      providesTags: ["books"],
    }),
    getBook: builder.query({
      query: (id) => ({
        url: `get-book/${id}`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "book", id: arg }],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "add-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        "books",
        { type: "book", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useEditBookMutation,
} = bookApi;
