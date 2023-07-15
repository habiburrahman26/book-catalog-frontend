import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
