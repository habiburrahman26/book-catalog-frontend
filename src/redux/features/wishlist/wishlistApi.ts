import apiSlice from "../../api/apiSlice";

const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: "get-all-wishlist",
      }),
    }),
    addToWishlist: builder.query({
      query: (data) => ({
        url: "add-to-wishlist",
        method: "POST",
        body: data,
      }),
    }),
    deleteFromWishlist: builder.query({
      query: (id) => ({
        url: `delete-from-wishlist/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistQuery,
  useDeleteFromWishlistQuery,
} = wishlistApi;
