import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-catalog-backend-orcin.vercel.app/api/v1',
  }),
  endpoints: () => ({}),
});

export default apiSlice;
