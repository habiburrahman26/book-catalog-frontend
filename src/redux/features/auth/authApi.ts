/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import apiSlice from '../../api/apiSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: 'auth/registration',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegistrationMutation } = authApi;
