import apiSlice from "../../api/apiSlice";

const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: "get-all-wishlist",
      }),
      providesTags: ["wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: "add-to-wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    deleteFromWishlist: builder.mutation({
      query: (id) => ({
        url: `delete-from-wishlist/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useDeleteFromWishlistMutation,
} = wishlistApi;
