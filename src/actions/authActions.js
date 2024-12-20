import { auth, signInWithGooglePopup } from '../firebase-config';

import * as types from './types';

export const signInWithGoogle = () => async (dispatch) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });

    const result = await signInWithGooglePopup();
    console.log('user',result.user)
    dispatch({ type: types.SIGN_IN_SUCCESS, payload: result.user });

  } catch (error) {
    console.error('Error signing in with Google:', error);
    dispatch({ type: types.SIGN_IN_FAILURE, payload: error.message });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch({ type: types.SIGN_OUT_SUCCESS });
  } catch (error) {
    dispatch({ type: types.SIGN_OUT_FAILURE, payload: error.message });
  }
};