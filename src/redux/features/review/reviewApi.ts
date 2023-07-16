import apiSlice from "../../api/apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (data) => ({
        url: "add-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "book", id: arg.id }],
    }),
  }),
});

export const { useAddReviewMutation } = reviewApi;
