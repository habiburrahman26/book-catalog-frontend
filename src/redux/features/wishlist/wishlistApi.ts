import apiSlice from "../../api/apiSlice";

const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: "get-all-wishlist",
      }),
      providesTags: ["wishlists"],
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: "add-to-wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlists"],
    }),
    deleteFromWishlist: builder.mutation({
      query: (id) => ({
        url: `delete-from-wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlists"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useDeleteFromWishlistMutation,
} = wishlistApi;
