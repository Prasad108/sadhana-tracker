import { createSlice } from '@reduxjs/toolkit';
import { signInWithGoogle, logOut, getCurrentUser } from '../Auth';  // Import auth functions from Auth.js

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    signInRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  signOutRequest,
  signOutSuccess,
  signOutFailure,
} = authSlice.actions;

export default authSlice.reducer;

// Async thunk actions
export const signInWithGoogleAsync = () => async (dispatch) => {
  dispatch(signInRequest());
  try {
    const user = await signInWithGoogle();
    dispatch(signInSuccess(user));
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};

export const logOutAsync = () => async (dispatch) => {
  dispatch(signOutRequest());
  try {
    await logOut();
    dispatch(signOutSuccess());
  } catch (error) {
    dispatch(signOutFailure(error.message));
  }
};

export const getCurrentUserAsync = () => async (dispatch) => {
  const user = await getCurrentUser();
  if (user) {
    dispatch(signInSuccess(user));
  }
};
