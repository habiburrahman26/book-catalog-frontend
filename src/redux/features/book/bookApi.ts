import apiSlice from "../../api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "get-books",
      }),
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
