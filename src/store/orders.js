import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import { tokenConfigHeader } from './auth';

// Action Creators and Reducers
const slice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
    meta: [],
    loading: false,
  },
  reducers: {
    ordersRequested: (orders, action) => {
      orders.loading = true;
    },

    ordersReceived: (orders, action) => {
      orders.list = action.payload.data;
      orders.meta = action.payload.meta;
      orders.loading = false;
    },

    ordersRequestFailed: (orders, action) => {
      orders.loading = false;
    },

    // // action => action handler
    // orderAdded: (orders, action) => {
    //   orders.list.push(action.payload);
    // },

    orderUpdated: (orders, action) => {
      const index = orders.list.findIndex(
        (order) => order.id === action.payload.id
      );
      orders.list[index] = action.payload;
    },

    // orderDeleted: (orders, action) => {
    //   orders.list = orders.list.filter(
    //     (order) => order.id !== action.payload.id
    //   );
    // },
  },
});

export const {
  ordersRequested,
  ordersReceived,
  ordersRequestFailed,

  orderAdded,
  orderUpdated,
  orderDeleted,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/order';

/**
 * Call backend, fetch orders list
 * Dispatch ordersReceived (save to state) on success
 * Dispatch ordersRequestFailed on failure
 * @returns
 */
export const loadOrders = (limit, page) => (dispatch, getState) => {
  // console.log(limit, page);
  return dispatch(
    apiCallBegan({
      url,
      method: 'GET',
      params: {
        limit,
        page,
        sortBy: 'createdAt:asc',
      },
      headers: { ...tokenConfigHeader(getState) },
      onStart: ordersRequested.type,
      onSuccess: ordersReceived.type,
      onError: ordersRequestFailed.type,
    })
  );
};

export const updateOrder = (orderId, updateBody) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: url + '/' + orderId,
      method: 'PATCH',
      data: updateBody,
      headers: { ...tokenConfigHeader(getState) },
      onSuccess: orderUpdated.type,
    })
  );
};

export const addOrderFulfillment =
  (orderId, ofBody) => (dispatch, getState) => {
    return dispatch(
      apiCallBegan({
        url: url + '/' + orderId + '/add-fulfillment',
        method: 'POST',
        data: ofBody,
        headers: { ...tokenConfigHeader(getState) },
        onSuccess: orderUpdated.type,
      })
    );
  };

  export const addOrderPayment =
  (orderId, ofBody) => (dispatch, getState) => {
    return dispatch(
      apiCallBegan({
        url: url + '/' + orderId + '/add-payment',
        method: 'POST',
        data: ofBody,
        headers: { ...tokenConfigHeader(getState) },
        onSuccess: orderUpdated.type,
      })
    );
  };

// Selectors w/ memoization
export const getOrders = createSelector(
  (state) => state.entities.orders,
  (orders) => orders.list
);
