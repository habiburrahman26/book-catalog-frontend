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
        url: `edit-book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useEditBookMutation,
} = bookApi;
