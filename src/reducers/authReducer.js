const initialState = {
    user: null,
    isLoading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGN_IN_REQUEST':
        return { ...state, isLoading: true };
      case 'SIGN_IN_SUCCESS':
        return { ...state, user: action.payload, isLoading: false };
      case 'SIGN_IN_FAILURE':
        return { ...state, error: action.payload, isLoading: false };
      case 'SIGN_OUT':
        return { ...state, isLoading: false, user: null };
      case 'SET_LOADING':
        return { ...state, isLoading: true, user: null };
      default:
        return state;
    }
  };
  
  export default authReducer;