import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import { tokenConfigHeader } from './auth';

// Action Creators and Reducers
const slice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    meta: [],
    loading: false,
  },
  reducers: {
    usersRequested: (users, action) => {
      users.loading = true;
    },

    usersReceived: (users, action) => {
      users.list = action.payload.data;
      users.meta = action.payload.meta;
      users.loading = false;
    },

    usersRequestFailed: (users, action) => {
      users.loading = false;
    },

    // action => action handler
    userAdded: (users, action) => {
      users.list.push(action.payload);
    },

    userUpdated: (users, action) => {
      const index = users.list.findIndex(
        (user) => user.id === action.payload.id
      );
      users.list[index] = action.payload;
    },

    userDeleted: (users, action) => {
      users.list = users.list.filter(
        (user) => user.id !== action.payload.id
      );
    },
  },
});

export const {
  usersRequested,
  usersReceived,
  usersRequestFailed,

  userAdded,
  userUpdated,
  userDeleted,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/users';

/**
 * Call backend, fetch users list
 * Dispatch usersReceived (save to state) on success
 * Dispatch usersRequestFailed on failure
 * @returns
 */
 export const loadUsers = (limit, page, role) => (dispatch, getState) => {
  // console.log(limit, page);
  return dispatch(
    apiCallBegan({
      url,
      params: {
        limit,
        page,
        role,
        sortBy: 'updatedAt:desc',
      },
      headers: { ...tokenConfigHeader(getState) },
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

export const addUser = (user) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      data: user,
      headers: { ...tokenConfigHeader(getState) },
      onSuccess: userAdded.type,
    })
  );
};

export const updateUser =
  (userId, updateBody) => (dispatch, getState) => {
    return dispatch(
      apiCallBegan({
        url: url + '/' + userId,
        method: 'PATCH',
        data: updateBody,
        headers: { ...tokenConfigHeader(getState) },
        onSuccess: userUpdated.type,
      })
    );
  };

export const deleteUser = (userId) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: url + '/' + userId,
      method: 'DELETE',
      headers: { ...tokenConfigHeader(getState) },
      onSuccess: userDeleted.type,
    })
  );
};


// Selectors w/ memoization 
export const getUsers = createSelector(
  (state) => state.entities.users,
  (users) => users.list
);