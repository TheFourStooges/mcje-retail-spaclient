import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import { tokenConfigHeader } from './auth';

// Action Creators and Reducers
const slice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    meta: [],
    loading: false,
  },
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true;
    },

    productsReceived: (products, action) => {
      products.list = action.payload.data;
      products.meta = action.payload.meta;
      products.loading = false;
    },

    productsRequestFailed: (products, action) => {
      products.loading = false;
    },

    // action => action handler
    productAdded: (products, action) => {
      products.list.push(action.payload);
    },

    productUpdated: (products, action) => {
      const index = products.list.findIndex(
        (product) => product.id === action.payload.id
      );
      products.list[index] = action.payload;
    },

    productDeleted: (products, action) => {
      products.list = products.list.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const {
  productsRequested,
  productsReceived,
  productsRequestFailed,

  productAdded,
  productUpdated,
  productDeleted,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/product';

/**
 * Call backend, fetch Products list
 * Dispatch productsReceived (save to state) on success
 * Dispatch productsRequestFailed on failure
 * @returns
 */
export const loadProducts = (limit, page) => (dispatch, getState) => {
  // console.log(limit, page);
  return dispatch(
    apiCallBegan({
      url,
      params: {
        limit,
        page,
        sortBy: 'updatedAt:desc',
      },
      onStart: productsRequested.type,
      onSuccess: productsReceived.type,
      onError: productsRequestFailed.type,
    })
  );
};

export const addProduct = (product) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      data: product,
      headers: { ...tokenConfigHeader(getState) },
      onSuccess: productAdded.type,
    })
  );
};

export const updateProduct =
  (productId, updateBody) => (dispatch, getState) => {
    return dispatch(
      apiCallBegan({
        url: url + '/' + productId,
        method: 'PATCH',
        data: updateBody,
        headers: { ...tokenConfigHeader(getState) },
        onSuccess: productUpdated.type,
      })
    );
  };

export const deleteProduct = (productId) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: url + '/' + productId,
      method: 'DELETE',
      headers: { ...tokenConfigHeader(getState) },
      onSuccess: productDeleted.type,
    })
  );
};

// Selector

// Memoization

export const getProducts = createSelector(
  (state) => state.entities.products,
  (products) => products.list
);
