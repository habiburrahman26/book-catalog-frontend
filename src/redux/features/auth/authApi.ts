import apiSlice from '../../api/apiSlice';
import { userLoggedIn } from './authSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: 'auth/registration',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data?.data?.accessToken;
          localStorage.setItem('accessToken', accessToken);

          dispatch(userLoggedIn(accessToken));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation } = authApi;
