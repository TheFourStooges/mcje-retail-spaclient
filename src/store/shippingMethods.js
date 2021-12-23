import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import { tokenConfigHeader } from './auth';

// Action Creators and Reducers
const slice = createSlice({
  name: 'shippingMethods',
  initialState: {
    list: [],
    meta: [],
    loading: false,
  },
  reducers: {
    shippingMethodsRequested: (shippingMethods, action) => {
      shippingMethods.loading = true;
    },

    shippingMethodsReceived: (shippingMethods, action) => {
      shippingMethods.list = action.payload.data;
      shippingMethods.meta = action.payload.meta;
      shippingMethods.loading = false;
    },

    shippingMethodsRequestFailed: (shippingMethods, action) => {
      shippingMethods.loading = false;
    },

    // action => action handler
    shippingMethodAdded: (shippingMethods, action) => {
      shippingMethods.list.push(action.payload);
    },

    shippingMethodUpdated: (shippingMethods, action) => {
      const index = shippingMethods.list.findIndex(
        (shippingMethod) => shippingMethod.id === action.payload.id
      );
      shippingMethods.list[index] = action.payload;
    },

    shippingMethodDeleted: (shippingMethods, action) => {
      shippingMethods.list = shippingMethods.list.filter(
        (shippingMethod) => shippingMethod.id !== action.payload.id
      );
    },
  },
});

export const {
  shippingMethodsRequested,
  shippingMethodsReceived,
  shippingMethodsRequestFailed,

  shippingMethodAdded,
  shippingMethodUpdated,
  shippingMethodDeleted,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/shipping-method';

/**
 * Call backend, fetch shippingMethods list
 * Dispatch shippingMethodsReceived (save to state) on success
 * Dispatch shippingMethodsRequestFailed on failure
 * @returns
 */
 export const loadShippingMethods = (limit, page, role) => (dispatch, getState) => {
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
      onStart: shippingMethodsRequested.type,
      onSuccess: shippingMethodsReceived.type,
      onError: shippingMethodsRequestFailed.type,
    })
  );
};

export const addShippingMethod = (shippingMethod) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      data: shippingMethod,
      headers: { ...tokenConfigHeader(getState) },
      onSuccess: shippingMethodAdded.type,
    })
  );
};

export const updateShippingMethod =
  (shippingMethodId, updateBody) => (dispatch, getState) => {
    return dispatch(
      apiCallBegan({
        url: url + '/' + shippingMethodId,
        method: 'PATCH',
        data: updateBody,
        headers: { ...tokenConfigHeader(getState) },
        onSuccess: shippingMethodUpdated.type,
      })
    );
  };

export const deleteShippingMethod = (shippingMethodId) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: url + '/' + shippingMethodId,
      method: 'DELETE',
      headers: { ...tokenConfigHeader(getState) },
      onSuccess: shippingMethodDeleted.type,
    })
  );
};


// Selectors w/ memoization 
export const getShippingMethods = createSelector(
  (state) => state.entities.shippingMethods,
  (shippingMethods) => shippingMethods.list
);