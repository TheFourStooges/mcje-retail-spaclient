import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import { tokenConfigHeader, getAccessToken } from './auth';

// Action Creators and Reducers
const slice = createSlice({
  name: 'cart',
  initialState: {
    cartId: localStorage.getItem('cartId'),
    content: {},
    hidden: true,
    loading: false,
  },
  reducers: {
    cartRequested: (cart, action) => {
      cart.loading = true;
    },

    cartReceived: (cart, action) => {
      localStorage.setItem('cartId', action.payload.id);
      cart.cartId = action.payload.id;
      cart.content = action.payload;
      cart.loading = false;
    },

    cartRequestFailed: (cart, action) => {
      cart.loading = false;
    },

    // action => action handler
    // productAdded: (cart, action) => {
    //   cart.list.push(action.payload);
    // },

    cartUpdated: (cart, action) => {
      cart.content = action.payload;
      cart.loading = false;
    },

    cartDeleted: (cart, action) => {
      cart.cartId = null;
      localStorage.setItem('cartId', null);
      cart.content = null;
      cart.loading = false;
    },

    cartHiddenToggled: (cart, action) => {
      cart.hidden = !cart.hidden;
    },
  },
});

export const {
  cartRequested,
  cartReceived,
  cartRequestFailed,
  cartHiddenToggled,

  cartAdded,
  cartUpdated,
  cartDeleted,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/cart';

/**
 * Call backend, fetch cart list
 * Dispatch cartReceived (save to state) on success
 * Dispatch cartRequestFailed on failure
 * @returns
 */
export const loadCart = () => (dispatch, getState) => {
  const existingCartId = getState().cart.cartId;
  console.log(existingCartId, 'existingCartId')

  if (existingCartId) {
    return dispatch(
      apiCallBegan({
        url: url + '/' + existingCartId,
        method: 'GET',
        headers: {
          ...tokenConfigHeader(getState),
        },
        onStart: cartRequested.type,
        onSuccess: cartReceived.type,
        onError: cartRequestFailed.type,
      })
    );
  } else {
    return dispatch(
      apiCallBegan({
        url,
        method: 'GET',
        headers: {
          ...tokenConfigHeader(getState),
        },
        onStart: cartRequested.type,
        onSuccess: cartReceived.type,
        onError: cartRequestFailed.type,
      })
    );
  }
};

export const addProductToCart = (productId, count) => (dispatch, getState) => {
  const cartId = getState().cart.cartId;
  return dispatch(
    apiCallBegan({
      url: url + '/' + cartId,
      method: 'POST',
      headers: {
        ...tokenConfigHeader(getState),
      },
      data: {
        productId: productId,
        quantity: count ? count : 1,
      },
      onSuccess: cartUpdated.type,
    })
  );
};

export const updateCartLineItem =
  (lineItemId, newQty) => (dispatch, getState) => {
    const cartId = getState().cart.cartId;
    return dispatch(
      apiCallBegan({
        url: url + '/' + cartId + '/items/' + lineItemId,
        method: 'PUT',
        headers: {
          ...tokenConfigHeader(getState),
        },
        data: {
          quantity: newQty,
        },
        onSuccess: cartUpdated.type,
      })
    );
  };

export const removeCartLineItem = (lineItemId) => (dispatch, getState) => {
  const cartId = getState().cart.cartId;
  return dispatch(
    apiCallBegan({
      url: url + '/' + cartId + '/items/' + lineItemId,
      method: 'DELETE',
      headers: {
        ...tokenConfigHeader(getState),
      },
      onSuccess: cartUpdated.type,
    })
  );
};

export const emptyCart = () => (dispatch, getState) => {
  const cartId = getState().cart.cartId;
  return dispatch(
    apiCallBegan({
      url: url + '/' + cartId + '/items',
      method: 'DELETE',
      headers: {
        ...tokenConfigHeader(getState),
      },
      onSuccess: cartUpdated.type,
    })
  );
};

export const deleteCart = () => (dispatch, getState) => {
  const cartId = getState().cart.cartId;
  return dispatch(
    apiCallBegan({
      url: url + '/' + cartId,
      method: 'DELETE',
      headers: {
        ...tokenConfigHeader(getState),
      },
      onSuccess: cartDeleted.type,
    })
  );
};

export const toggleCartHidden = () => (dispatch, getState) => {
  dispatch({ type: cartHiddenToggled.type });
};

// Selector

// Memoization

export const selectCart = createSelector(
  (state) => state.cart,
  (cart) => cart.content
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCart],
  (cart) => cart.totalItems
);

export const selectCartSubtotal = createSelector(
  [selectCart],
  (cart) => cart.subtotal
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);
