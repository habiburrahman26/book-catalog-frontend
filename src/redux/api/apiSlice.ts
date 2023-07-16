import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ' https://book-catalog-backend-habiburrahman26.vercel.app/api/v1',
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes:['books','book','wishlists'],
  endpoints: () => ({}),
});

export default apiSlice;
