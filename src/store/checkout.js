import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import { tokenConfigHeader, getAccessToken } from './auth';
import { cartDeleted } from './cart';

// Action Creators and Reducers
const slice = createSlice({
  name: 'checkout',
  initialState: {
    checkoutTokenId: null,
    content: {},
    loading: false,
    orders: [],
  },
  reducers: {
    checkoutRequested: (checkout, action) => {
      checkout.loading = true;
    },

    checkoutReceived: (checkout, action) => {
      checkout.checkoutTokenId = action.payload.id;
      checkout.content = action.payload;
      checkout.loading = false;
    },

    checkoutRequestFailed: (checkout, action) => {
      checkout.loading = false;
    },

    // action => action handler
    // productAdded: (checkout, action) => {
    //   checkout.list.push(action.payload);
    // },

    checkoutUpdated: (checkout, action) => {
      checkout.content = action.payload;
      checkout.loading = false;
    },

    checkoutCaptured: (checkout, action) => {
      checkout.content = null;
      checkout.loading = false;
      checkout.orders.push(action.payload);
    },
  },
});

export const {
  checkoutRequested,
  checkoutReceived,
  checkoutRequestFailed,

  checkoutUpdated,
  checkoutCaptured,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/checkout';

/**
 * Call backend, fetch checkout list
 * Dispatch checkoutReceived (save to state) on success
 * Dispatch checkoutRequestFailed on failure
 * @returns
 */
export const loadCheckoutToken = () => (dispatch, getState) => {
  const cartId = getState().cart.cartId;
  console.log(cartId, 'checkout with cartId');

  return dispatch(
    apiCallBegan({
      url,
      method: 'GET',
      headers: {
        ...tokenConfigHeader(getState),
      },
      params: {
        cartId: cartId,
      },
      onStart: checkoutRequested.type,
      onSuccess: checkoutReceived.type,
      onError: checkoutRequestFailed.type,
    })
  );
};

export const updateCheckoutToken =
  (shippingMethodId) => (dispatch, getState) => {
    const checkoutTokenId = getState().checkout.checkoutTokenId;
    return dispatch(
      apiCallBegan({
        url: url + '/' + checkoutTokenId,
        method: 'PATCH',
        headers: {
          ...tokenConfigHeader(getState),
        },
        data: {
          shippingMethodId: {
            id: shippingMethodId,
          },
        },
        onSuccess: checkoutUpdated.type,
        onErrror: checkoutRequestFailed.type,
      })
    );
  };

export const captureCheckoutToken = (submitBody) => (dispatch, getState) => {
  const checkoutTokenId = getState().checkout.checkoutTokenId;
  return dispatch(
    apiCallBegan({
      url: url + '/' + checkoutTokenId,
      method: 'POST',
      headers: {
        ...tokenConfigHeader(getState),
      },
      data: {
        ...submitBody,
      },
      onSuccess: checkoutCaptured.type,
      onError: checkoutRequestFailed.type,
    })
  );
};

// Selector

// Memoization

// export const selectcheckout = createSelector(
//   (state) => state.checkout,
//   (checkout) => checkout.content
// );

// export const selectcheckoutItems = createSelector(
//   [selectcheckout],
//   (checkout) => checkout.checkoutItems
// );

// export const selectcheckoutItemsCount = createSelector(
//   [selectcheckout],
//   (checkout) => checkout.totalItems
// );

// export const selectcheckoutSubtotal = createSelector(
//   [selectcheckout],
//   (checkout) => checkout.subtotal
// );

// export const selectcheckoutHidden = createSelector(
//   [selectcheckout],
//   (checkout) => checkout.hidden
// );
