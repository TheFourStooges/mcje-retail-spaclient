import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

// Action Creators and Reducers = SLICE
const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: localStorage.getItem('refreshToken'),
    authenticated: null,
    loading: null,
  },
  reducers: {
    userLoading: (auth, action) => {
      auth.loading = true;
    },
    userLoaded: (auth, action) => {
      auth.authenticated = true;
      auth.loading = false;
    },
    refreshTokenSuccess: (auth, action) => {
      localStorage.setItem('refreshToken', action.payload.refresh.token);
      // auth.user = action.payload.user;
      auth.accessToken = action.payload.access.token;
      auth.refreshToken = action.payload.refresh.token;
      auth.authenticated = true;
      auth.loading = false;
    },
    authSuccess: (auth, action) => {
      localStorage.setItem('refreshToken', action.payload.tokens.refresh.token);
      auth.user = action.payload.user;
      auth.accessToken = action.payload.tokens.access.token;
      auth.refreshToken = action.payload.tokens.refresh.token;
      auth.authenticated = true;
      auth.loading = false;
    },
    authFailedOrLogoutSuccess: (auth, action) => {
      localStorage.removeItem('refreshToken');
      auth.user = null;
      auth.accessToken = null;
      auth.refreshToken = null;
      auth.authenticated = false;
      auth.loading = false;
    },
  },
});

export const {
  userLoading,
  userLoaded,
  refreshTokenSuccess,
  authSuccess,
  authFailedOrLogoutSuccess,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/auth';

export const loadUser = () => (dispatch, getState) => {
  const refreshToken = getState().auth.refreshToken;

  return dispatch(
    apiCallBegan({
      url: url + '/refresh-tokens',
      method: 'POST',
      data: {
        refreshToken: refreshToken,
      },
      onStart: userLoading.type,
      onSuccess: refreshTokenSuccess.type,
      onError: authFailedOrLogoutSuccess.type,
    })
  );
};

export const login = (email, password) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: url + '/login',
      method: 'POST',
      data: {
        email,
        password,
      },
      onSuccess: authSuccess.type,
      onError: authFailedOrLogoutSuccess.type,
    })
  );
};

export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    return dispatch(
      apiCallBegan({
        url: url + '/register',
        method: 'POST',
        data: {
          name,
          email,
          password,
        },
        onSuccess: authSuccess.type,
        onError: authFailedOrLogoutSuccess.type,
      })
    );
  };

export const logout = () => (dispatch, getState) => {
  const refreshToken = getState().auth.refreshToken;

  return dispatch(
    apiCallBegan({
      url: url + '/logout',
      method: 'POST',
      data: {
        refreshToken: refreshToken,
      },
      onSuccess: authFailedOrLogoutSuccess.type,
    })
  );
};

// Utility Function
export const tokenConfigHeader = (getState) => {
  const accessToken = getState().auth.accessToken;

  const header = {};

  if (accessToken) {
    header['Authorization'] = `Bearer ${accessToken}`;
  }

  return header;
};

// Selector

// Memoization
export const getAccessToken = createSelector(
  (state) => state.auth,
  (auth) => auth.accessToken
);
